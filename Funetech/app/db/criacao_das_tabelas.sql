create database funetech;
use funetech;

/* TEBELA DOS MEMORIAIS */
create table memoriais(
id int primary key auto_increment,
nome varchar(100),
imagem varchar(100),
local_nascimento varchar(100),
data_nascimento Date,
local_falecimento varchar(100),
data_falecimento Date,
breve_mensagem varchar(5000),
biografia varchar(5000),
link_video_de_homenagem varchar(100),

/* DO SEQUELIZE */
createdAt DateTime,
updatedAt DateTime
);

select * from memoriais;

drop table memoriais;
delete from memoriais where id>=2;

/*----------------------------------------*/

/* TABELA DAS COMPRAS */
create table compras(
id int primary key auto_increment,
nome_comprador varchar(100),
item_pedido varchar(100),
telefone varchar(16),
email varchar(100),

/* DO SEQUELIZE */
createdAt DateTime,
updatedAt DateTime
);

select * from compras;

insert into compras values (4,"asss","pacote3", "sss@asa", "2222" ,"2022-02-08 15:52:46","2025-02-04 15:52:46");

drop table compras;

-- NAO UTILIZADO MAIS ---------------------------------
/* TABELA DAS PRODUTOS E SERVICOS DISPONIVEIS*/
create table AVendas(
id int primary key auto_increment,
nome_item varchar(100),
caminho_da_imagem varchar(100),
preco varchar(20),
quantidade_disponivel int,
tipo varchar(9),

/* DO SEQUELIZE */
createdAt DateTime,
updatedAt DateTime
);
select * from AVendas;
-- NAO UTILIZADO MAIS ---------------------------------


-- TABELA DE PRODUTOS
create table produtos(
id int primary key auto_increment,
nome_item varchar(100),
caminho_da_imagem varchar(100),
preco varchar(20),
quantidade_disponivel int,

/* DO SEQUELIZE */
createdAt DateTime,
updatedAt DateTime
);

-- TABELA DE SERVIÇOS
create table servicos(
id int primary key auto_increment,
nome_item varchar(100),
caminho_da_imagem varchar(100),
preco varchar(20),
quantidade_disponivel int,

/* DO SEQUELIZE */
createdAt DateTime,
updatedAt DateTime
);

-- INSERÇÃO DOS ITENS DISPONIVEIS
-- PRODUTOS
insert into produtos values (1,"Caixão de Luxo", "caixao_ouro.png", "R$ 2.999,00", 5, "2022-02-08 23:07:00", "2022-02-08 23:07:00");
insert into produtos values (2,"Urna de Luxo", "urna.png", "R$ 4.999,00", 5, "2022-02-08 23:10:00", "2022-02-08 23:10:00");
insert into produtos values (3,"Cápsula Criogênica", "capsula-criogenica2.png", "R$ 10.999,00", 5, "2022-02-08 23:11:00", "2022-02-08 23:11:00");

select * from produtos;


-- SERVIÇOS
insert into servicos values (1,"Necromaquiagem", "", "R$ 899,00", 5, "2022-02-08 23:13:00", "2022-02-08 23:13:00");
insert into servicos values (2,"Serviço de Cremação", "", "R$ 1.200,00", 5, "2022-02-08 23:14:00", "2022-02-08 23:14:00");
insert into servicos values (3,"Serviço de Criogênização", "", "R$ 11.500,00", 5, "2022-02-08 23:16:00", "2022-02-08 23:16:00");

select * from servicos;

drop table AVendas;