//CONFIGURAÇÃO DA PORTA
const porta = process.env.PORT || 3000;

//CONFIGURACAO DO EXPRESS
const express = require("express");
const app=express();

//CONFIGURACAO DO HANDLEBARS
// const handlebars = require("express-handlebars");
const { engine } = require('express-handlebars');

//MOMENT PARA TRABALHAR COM DATAS
const moment = require('moment');

app.engine('handlebars', engine({
    defaultLayout: 'main', 
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY')
        }
    }
}))
app.set('view engine', 'handlebars');

/*IMPORTANTE: POR ALGUM MOTIVO SE ABAIXO ESTIVER APENAS
'./views' ELE TENTA PEGAR AS VIEWS EM 'Funetech/app/views'
PRA FUNCIONAR ENTAO É NECESSARIO COLOCAR ABAIXO './src/views'
POIS ASSIM ELE PEGARÁ DO LOCAL CERTO :'Funetech/app/src/views'*/

app.set('views', './src/views');

//CONFIGURACAO DO BODY PARSER
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//LIGACAO COM O BD
const insercaoDB=require("../db/insercao_db");

//PARA FAZER COMPARACOES ENTRE NUMEROS
const { Op } = require("sequelize");

//PARA USAR O PATH
const path=require("path");
const Memoriais = require('../src/views/adm_memoriais');
//PARA CONSEGUIR USAR CSS, IMAGENS, JS
app.use(express.static(path.join(__dirname,'_css')));
app.use(express.static(path.join(__dirname,'Imagens')));
app.use(express.static(path.join(__dirname,'Imagens/criadores')));
app.use(express.static(path.join(__dirname,'_js')));

/* --------------------------- ROTAS --------------------------- */

//_____________________
//1 - ROTAS DO MEMORIAL

//ROTA 1.1 - PÁGINA DE CADASTRO DO MEMORIAL
app.use("/formulario-memorial",function(req,res){
    res.sendFile(__dirname+"/Site/Produtos/Criar Memorial/cadastro_memorial.html");
})


//ROTA 1.2 - INSERCAO NO BD DO CADASTRO DO MEMORIAL
app.post("/insercao-concluida", function(req,res){
    //console.log(req.body.localFale);
    insercaoDB.insercao_memorial.create({
        nome: req.body.nome,
        imagem: req.body.imagemFalecido,
        local_nascimento: req.body.localNasc,
        data_nascimento: req.body.dataNasc,
        local_falecimento: req.body.localFale,
        data_falecimento: req.body.dataFale,
        breve_mensagem: req.body.mensagem,
        biografia: req.body.biografia,
        link_video_de_homenagem: req.body.videoDeHomenagem
    }).then(function(){
        //res.send("valores inseridos com sucesso");
        console.log("\n\nForam inseridos na tabela 'memorial' os seguintes dados: \n");
        console.log(req.body);

        res.sendFile(__dirname+"/Site/Produtos/Criar Memorial/insercao_memorial_concluida.html");
    }).catch(function(erro){
        res.send("valores não foram inseridos <br>"+erro);
    })
})

//_____________________
//2 - ROTAS DOS PACOTES

//ROTA 2.1 - PÁGINA PRINCIPAL DOS PACOTES
app.use("/pacotes",function(req,res,next){
    res.sendFile(__dirname+"/Site/pacotes/pacote.html");
})

//ROTA 2.2 - PÁGINA DE PACOTE DE CAIXAO
app.use("/pacote-caixao",function(req,res,next){
    res.sendFile(__dirname+"/Site/Serviços/Pacote_Caixão/caixao_novo.html");
})

//ROTA 2.3 - PÁGINA DE PACOTE DE URNA
app.use("/pacote-urna",function(req,res,next){
   res.sendFile(__dirname+"/Site/Serviços/Pacote_Urna/urna_novo.html");
})

//ROTA 2.4 - PÁGINA DE PACOTE DE CAPSULA
app.use("/pacote-capsula",function(req,res,next){
    res.sendFile(__dirname+"/Site/Serviços/Pacote_Capsula/capsula_novo.html");
})

//ROTA 2.5 - INSERCAO NO BD DA COMPRA DO PACOTE
app.post("/pedido-concluido", function(req,res){
    //console.log(req.body.localFale);
    insercaoDB.insercao_compras.create({
        nome_comprador: req.body.nome_comprador,
        item_pedido: req.body.item_pedido,
        telefone: req.body.telefone_comprador,
        email: req.body.email_comprador,
    }).then(function(){
        //res.send("valores inseridos com sucesso");
        console.log("\n\nForam inseridos na tabela 'compras' os seguintes dados: \n");
        console.log(req.body);

        res.sendFile(__dirname+"/Site/pacotes/pedido_pacote_concluido.html");
    }).catch(function(erro){
        res.send("valores não foram inseridos <br>"+erro);
    })
})

