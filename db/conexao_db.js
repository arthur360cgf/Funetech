const Sequelize= require('sequelize');

//CRIANDO OBJETO PRA CONEXAO
//'nome_do_db', 'user', 'senha'
// const sequelize = new Sequelize('funetech', 'usuario1', '123456', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

//PARA FUNCIONAR COM O BD DO HEROKU
const sequelize=new Sequelize(process.env.DATABASE_URL || 'postgres://zxlhcpvkgybbsv:9a90ff3a066aeca50ed8c19f3c1dfc21022eb1ff200348e0ec1b37740771e689@ec2-34-230-110-100.compute-1.amazonaws.com:5432/d3jfuvtrhegdqn',{
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

//FAZENDO E TESTANDO CONEXAO
sequelize.authenticate().then(function(){
    console.log("conexão do bd bem sucedida");
}).catch(function(err){
    console.log("conexão deu ruim", +err);
});

module.exports={
    Sequelize: Sequelize,
    sequelize: sequelize
}
 
