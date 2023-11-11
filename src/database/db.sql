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
	data_cad TIMESTAMP default now(),
	ativo boolean default true not null
);

create table produto(
	id varchar(256) not null primary key,
	imagem varchar(256) not null,
	nome varchar(100) not null,
	categoria varchar(100) not null,
	data_cad TIMESTAMP default now(),
	ativo boolean default true not null
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
	data_cad TIMESTAMP default now(),
	ativo boolean default true not null
);

create type status as enum ('Preparando', 'Pronto para envio', 'Em transito', 'Conclúido');

create table venda(
	id varchar(256) not null primary key,
	consumidor_id varchar references consumidor(id),
	produtor_id varchar references produtor(id),
	status status,
	data_venda TIMESTAMP default now()
);

insert into venda(id, consumidor_id, produtor_id, status)
values('sfsdhfkjdsksfhk','919a353c-d818-43bd-9342-3fcc417874da',
	   '6a7176bd-ac99-429e-92d0-a9afea33922e', 'Preparando');

create table anuncio(
	id varchar(256) not null primary key,
	valor numeric(10,2) not null,
	qtt numeric(10,3) not null,
	produtor_id varchar references produtor(id),
	produto_id varchar references produto(id),
	data_cad TIMESTAMP default now(),
	ativo boolean default true not null
);

insert into anuncio(id, valor, qtt, produtor_id, produto_id) 
values('urjdjduriwue', 239.45, 23.00, '6a7176bd-ac99-429e-92d0-a9afea33922e',
	  '18bd5935-e47e-42a1-8e93-4ea6f8017032');
	  
	  

create table item_venda(
	id varchar(256) not null primary key,
	valor numeric(10,2) not null,
	qtt numeric(10,3) not null,
	anuncio_id varchar references anuncio(id),
	venda_id varchar references venda(id),
	data_cad TIMESTAMP default now()
);


create function inserirVenda(consumidor_id_r varchar, produtor_id_r varchar, status_r status, valor_r numeric, qtt_r numeric, anuncio_id_r varchar, venda_id_r varchar, item_venda_id_r varchar)
RETURNS void as $$
begin 
	insert into venda(id, consumidor_id, produtor_id, status)
	values(venda_id_r, consumidor_id_r, produtor_id_r, status_r);
	insert into item_venda(id, valor, qtt, anuncio_id, venda_id)
	values(item_venda_id_r, valor_r, qtt_r, anuncio_id_r, venda_id_r);
end;
$$ language plpgsql;

select inserirVenda('919a353c-d818-43bd-9342-3fcc417874da',
	   '6a7176bd-ac99-429e-92d0-a9afea33922e',
	   'Preparando', 234.98, 23.00, 'urjdjduriwue', 'hjhjhjhghg', 'dfgdfgdfg' )
	   

create type listaVendas as (
venda_status status,
    qtt numeric,
    valor numeric,
    produto_nome varchar,
    produtor_nome varchar
)

CREATE OR REPLACE FUNCTION listarVendas(id_consumidor varchar, status_venda status)
RETURNS SETOF listaVendas AS $$ 
DECLARE 
    saida listaVendas;
BEGIN
    FOR saida IN
        SELECT
            v.status as venda_status,
            it.qtt,
            it.valor,
            pr.nome as produto_nome,
            pd.nome as produtor_nome
        FROM
            venda v
        JOIN
            item_venda it ON v.id = it.venda_id
        JOIN
            anuncio an ON it.anuncio_id = an.id
        JOIN
            produto pr ON an.produto_id = pr.id
        JOIN
            produtor pd ON an.produtor_id = pd.id
        WHERE
            v.consumidor_id = id_consumidor
            AND v.status = status_venda
    LOOP
        RETURN NEXT saida;
    END LOOP;
    RETURN;
END;
$$ LANGUAGE plpgsql;


select  * from listarVendas('919a353c-d818-43bd-9342-3fcc417874da', 'Preparando');