//_________________________________________________________
//3 - ROTAS DOS PRODUTOS E PACOTES DISPONIVEIS VINDOS DO BD
app.get("/itens-a-venda", function(req, res) {
    

    //select * from produtos where quantidade_disponivel>0;
    insercaoDB.tabela_produtos.findAll({
        where: {
            quantidade_disponivel:{
                [Op.gt]: 0
            }
        }
    }).then(function(produtos){
        
        //select * from servicos where quantidade_disponivel>0;
        insercaoDB.tabela_servicos.findAll({
            where: {
                quantidade_disponivel:{
                    [Op.gt]: 0
                }
            }
        }).then(function(servicos){
            //VAI RENDERIZAR OS ITENS DAS DUAS TABELAS
            res.render('itens_a_venda',
                {title: "Itens a Venda - Funetech",
                 produtos: produtos.map(produtos => produtos.toJSON()),
                 servicos: servicos.map(servicos => servicos.toJSON())
                }
            );
        })
    })    
})

//COMPRAS DE ITENS DA PAGINA DE ITENS A VENDA
app.post("/pedido-de-itens-concluido", function(req,res){
    //console.log(req.body.localFale);
    insercaoDB.insercao_compras.create({
        nome_comprador: req.body.nome_comprador,
        item_pedido: req.body.item_pedido,
        telefone: req.body.telefone_comprador,
        email: req.body.email_comprador,
    }).then(function(){

        //res.send("valores inseridos com sucesso");
        console.log("\n\nForam inseridos na tabela 'compras' os seguintes dados: \n");
        console.log(req.body);

        //PEGANDO O ID DO ULTIMO PEDIDO FEITO
        //select * from compras order by createdAt desc limit 1;
        insercaoDB.insercao_compras.findOne({
            order:[
                ['createdAt','DESC'],
            ]
        }).then(function(pedido){
            // console.log("id da compra: ");
            // console.log(pedido.id);
        
            //SOBRE O CARRINHO
            var carrinho = req.body.StringCarrinho;
            carrinho=carrinho.split(",") //SEPARA OS ITENS E QUANTIDADES
            carrinho.pop(); //REMOVE A ULTIMA VIRGULA
        
            console.log(carrinho);
        
            var itensPedidos=[];
            var quantidadesPedidas=[];
        
            for (var i=0;i<carrinho.length;i++){ //SEPARA OS ITENS DAS QUANTIDADES
                if (i%2==0){
                    itensPedidos.push(carrinho[i]);
                }else{
                    quantidadesPedidas.push(carrinho[i]);
                }
            }
        
            for (var i=0;i<itensPedidos.length;i++){ //INSERE CADA ITEM COM SUA QUANTIDADE
                // console.log("comprou "+quantidadesPedidas[i]+" de "+itensPedidos[i]);
                insercaoDB.tabela_itensPedidos.create({
                    nome_item: itensPedidos[i],
                    quantidade_pedida: quantidadesPedidas[i],
                    id_compra: pedido.id
                });
            }
        
            res.sendFile(__dirname+"/Site/pacotes/pedido_pacote_concluido.html");
        })
    })
    
})

//____________________
//4 ROTA DOS MEMORIAIS
app.get("/memoriais", function(req, res) {
    insercaoDB.insercao_memorial.findAll().then(function(memorial){
        res.render('memoriais', {memorial: memorial.map(memorial => memorial.toJSON())});
    })
});

//4.2 ROTA DO MEMORIAL INDIVIDUAL
app.get("/memorial", function(req, res) {
    console.log("o id vindo é "+req.query.id);

    //select * from memorial where id="id vindo da url"
    insercaoDB.insercao_memorial.findAll({
        where: {id: req.query.id}
    }).then(function(memorial){

        //COLETANDO O NOME DO FALECIDO
        const nomeFalecido= memorial.map(memorial => memorial.toJSON())[0].nome;

        res.render('memorial_individual', {
            title: "Memorial de "+nomeFalecido,
            memorial: memorial.map(memorial => memorial.toJSON())
        });
    })
});

//ROTA 2.3.2 PAGINA DE MEMORIAS PARA O ADM
app.get("/adm-memoriais",function(req,res){
    //res.send("nada");
    insercaoDB.insercao_memorial.findAll({order :[['id','ASC']]}).then(function(memoriais){
        //res.render('adm_memoriais',
        //insercaoDB.insercao_memorial.findAll({
        //    where:{
         //   id: {
        //      [Op.eq]: 1
             
    
        //    }
        //  }
        //}).then(function(memoriais){
               
        //res.render("adm_memoriais",{memoriais:memoriais});
         res.render('adm_memoriais',{title: "Memoriais - Funetech",
         memoriais: memoriais.map(memoriais => memoriais.toJSON())});
    })
    
    
});
app.get("/del-memoriais/:id", function(req, res){
    insercaoDB.insercao_memorial.destroy({
        where: {"id": req.params.id}
    }).then(function(){
        res.redirect(('/adm-memoriais'));
    }).catch(function(erro){
        res.send("Memorial não apagado com sucesso!");
    })
});
app.listen(porta, () => {
    console.log("Online na porta "+porta+"\n");
})

