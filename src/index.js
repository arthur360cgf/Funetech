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
const Usuario = require('./models/usuario');

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

//MENSAGENS(FLASH) E SESSAO
const flash = require("connect-flash")
const passport = require('passport')
require("./config/auth")(passport)
const session = require("express-session")

//HASH PARA ENCRIPTAR SENHA
const bcrypt = require('bcryptjs')

app.use(session({
    secret: "funerariafunetech",
    resave: true, 
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//MIDLEWARE
app.use(function(req,res,next){
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null;
    next()
})

//CONST PARA ROTAS QUE SO O ADM PODE ACESSAR
const {eAdmin} = require("./helpers/eAdmin")
/* --------------------------- ROTAS --------------------------- */

//_____________________
//1 - ROTAS DO MEMORIAL

//ROTA 1.1 - PÁGINA DE CADASTRO DO MEMORIAL
app.use("/formulario-memorial",function(req,res){
    
    /*VERIFICA SE O AVISO ESTÁ NA QUERY COM "1",
    SE ESTIVER COLOCA A DIV COM O AVISO COMO "BLOCK"
    */
    var AvisoCamposNaoPreenchidos;
    if (req.query.alerta==1){
        AvisoCamposNaoPreenchidos="block";
    }else{
        AvisoCamposNaoPreenchidos="none";
    }

    res.render('cadastro_memorial',
                {title: "Cadastro Memorial - Funetech",
                aviso: AvisoCamposNaoPreenchidos}
            );
})


//ROTA 1.2 - INSERCAO NO BD DO CADASTRO DO MEMORIAL
app.post("/insercao-concluida", function(req,res){
    // TESTA SE TODOS OS CAMPOS OBRIGATORIOS ESTAO PREENCHIDOS
    const campos=req.body;

    // IMPEDE SALVAR NO BD SE OS CAMPOS ABAIXO ESTIVEREM VAZIOS
    if (campos.nome!="" && campos.imagemFalecido!="" && campos.localNasc!="" && campos.dataNasc!="" && campos.localFale!="" && campos.dataFale!=""){
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
    }

    else{
        // res.req.body=req.body;
        res.redirect("/formulario-memorial?alerta=1");
    }
})

//_____________________
//2 - ROTAS DOS PACOTES

//ROTA 2.1 - PÁGINA PRINCIPAL DOS PACOTES
app.use("/pacotes",function(req,res,next){
    res.render('pacotes',
                {title: "Pacote Disponiveis - Funetech"}
            );
})

//ROTA 2.2 - PÁGINA DE PACOTE DE CAIXAO
app.use("/pacote-caixao",function(req,res,next){
    var AvisoCamposNaoPreenchidos;
    if (req.query.alerta==1){
        AvisoCamposNaoPreenchidos="block";
    }else{
        AvisoCamposNaoPreenchidos="none";
    }

    res.render('pacote_caixao',
                {title: "Pacote 1, Caixão de Luxo - Funetech",
                aviso: AvisoCamposNaoPreenchidos}
            );
})

//ROTA 2.3 - PÁGINA DE PACOTE DE URNA
app.use("/pacote-urna",function(req,res,next){
    var AvisoCamposNaoPreenchidos;
        if (req.query.alerta==1){
            AvisoCamposNaoPreenchidos="block";
        }else{
            AvisoCamposNaoPreenchidos="none";
        }

    res.render('pacote_urna',
                {title: "Pacote 2, Urna de Luxo - Funetech",
                aviso: AvisoCamposNaoPreenchidos}
            );
})

//ROTA 2.4 - PÁGINA DE PACOTE DE CAPSULA
app.use("/pacote-capsula",function(req,res,next){
    var AvisoCamposNaoPreenchidos;
        if (req.query.alerta==1){
            AvisoCamposNaoPreenchidos="block";
        }else{
            AvisoCamposNaoPreenchidos="none";
        }

    res.render('pacote_capsula',
                {title: "Pacote 3, Capsula 2077 - Funetech",
                aviso: AvisoCamposNaoPreenchidos}
            );
})

//ROTA 2.5 - INSERCAO NO BD DA COMPRA DO PACOTE
app.post("/pedido-concluido", function(req,res){
    //console.log(req.body.localFale);
    const campos=req.body;

    // IMPEDE SALVAR NO BD SE OS CAMPOS ABAIXO ESTIVEREM VAZIOS
    if (campos.nome_comprador!="" && campos.telefone_comprador!="" && campos.email_comprador!=""){

        // PREVINE MUDANÇAS FEITAS APERTANTO F12 E ALTERANDO O NOME DO PACOTE NAS LABELS
        if (campos.item_pedido=="pacote de caixão" || campos.item_pedido=="pacote de urna" || campos.item_pedido=="pacote de cápsula"){
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
        }else{
            res.send("<h1>O pacote pedido não existe!</h1>");
        }

    }else{
        switch(campos.item_pedido){
            case "pacote de caixão":
                res.redirect("/pacote-caixao?alerta=1");
                break;

            case "pacote de urna":
                res.redirect("/pacote-urna?alerta=1");
                break;

            case "pacote de cápsula":
                res.redirect("/pacote-capsula?alerta=1");
                break;

            default:
                res.send("<h1>O pacote pedido não existe!</h1>");
        }
    }
})

//_________________________________________________________
//3 - ROTAS DOS PRODUTOS E PACOTES DISPONIVEIS VINDOS DO BD
app.get("/itens-a-venda", function(req, res) {
    var AvisoCamposNaoPreenchidos;
        if (req.query.alerta==1){
            AvisoCamposNaoPreenchidos="block";
        }else{
            AvisoCamposNaoPreenchidos="none";
        }
    

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
                 aviso: AvisoCamposNaoPreenchidos,
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
    const campos=req.body;

    if (campos.nome_comprador!="" && campos.telefone_comprador!="" && campos.email_comprador!=""){
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
            
                // for (var i=0;i<itensPedidos.length;i++){ //INSERE CADA ITEM COM SUA QUANTIDADE
                //     // console.log("comprou "+quantidadesPedidas[i]+" de "+itensPedidos[i]);
                //     insercaoDB.tabela_itensPedidos.create({
                //         nome_item: itensPedidos[i],
                //         quantidade_pedida: quantidadesPedidas[i],
                //         id_compra: pedido.id
                //     });
                // }
            
                res.sendFile(__dirname+"/Site/pacotes/pedido_pacote_concluido.html");
            })
        })
    }else{
        res.redirect("/itens-a-venda?alerta=1");
    }
    
})

