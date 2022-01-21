//CONFIGURACAO DO EXPRESS
const express = require("express");
const app=express();

//CONFIGURACAO DO BODY PARSE
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//PARA USAR O PATH
const path=require("path");


//LIGACAO COM O BD.
const insercaoDB=require("../db/insercao_db");


//PAGINA DO FORMULÁRIO 
//app.use(express.static('public'));
//app.use('/Imagens',express.static(__dirname+"public/Imagens"));

//app.get("/formulario-memorial", function(req,res){
//    res.sendFile(__dirname+"/public/cadastro_memorial.html");
//    //res.sendFile(__dirname+"cadastro_memorial.html");
//})

//PARA CONSEGUIR USAR O CSS, IMAGENS, JS
app.use(express.static(path.join(__dirname,'_css')));
app.use(express.static(path.join(__dirname,'Imagens')));
app.use(express.static(path.join(__dirname,'_js')));


//PÁGINA DE CADASTRO DO MEMORIAL
app.use("/formulario-memorial",function(req,res,next){
    res.sendFile(__dirname+"/Site/Produtos/Criar Memorial/cadastro_memorial.html");
})



//app.get("/css/style_cadastro_memorial.css",function(req,res){
//    res.sendFile(__dirname+"/public/css/style_cadastro_memorial.css");
//})

//INSERCAO NO BD DO CADASTRO DO MEMORIAL
app.post("/insercao-concluida", function(req,res){
    //console.log(req.body.localFale);
    insercaoDB.create({
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
        res.send("valores inseridos com sucesso");
    }).catch(function(erro){
        res.send("valores não foram inseridos <br>"+erro);
    })
})

app.listen(3000, () => {
    console.log("Online na porta 3000\n");
})