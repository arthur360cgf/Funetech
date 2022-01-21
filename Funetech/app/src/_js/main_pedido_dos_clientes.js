function fazerLogin(){
    removeAvisosLogin();

    if (!verificaCamposDeLoginVazio()){
        //SOME A TELA DE LOGIN
        document.getElementById("id01").style.display="none";
    }
}

/*REMOVE OS AVISO DE CAMPOS VAZIOS, POIS SE ELES APARECEREM, SEM ESSE MÉTODO, NÃO SOMEM MAIS 
A NÃO SER QUE RECARREGUE A PÁGINA*/
function removeAvisosLogin(){
    document.getElementById("aviso-email-vazio").style.display="none";
    document.getElementById("aviso-senha-vazia").style.display="none";

    alteraBordaDoCampoDeLogin("email","#ccc");
    alteraBordaDoCampoDeLogin("senha","#ccc");
}

//TESTA SE UM OU MAIS DOS CAMPOS ESTÃO VAZIOS
function verificaCamposDeLoginVazio(){

    //PEGA OS DADOS DIGITADOS NOS CAMPOS DE LOGIN
    var emailDigitado=document.getElementById("email").value;
    var senhaDigitada=document.getElementById("senha").value;

    //FAZ O TESTE SE OS DOIS CAMPOS ESTÃO VAZIOS
    if (emailDigitado=="" && senhaDigitada==""){
        document.getElementById("aviso-email-vazio").style.display="block";
        document.getElementById("aviso-senha-vazia").style.display="block";

        //MUDA A BORDA DOS CAMPOS DE LOGIN PARA VERMELHO
        alteraBordaDoCampoDeLogin("email","red");
        alteraBordaDoCampoDeLogin("senha","red");

        return true;
    }

    //FAZ O TESTE SE APENAS O CAMPO DE EMAIL ESTÁ VAZIO
    else if (emailDigitado==""){
        document.getElementById("aviso-email-vazio").style.display="block";

        //MUDA A BORDA DO CAMPO DE EMAIL PARA VERMELHO
        alteraBordaDoCampoDeLogin("email","red");

        return true;
    }

    //FAZ O TESTE SE APENAS O CAMPO DE SENHA ESTÁ VAZIO
    else if(senhaDigitada==""){
        document.getElementById("aviso-senha-vazia").style.display="block";

        //MUDA A BORDA DO CAMPO DE SENHA PARA VERMELHO
        alteraBordaDoCampoDeLogin("senha","red");

        return true;
    }
    
    //SE NENHUM DOS CAMPOS ESTIVER VAZIO
    else{
        return false;
    }
}

//MUDA A COR DA BORDA DO CAMPO DE LOGIN QUANDO CHAMADO
function alteraBordaDoCampoDeLogin(id,cor){
    document.getElementById(id).style.borderColor=cor;
}



///////
//var modal = document.getElementById('botao-de-login');

// When the user clicks anywhere outside of the modal, close it
//window.onclick = function(event) {
//    if (event.target == modal) {
//        modal.style.display = "none";
//    }
//}