const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'O nome não pode estar vazio'
                },
                len: {
                    args: [2, 100],
                    msg: 'O nome deve ter entre 2 e 100 caracteres'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Este email já está em uso'
            },
            validate: {
                isEmail: {
                    msg: 'Email inválido'
                },
                notEmpty: {
                    msg: 'O email não pode estar vazio'
                }
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'A idade não pode estar vazia'
                },
                min: {
                    args: [0],
                    msg: 'A idade deve ser maior ou igual a 0'
                },
                max: {
                    args: [120],
                    msg: 'A idade deve ser menor ou igual a 120'
                }
            }
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: true,
        paranoid: true,
        indexes: [
            {
                unique: true,
                fields: ['email']
            }
        ]
    });

    return User;
}; 