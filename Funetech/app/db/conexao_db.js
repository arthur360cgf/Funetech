const Sequelize= require('sequelize');

//CRIANDO OBJETO PRA CONEXAO
//'nome_do_db', 'user', 'senha'
const sequelize = new Sequelize('memorial', 'usuario1', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

//FAZENDO E TESTANDO CONEXAO
sequelize.authenticate().then(function(){
    console.log("conexão bem sucedida");
}).catch(function(err){
    console.log("conexão deu ruim", +err);
});

module.exports={
    Sequelize: Sequelize,
    sequelize: sequelize
}
 
