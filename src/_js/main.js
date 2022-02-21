$('.slider-principal').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true
});

//ALTERACOES:

/*FUNÇÃO QUE FAZ BUSCAS DIGITADAS NO CAMPO
- USADO NAS ROTAS:
    - /itens-a-venda
*/
function pesquisaProdutoseServicos(div_pesquisada,campo_de_pesquisa) {
    // console.log("----------------TURNO----------------")
    var input, filter, itens, container_produto, h2, i, txtValue;

    input = document.getElementById(campo_de_pesquisa); //SELECIONA O CAMPO ONDE SERÁ DIGITADO A PESQUISA
    filter=input.value.toUpperCase(); //COLETA OQ FOI DIGITADO NO INPUT E COLOCA TUDO MAIUSCULO, POIS A PESQUISA NÃO É CASE-SENSITIVE

    itens=document.getElementById(div_pesquisada); //SELECIONA A DIV COM O ID 'div_pesquisada', NO CASO É A DIV COM TODOS OS PRODUTOS/SERVIÇOS
    container_produto=itens.getElementsByClassName("container-produto"); //SELECIONA, DA DIV 'div_pesquisada', TODAS AS DIVS COM CLASS 'container-produto',QUE SÃO TODOS OS PRODUTOS/SERVIÇOS

    for (i=0;i<container_produto.length;i++){ //PERCORRE TODOS OS PRODUTOS/SERVIÇOS
        h2=container_produto[i].getElementsByTagName("h2")[0]; //SELECIONA A TAG 'h2', ONDE ESTÁ O NOME DO PRODUTO/SERVIÇO
        // console.log(h2);
        if (h2){
            txtValue=h2.textContent || h2.innerText; //COLETA O NOME QUE ESTÁ NO 'h2', O NOME DO PRODUTO/SERVIÇO, E SALVA EM 'txtValue'

            /*VERIFICA SE O QUE FOI DIGITADO NO CAMPO DE PESQUISA, OU SEJA, O QUE ESTÁ NO 'filter', 
            ESTÁ EM ALGUMA POSICAO DO NOME DO PRODUTO/SERVIÇO, NO 'txtValue'

            CASO ESTEJA, O 'indexOf' RETORNARÁ A POSIÇÃO ONDE ELE ESTÁ, QUE, NESSE CASO, COM CERTEZA SERÁ MAIOR QUE -1, ENTRANDO NO IF
            CASO NÃO ESTEJA, NÃO RETORNARÁ NADA, VAI CAIR NO ELSE E FAZER ESSE PRODUTO/SERVIÇO SUMIR COM O 'display="none"'
            */
            if (txtValue.toUpperCase().indexOf(filter)>-1){ 
                // console.log(txtValue.toUpperCase().indexOf(filter));
                // console.log(" ");
                container_produto[i].style.display="";
            }
            else{
                container_produto[i].style.display="none";
            }
        }
    }
}

//FUNCOES DO CARRINHO DE COMPRAS

/* FUNCOES DE FRONT-END */
function abrirTelaDoCarrinho(){
    console.log("entrou no abrirTelaDoCarrinho\n");
    document.getElementById("carrinho").style.display="block";
    document.getElementById("botao-do-carrinho").style.display="none";

    //PARA IR PARA A TELA DOS ITENS, CASO AO SAIR, TIVESSE NA TELA DOS DADOS DO CLIENTE
    document.getElementById("dados-carrinho").style.display="none";
    document.getElementById("itens-carrinho").style.display="block";
}


function fecharTelaDoCarrinho(){
    console.log("entrou no fecharTelaDoCarrinho\n");
    document.getElementById("carrinho").style.display="none";
    document.getElementById("botao-do-carrinho").style.display="block";
}

function irTelaDadosDoCliente(){
    console.log("entrou no irTelaDadosDoCliente\n");
    document.getElementById("itens-carrinho").style.display="none";
    document.getElementById("dados-carrinho").style.display="block";
}

function irTelaItensDoCarrinho(){
    console.log("entrou no irTelaItensDoCarrinho\n");
    document.getElementById("dados-carrinho").style.display="none";
    document.getElementById("itens-carrinho").style.display="block";
}
function verDetalhes(){
    console.log("entrou no verDetalhes\n");
    document.getElementById("detalhes").style.display="block";
    document.getElementById("botao-detalhes").style.display="none";
    
    //PARA IR PARA A TELA DOS ITENS, CASO AO SAIR, TIVESSE NA TELA DOS DADOS DO CLIENTE
    //document.getElementById("dados-carrinho").style.display="none";
    //document.getElementById("itens-carrinho").style.display="block";
}


function fecharDetalhes(){
    console.log("entrou no fecharDetalhes\n");
    document.getElementById("detalhes").style.display="none";
    document.getElementById("botao-detalhes").style.display="block";
}
/* FIM DAS FUNCOES DE FRONT-END */

//----------------------------------------------------------------------------------//
/* FUNCOES DE BACK-END */
