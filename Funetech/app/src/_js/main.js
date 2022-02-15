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