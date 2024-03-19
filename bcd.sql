create database db_acme_filmes_turma_ab;

use db_acme_filmes_turma_ab;

desc tbl_filme;

create table tbl_filme (
	id int not null auto_increment primary key,
    nome varchar(80) not null,
    sinopse text not null,
    duracao time not null,
    data_lancamento date not null,
    data_relancamento date,
    foto_capa varchar(200) not null,
    valor_unitario float,
    unique index (id),
    unique key (id)
);

insert into tbl_filme (	nome,
						sinopse,
                        duracao,
                        data_lancamento,
                        data_relancamento,
                        foto_capa,
                        valor_unitario) values (
                        'Sr. & Sra. Smith',
                        'John e Jane Smith aparentemente parecem formar um casal normal, mas na realidade ambos mantêm um segredo. Os dois são assassinos de aluguel contratados por empresas rivais. A verdade só vem à tona quando John e Jane, sem saber, recebem uma missão para eliminar o mesmo alvo e mais tarde descobrem que devem matar um ao outro.',
                        '02:06:00',
                        '2005-06-10',
                        null,
                        'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTIU3BZ4QRbkrZSXF19-pK-pAGevfhKvAUB5AIoi20jSO6e5i-0',
                        '50.00'
                        ),(
                        'Velozes e Furiosos',
                        'Brian OConner é um policial que se infiltra no submundo dos rachas de rua para investigar uma série de furtos. Enquanto tenta ganhar o respeito e a confiança do líder Dom Toretto, ele corre o risco de ser desmascarado.',
                        '01:46:00',
                        '2001-09-28',
                        null,
                        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSRzqY49FGdOAUVxHf6h0qXBw5CNwKiDMkXhdW0hFAxVS7hzf5F',
                        '50.00'
                        );
                        
select * from tbl_filme;

select id from tbl_filme order by id desc limit 1;

select cast(last_insert_id() as decimal) as id from tbl_filme limit 1;
                        
select * from tbl_filme where nome like '%velozes%';

drop table tbl_teste;

show tables;

desc tbl_filme;

delete from tbl_filme where id = 13;