//____________________
//4 ROTA DOS MEMORIAIS
app.get("/memoriais", function(req, res) {
    insercaoDB.insercao_memorial.findAll().then(function(memorial){
        res.render('memoriais', {
            title: "Memoriais Cadastrados - Funetech",
            memorial: memorial.map(memorial => memorial.toJSON())});
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
        var nomeFalecido;
        try{
            nomeFalecido = memorial.map(memorial => memorial.toJSON())[0].nome;
        }catch(erro){
            res.send("não existe um memorial com esse id!");
        }

        res.render('memorial_individual', {
            title: "Memorial de "+nomeFalecido,
            memorial: memorial.map(memorial => memorial.toJSON())
        });
    })
});

//ROTA 2.3.2 PAGINA DE MEMORIAS PARA O ADM
app.get("/adm-memoriais", eAdmin, function(req,res){
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
app.get("/detalhes-memoriais", function(req, res){
    insercaoDB.insercao_memorial.findAll({
        
          where: {"id": req.query.id}
        }).then(function(memoriais){
            res.render('detalhes_memoriais',{title: "Memoriais - Funetech",
            memoriais: memoriais.map(memoriais => memoriais.toJSON())});
       
        })
   
  });
app.get("/editar-memoriais", function(req, res){
    insercaoDB.insercao_memorial.findAll({
        
            where: {"id": req.query.id}
        }).then(function(memoriais){

            res.render('editar_memoriais',{title: "Memoriais - Funetech",
            memoriais: memoriais.map(memoriais => memoriais.toJSON())});
       
        })
   
  });
app.post("/atualizar-memoriais/:id", function(req,res){
    
    insercaoDB.insercao_memorial.update({
      
        
        nome: req.body.nome,
        imagem: req.body.imagemFalecido,
        local_nascimento: req.body.localNasc,
        data_nascimento: req.body.dataNasc,
        local_falecimento: req.body.localFale,
        data_falecimento: req.body.dataFale,
        breve_mensagem: req.body.mensagem,
        biografia: req.body.biografia,
        link_video_de_homenagem: req.body.videoDeHomenagem,
        
    },{where: {'id': req.params.id}
     
     
    }).then(function(){
        res.redirect(('/adm-memoriais'));
    }).catch(function(erro){
        res.send("valores não foram inseridos <br>"+erro);
    })
    
    /*db.query('UPDATE memoriais SET nome = ?,imagem = ?,local_nascimento = ?,data_nascimento = ?,local_falecimento = ?,data_falecimento = ?,breve_mensagem = ?,biografia = ?,link_video_de_homenagem = ? WHERE id = ?',[req.body.nome,req.body.imagemFalecido,req.body.localNasc,req.body.dataNasc,req.body.localFale,req.body.dataFale,req.body.mensagem,req.body.biografia,req.body.videoDeHomenagem,req.params.id],function(erro){
        if(erro){
            res.status(200).send('Erro'+ erro)
        }
        res.redirect('adm_memoriais')
    }
   )*/
})
app.get("/adm-itens", eAdmin,function (req, res){
    insercaoDB.tabela_produtos.findAll().then(function(produtos){
        insercaoDB.tabela_servicos.findAll().then(function(servicos){
             res.render('adm_itens',
                {title: "Itens a Venda - Funetech",
                 
                 produtos: produtos.map(produtos => produtos.toJSON()),
                 servicos: servicos.map(servicos => servicos.toJSON())
                 }
            ) 
        })
    })
})
app.get("/del-produto/:id", eAdmin, function(req, res){
    insercaoDB.tabela_produtos.destroy({
        where: {"id": req.params.id}
    }).then(function(){
        res.redirect(('/adm-itens'));
    }).catch(function(erro){
        res.send("Produto não apagado com sucesso!");
    })
});

app.get("/del-servico/:id", eAdmin, function(req, res){
    insercaoDB.tabela_servicos.destroy({
        where: {"id": req.params.id}
    }).then(function(){
        res.redirect(('/adm-itens'));
    }).catch(function(erro){
        res.send("Produto não apagado com sucesso!");
    })
});
app.get("/detalhes-produto", function(req, res){
    insercaoDB.tabela_produtos.findAll({
        
          where: {"id": req.query.id}
        }).then(function(produtos){
            res.render('detalhes_produto',{title: "Detalhes Servico - Funetech",
            produtos: produtos.map(produtos => produtos.toJSON())});
       
        })
   
  });
app.get("/detalhes-servico", function(req, res){
    insercaoDB.tabela_servicos.findAll({
        
          where: {"id": req.query.id}
        }).then(function(servicos){
            res.render('detalhes_servico',{title: "Detalhes Servico - Funetech",
            servicos: servicos.map(servicos => servicos.toJSON())});
       
        })
   
  });
app.get("/editar-produtos", function(req, res){
    insercaoDB.tabela_produtos.findAll({
        
            where: {"id": req.query.id}
        }).then(function(produtos){

            res.render('editar_produtos',{title: "Editar Produtos - Funetech",
            produtos: produtos.map(produtos => produtos.toJSON())});
        })
   
});
app.post("/atualizar-produtos/:id", function(req,res){
    
    insercaoDB.tabela_produtos.update({
      
        
        nome_item: req.body.nomeitem,
        caminho_da_imagem: req.body.caminhodaimagem,
        preco: req.body.preco,
        quantidade_disponivel: req.body.quantidadedisponivel,
        
        
    },{where: {'id': req.params.id}
     
     
    }).then(function(){
        res.redirect(('/adm-itens'));
    }).catch(function(erro){
        res.send("valores não foram inseridos <br>"+erro);
    })
    
    /*db.query('UPDATE memoriais SET nome = ?,imagem = ?,local_nascimento = ?,data_nascimento = ?,local_falecimento = ?,data_falecimento = ?,breve_mensagem = ?,biografia = ?,link_video_de_homenagem = ? WHERE id = ?',[req.body.nome,req.body.imagemFalecido,req.body.localNasc,req.body.dataNasc,req.body.localFale,req.body.dataFale,req.body.mensagem,req.body.biografia,req.body.videoDeHomenagem,req.params.id],function(erro){
        if(erro){
            res.status(200).send('Erro'+ erro)
        }
        res.redirect('adm_memoriais')
    }
   )*/
})
app.get("/editar-servicos", function(req, res){
    insercaoDB.tabela_servicos.findAll({
        
            where: {"id": req.query.id}
        }).then(function(servicos){

            res.render('editar_servicos',{title: "Editar Servicos - Funetech",
            servicos: servicos.map(servicos => servicos.toJSON())});
        })
   
});
app.post("/atualizar-servicos/:id", function(req,res){
    
    insercaoDB.tabela_servicos.update({
      
        
        nome_item: req.body.nomeitem,
        caminho_da_imagem: req.body.caminhodaimagem,
        preco: req.body.preco,
        quantidade_disponivel: req.body.quantidadedisponivel,
        
        
    },{where: {'id': req.params.id}
     
     
    }).then(function(){
        res.redirect(('/adm-itens'));
    }).catch(function(erro){
        res.send("valores não foram inseridos <br>"+erro);
    })
    
    /*db.query('UPDATE memoriais SET nome = ?,imagem = ?,local_nascimento = ?,data_nascimento = ?,local_falecimento = ?,data_falecimento = ?,breve_mensagem = ?,biografia = ?,link_video_de_homenagem = ? WHERE id = ?',[req.body.nome,req.body.imagemFalecido,req.body.localNasc,req.body.dataNasc,req.body.localFale,req.body.dataFale,req.body.mensagem,req.body.biografia,req.body.videoDeHomenagem,req.params.id],function(erro){
        if(erro){
            res.status(200).send('Erro'+ erro)
        }
        res.redirect('adm_memoriais')
    }
   )*/
})
app.use("/create-produtos",function(req,res){
    
    /*VERIFICA SE O AVISO ESTÁ NA QUERY COM "1",
    SE ESTIVER COLOCA A DIV COM O AVISO COMO "BLOCK"
    */
    var AvisoCamposNaoPreenchidos;
    if (req.query.alerta==1){
        AvisoCamposNaoPreenchidos="block";
    }else{
        AvisoCamposNaoPreenchidos="none";
    }

    res.render('create_produto',
                {title: "Cadastro Produto - Funetech",
                aviso: AvisoCamposNaoPreenchidos}
            );
})
app.post("/isercao-produto", function(req,res){
    
    insercaoDB.tabela_produtos.create({
      
        
        nome_item: req.body.nomeitem,
        caminho_da_imagem: req.body.caminhodaimagem,
        preco: req.body.preco,
        quantidade_disponivel: req.body.quantidadedisponivel,
        
        
    },{where: {'id': req.params.id}
     
     
    }).then(function(){
        res.redirect(('/adm-itens'));
    }).catch(function(erro){
        res.send("valores não foram inseridos <br>"+erro);
    })
    
    /*db.query('UPDATE memoriais SET nome = ?,imagem = ?,local_nascimento = ?,data_nascimento = ?,local_falecimento = ?,data_falecimento = ?,breve_mensagem = ?,biografia = ?,link_video_de_homenagem = ? WHERE id = ?',[req.body.nome,req.body.imagemFalecido,req.body.localNasc,req.body.dataNasc,req.body.localFale,req.body.dataFale,req.body.mensagem,req.body.biografia,req.body.videoDeHomenagem,req.params.id],function(erro){
        if(erro){
            res.status(200).send('Erro'+ erro)
        }
        res.redirect('adm_memoriais')
    }
   )*/
})
app.use("/create-servico",function(req,res){
    
    /*VERIFICA SE O AVISO ESTÁ NA QUERY COM "1",
    SE ESTIVER COLOCA A DIV COM O AVISO COMO "BLOCK"
    */
    var AvisoCamposNaoPreenchidos;
    if (req.query.alerta==1){
        AvisoCamposNaoPreenchidos="block";
    }else{
        AvisoCamposNaoPreenchidos="none";
    }

    res.render('create_servico',
                {title: "Cadastro Produto - Funetech",
                aviso: AvisoCamposNaoPreenchidos}
            );
})
app.post("/isercao-servico", function(req,res){
    
    insercaoDB.tabela_servicos.create({
      
        
        nome_item: req.body.nomeitem,
        caminho_da_imagem: req.body.caminhodaimagem,
        preco: req.body.preco,
        quantidade_disponivel: req.body.quantidadedisponivel,
        
        
    },{where: {'id': req.params.id}
     
     
    }).then(function(){
        res.redirect(('/adm-itens'));
    }).catch(function(erro){
        res.send("valores não foram inseridos <br>"+erro);
    })
    
    /*db.query('UPDATE memoriais SET nome = ?,imagem = ?,local_nascimento = ?,data_nascimento = ?,local_falecimento = ?,data_falecimento = ?,breve_mensagem = ?,biografia = ?,link_video_de_homenagem = ? WHERE id = ?',[req.body.nome,req.body.imagemFalecido,req.body.localNasc,req.body.dataNasc,req.body.localFale,req.body.dataFale,req.body.mensagem,req.body.biografia,req.body.videoDeHomenagem,req.params.id],function(erro){
        if(erro){
            res.status(200).send('Erro'+ erro)
        }
        res.redirect('adm_memoriais')
    }
   )*/
})
app.get("/adm-pedidos", eAdmin , function(req, res){
    insercaoDB.insercao_compras.findAll().then(function(compras){
            res.render('adm_pedidos',
            {title: "Pedidos Realizados - Funetech",
             compras: compras.map(compras => compras.toJSON())});
    })
});

app.get("/excluir-pedido/:id",eAdmin , function(req, res){
    insercaoDB.insercao_compras.destroy({
        where: {"id": req.params.id}
    }).then(function(){
        res.redirect(('/adm-pedidos'));
    }).catch(function(erro){
        res.send("Compra não pode ser concluida!");
    })
});


//__________________________
//5 ROTA DO REGISTRO E LOGIN
app.get('/registro',(req,res) =>{
    res.render("usuario/registro", {
        title: "Registro"
    })
})
app.post("/registro", (req, res) =>{
    var erros = []
    
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"})
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null ){
        erros.push({texto: "Senha inválida"})
    }

    if(req.body.senha.length < 8){
        erros.push({texto: "Minimo de 8 caractéres"})
    }

    if(req.body.senha != req.body.senha2){
        erros.push({texto: "As senhas são diferentes"})
    }

    if(erros.length > 0){
        res.render("usuario/registro", {erros: erros})
    }else{

        const novoUsuario = new Usuario({
            nome: req.body.nome,
            senha: req.body.senha
        })

        bcrypt.genSalt(10, function(erro, salt){
            bcrypt.hash(novoUsuario.senha, salt, function(erro, hash){
                if(erro){
                    req.flash("error_msg", "houve um errro durante o registro")
                    res.redirect("/registro")
                }

                novoUsuario.senha = hash
                novoUsuario.save().then(function(req,res){
                    req.flash("success_msg", "Cadastro concluido")
                    res.redirect("/inicio")
                }).catch(function(err){
                    req.flash("error_msg","Houve um erro no cadastro")
                    res.redirect("/registro")
                })
            })
        })
    }
})

app.get('/login', (req,res) =>{
    res.render("usuario/login",{
        title: "Login ADM - Funetech"
    })
})

app.post('/login', function(req,res, next){
    passport.authenticate("local", {
        successRedirect: "/inicio",
        failureRedirect: "/login", 
        failureFlash: true
    })(req, res, next)
})

app.get('/logout', (req,res) =>{
    req.logout()
    res.redirect('/')
})

//_______________
//6 PAINEL DO ADM
app.get('/inicio', eAdmin, (req,res)=>{
    res.render("usuario/inicio",{
        title: "Dashboard - Funetech"
    })
})

//_______________
//6 PÁGINA INICIAL
app.get('/', (req,res)=>{
    res.render('pagina_inicial',{
        title: "Início - Funetech"
    })
})

// ROTAS API
// RETORNA DADOS DE UM DETERMINADO MEMORIAL DE ACORDO COM O ID
app.get('/api/memoriais/:id_memorial', (req,res)=>{

    // BUSCA NO BD
    const memorial = insercaoDB.insercao_memorial.findAll({
        where: {id: req.params.id_memorial}
    }).then((memorial)=>{
        res.send(memorial[0]);
    });
})

app.listen(porta, () => {
    console.log("Online na porta "+porta+"\n");
})

