const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const userController = require('../controllers/userController');

const validateUser = [
    body('name')
        .notEmpty().withMessage('O nome é obrigatório')
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('O nome deve ter entre 2 e 100 caracteres')
        .escape(),
    body('email')
        .notEmpty().withMessage('O email é obrigatório')
        .isEmail().withMessage('Email inválido')
        .normalizeEmail(),
    body('age')
        .notEmpty().withMessage('A idade é obrigatória')
        .isInt({ min: 0, max: 120 }).withMessage('A idade deve estar entre 0 e 120 anos'),
    body('active')
        .optional()
        .isBoolean().withMessage('O campo active deve ser um valor booleano')
];

const validateId = [
    param('id')
        .isUUID().withMessage('ID inválido')
];

// Middleware para tratar erros de validação
const handleValidationErrors = (req, res, next) => {
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
    next();
};

router.get('/', userController.getAllUsers);
router.get('/:id', validateId, handleValidationErrors, userController.getUserById);
router.post('/', validateUser, handleValidationErrors, userController.createUser);
router.put('/:id', [...validateId, ...validateUser], handleValidationErrors, userController.updateUser);
router.delete('/:id', validateId, handleValidationErrors, userController.deleteUser);

module.exports = router; 