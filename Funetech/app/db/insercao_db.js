const db=require("./conexao_db");

const insercaoDB = db.sequelize.define('memoriais',{
    nome: {
        type: db.Sequelize.STRING
    },
    imagem: {
        type: db.Sequelize.STRING
    },
    local_nascimento: {
        type: db.Sequelize.STRING
    },
    data_nascimento: {
        type: db.Sequelize.DATE
    },
    local_falecimento: {
        type: db.Sequelize.STRING
    },
    data_falecimento: {
        type: db.Sequelize.DATE
    },
    breve_mensagem: {
        type: db.Sequelize.STRING
    },
    biografia: {
        type: db.Sequelize.STRING
    },
    link_video_de_homenagem: {
        type: db.Sequelize.STRING
    },
})

//CRIAR TABELA
//insercao.sync({force: true});

module.exports = insercaoDB;