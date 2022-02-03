//CONFIGURACAO DO EXPRESS
const express = require("express");
const app=express();

//CONFIGURACAO DO BODY PARSER
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//LIGACAO COM O BD
const insercaoDB=require("../db/insercao_db");

//PARA USAR O PATH
const path=require("path");

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


//ROTA 2.3 - PÁGINA DE PACOTE DE URNA


//ROTA 2.4 - PÁGINA DE PACOTE DE CAPSULA


//ROTA 2.5 - INSERCAO NO BD DA COMPRA DO PACOTE
app.post("/pedido-concluido", function(req,res){
    //console.log(req.body.localFale);
    insercaoDB.insercao_compras.create({
        nome_comprador: req.body.nome_comprador,
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


app.listen(3000, () => {
    console.log("Online na porta 3000\n");
})