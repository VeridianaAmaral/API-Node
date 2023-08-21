create table usuario(
	id bigserial not null PRIMARY key,
	nome varchar(70) not null,
	senha varchar(252) not null
);

create table despesa(
	id bigserial not null primary key,
	variavel boolean not null,
	valor numeric(10,5) not null,
	nome varchar(50) not null,
	parcela int
);