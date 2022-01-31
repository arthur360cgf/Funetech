const db=require("./conexao_db");

const insercao_memorial = db.sequelize.define('memoriais',{
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

// module.exports = insercaoDB;

module.exports={
    insercao_memorial: insercao_memorial

    /*AQUI DEVE FICAR OS OUTROS consts PARA PARA FAZER A INSERÇÃO NO BD.
    NO index.js, NA ROTA QUE RECEBE OS DADOS DIGITADOS, CADA UM DEVE SER
    CHAMADO LÁ COMO POR EXEMPLO "insercaoDB.insercao_memorial.create(..."
    */
   
}