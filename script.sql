create database trio_dos_lacos;
use 			trio_dos_lacos;

create table tb_usuarios (
    id_usuario 	int primary key auto_increment not null,
    nome 		varchar(100) unique not null,
    senha 		varchar(250) not null 
);

create table tb_produtos (
    id_produto  int primary key auto_increment not null,
    nome        varchar(250) not null,
    valor       decimal(10,2) not null,
    quantidade  int not null,
    descricao   varchar(250) not null,
    sessao      varchar(250) not null,
    imagem      longblob not null
);

create table tb_vendas (
    id_venda 	int primary key auto_increment not null,
    id_usuario 	int not null,
    id_produto 	int not null,
    quantidade 	int not null,
    total 		decimal(10, 2) not null,
    data 		date not null,
    endereco 	varchar (250),
    enviado 	bool not null,
	foreign key (id_usuario) references tb_usuarios(id_usuario)
        on delete cascade 
        on update cascade, 
    foreign key (id_produto) references tb_produtos(id_produto)
        on delete cascade 
        on update cascade
);

create table tb_encomendas (
    id_encomenda int primary key auto_increment not null,
    descricao 	 varchar(250) not null,
    imagem 		 longblob null
);

