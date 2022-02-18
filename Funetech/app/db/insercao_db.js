const db=require("./conexao_db");

//DEFINIÇÃO DA TABELA "memoriais"
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


//DEFINIÇÃO DA TABELA "compras"
const insercao_compras = db.sequelize.define('compras',{
    nome_comprador: {
        type: db.Sequelize.STRING
    },
    item_pedido: {
        type: db.Sequelize.STRING
    },
    telefone: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
})

//DEFINIÇÃO DA TABELA "AVenda"
// const insercao_AVenda = db.sequelize.define('AVendas',{
//     nome_item: {
//         type: db.Sequelize.STRING
//     },
//     caminho_da_imagem: {
//         type: db.Sequelize.STRING
//     },
//     preco: {
//         type: db.Sequelize.STRING
//     },
//     quantidade_disponivel: {
//         type: db.Sequelize.INTEGER
//     },
//     tipo: {
//         type: db.Sequelize.STRING
//     },
// })

//DEFINIÇÃO DA TABELA "produtos"
const tabela_produtos = db.sequelize.define('produtos',{
    nome_item: {
        type: db.Sequelize.STRING
    },
    caminho_da_imagem: {
        type: db.Sequelize.STRING
    },
    preco: {
        type: db.Sequelize.INTEGER
    },
    quantidade_disponivel: {
        type: db.Sequelize.INTEGER
    }
})

//DEFINIÇÃO DA TABELA "servicos"
const tabela_servicos = db.sequelize.define('servicos',{
    nome_item: {
        type: db.Sequelize.STRING
    },
    caminho_da_imagem: {
        type: db.Sequelize.STRING
    },
    preco: {
        type: db.Sequelize.INTEGER
    },
    quantidade_disponivel: {
        type: db.Sequelize.INTEGER
    }
})

//CRIAR TABELA
//insercao.sync({force: true});

// module.exports = insercaoDB;

module.exports={
    insercao_memorial: insercao_memorial,
    insercao_compras: insercao_compras,
    // insercao_AVenda: insercao_AVenda
    tabela_produtos: tabela_produtos,
    tabela_servicos: tabela_servicos

    /*AQUI DEVE FICAR OS OUTROS consts PARA PARA FAZER A INSERÇÃO NO BD.
    NO index.js, NA ROTA QUE RECEBE OS DADOS DIGITADOS, CADA UM DEVE SER
    CHAMADO LÁ COMO POR EXEMPLO "insercaoDB.insercao_memorial.create(..."
    */
   
}