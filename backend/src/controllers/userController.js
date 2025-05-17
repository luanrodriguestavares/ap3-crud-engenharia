const { User } = require('../models');
const { validationResult } = require('express-validator');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            where: { active: true },
            order: [['createdAt', 'DESC']]
        });
        res.json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ 
            message: 'Não foi possível buscar a lista de usuários',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id, active: true }
        });

        if (!user) {
            return res.status(404).json({ 
                message: 'Usuário não encontrado',
                details: 'O usuário solicitado não existe ou foi removido'
            });
        }

        res.json(user);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ 
            message: 'Não foi possível buscar os dados do usuário',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: 'Dados inválidos',
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg
            }))
        });
    }

    try {
        const existingUser = await User.findOne({
            where: { email: req.body.email }
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'Email já cadastrado',
                details: 'Já existe um usuário cadastrado com este email'
            });
        }

        const user = await User.create(req.body);
        res.status(201).json({
            message: 'Usuário criado com sucesso',
            user
        });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ 
            message: 'Não foi possível criar o usuário',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

exports.updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: 'Dados inválidos',
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg
            }))
        });
    }

    try {
        const user = await User.findOne({
            where: { id: req.params.id, active: true }
        });

        if (!user) {
            return res.status(404).json({ 
                message: 'Usuário não encontrado',
                details: 'O usuário que você está tentando atualizar não existe ou foi removido'
            });
        }

        if (req.body.email && req.body.email !== user.email) {
            const existingUser = await User.findOne({
                where: { email: req.body.email }
            });

            if (existingUser) {
                return res.status(400).json({
                    message: 'Email já cadastrado',
                    details: 'Já existe outro usuário cadastrado com este email'
                });
            }
        }

        await user.update(req.body);
        res.json({
            message: 'Usuário atualizado com sucesso',
            user
        });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ 
            message: 'Não foi possível atualizar o usuário',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id, active: true }
        });

        if (!user) {
            return res.status(404).json({ 
                message: 'Usuário não encontrado',
                details: 'O usuário que você está tentando remover não existe ou já foi removido'
            });
        }

        await user.update({ active: false });
        res.json({ 
            message: 'Usuário removido com sucesso',
            details: 'O usuário foi removido do sistema'
        });
    } catch (error) {
        console.error('Erro ao remover usuário:', error);
        res.status(500).json({ 
            message: 'Não foi possível remover o usuário',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}; 