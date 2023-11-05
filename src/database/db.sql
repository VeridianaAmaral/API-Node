create table produtor(
	id varchar(256) not null primary key,
	nome varchar(100) not null,
	email varchar(256) not null unique,
	senha varchar (256) not null,
	data_nascimento date not null,
	cep varchar(10) not null,
	uf varchar (2) not null,
	cidade varchar (100) not null,
	bairro varchar (50) not null,
	logradouro varchar (50) not null,
	numero int not null,
	data_cad TIMESTAMP default now()
);

create table produto(
	id varchar(256) not null primary key,
	imagem vachar(256) not null,
	nome varchar(100) not null,
	categoria varchar(100) not null,
	data_cad TIMESTAMP default now()
);

create table consumidor(
	id varchar(256) not null primary key,
	nome varchar(100) not null,
	email varchar(256) not null unique,
	senha varchar (256) not null,
	data_nascimento date not null,
	cep varchar(10) not null,
	uf varchar (2) not null,
	cidade varchar (100) not null,
	bairro varchar (50) not null,
	logradouro varchar (50) not null,
	numero int not null,
	data_cad TIMESTAMP default now()
);

create type status as enum ('Preparando', 'Pronto para envio', 'Em transito', 'Conclúido');

create table venda(
	id varchar(256) not null primary key,
	consumidor_id varchar references consumidor(id),
	produtor_id varchar references produtor(id),
	status status,
	data_venda TIMESTAMP default now()
);

create table anuncio(
	id varchar(256) not null primary key,
	valor numeric(10,2) not null,
	qtt numeric(10,3) not null,
	produtor_id varchar references produtor(id),
	produto_id varchar references produto(id),
	data_cad TIMESTAMP default now()
);

create table item_venda(
	id varchar(256) not null primary key,
	anuncio_id varchar references anuncio(id),
	venda_id varchar references venda(id),
	data_cad TIMESTAMP default now()
);

select * from produtor