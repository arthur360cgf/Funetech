const db = require ('../../db/conexao_db')

const Usuario = db.sequelize.define('Usuario',{
        nome: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        eAdmin: {
            type: db.Sequelize.STRING,
            defaultValue: 1
        },
        senha: {
            type: db.Sequelize.STRING,
            allowNull: false
        }
});

//Usuario.sync({fore: true})

module.exports = Usuario