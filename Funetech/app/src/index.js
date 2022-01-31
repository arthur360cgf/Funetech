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
//ROTA 1 - PÁGINA DE CADASTRO DO MEMORIAL
app.use("/formulario-memorial",function(req,res,next){
    res.sendFile(__dirname+"/Site/Produtos/Criar Memorial/cadastro_memorial.html");
})


//ROTA 2 - INSERCAO NO BD DO CADASTRO DO MEMORIAL
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

app.listen(3000, () => {
    console.log("Online na porta 3000\n");
})