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
                        valor_unitario
                        ) values (
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
                        
create table tbl_atores (
	id int not null auto_increment primary key,
    nome varchar(80) not null,
    personagem varchar(80) not null,
    descricao text,
    unique index (id),
    unique key (id)
);

insert into tbl_atores (nome,
						personagem,
						descricao						
						) values (
						'Adam Sandler',
                        'Lenny Feder',
                        'Adam Sandler é um ator, comediante e dublador norte-americano'
                        ),(
                        'Vin Diesel',
                        'Domminic Toretto',
                        'Mark Sinclair Vincent, mais conhecido como Vin Diesel é um ator, roteirista e produtor de cinema norte-americano.'
                        );
                        
create table tbl_diretores (
	id int not null auto_increment primary key,
    nome varchar(80) not null,
    descricao text,
    unique index (id),
    unique key (id)
);

insert into tbl_diretores ( nome,
							descricao						
							) values (
							'Rob Cohen',
							'Rob Cohen é um diretor de cinema norte-americano.'
							),(
							'Dennis Dugan',
							'Dennis Dugan é um diretor e ator de cinema e televisão.'
							);

create table tbl_classificacao (
	id int not null auto_increment primary key,
    categoria varchar(80) not null,
    descricao text,
    simbolo varchar(200) not null,
    unique index (id),
    unique key (id)
);

insert into tbl_classificacao ( categoria,
								descricao,
                                simbolo
								) values (
								'Livre para todos oos públicos',
                                'Histórias sem coteúdos potencialmente prejudiciais para qualquer faixa etária.',
                                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAXVBMVEUAr1H///8ApjTM6dUAqUCY1asArk4Aq0S/5s0qslj1+/d1yZEApC3X7+Ce2LKT1KlewoFpxom548havnZ2xovu+fLn9exrwoKHzput3b04tmJ7y5YAoBrF6NJFu2/vY2uQAAACP0lEQVR4nO3d0ZKaMBSA4QQ0KAu42pWuu7Xv/5gNy0Uvmm6X5giHw/873kq+ScLADKrzsfZb5VZd9XIdHC6++++7pUeT2+61HjH1qVh6LPlVtxFzD2HpoeRXvbUDpj6vfpENFfs6YkoTFheO14h5t4FxxSFiLOyYoersXd8sPQqhQuXdxcB5eazpXWdky0RM6/ZmMEVpCXO3hDlYwphaZmCUBkZrYLQGRmtgtAZGa2C0BkZrYLQGRmtgtAZGa2C0BkZrYLQGRmtgPi38TvRzvxAz85fCe9ftu0Snt3kmSRATXOnT1c/zPAEKJh0Y0cCk2wrmDGZyYNJtBfMEZnLzYF7WhwmWMKZmZiN7Bsz0wKQDIxqYdGBEA5MOjGhg0oERDUw6MKKZwwgdCYxoYNKBEQ1MOjCigUkHRjQw6cCIBiYdGNHM3WmC+TMwooFJt5UnNMBMjz2TbiszYwrDMpsemHQsM9HApNsKxtSeMYV5/tF8XjGWaZ4F4/v2H5VD90vmV1PmwXyx+pQ3FDAPw2QOBQwYMGDAgAEDBowgxtKFptczM87tD//d5aPM22tRzDG3zOOLYkJumcfnV7S0BkZrYLQGRmvWMJmXqooCozUwWgOjNTBaA6M1MFoDozUwWgOjNTBaA6M1MFoDozUwWouYzgymad2hWHoQUjW165ulByFUcD6+Zv9Dsse0e4oYK2eAooyYdp6v6jy66uc1YupXE1NTXHzE+PZoYNfsztcPjL+tf2rC8e5HzPrPASHcBscv0W4yhaAjDVsAAAAASUVORK5CYII='
								),(
								'Não recomendado para menores de 10 anos',
                                'Histórias de conteúdo violento e linguagem imprópria de nível leve.',
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/DJCTQ_-_10.svg/1024px-DJCTQ_-_10.svg.png'
								),
                                (
                                'Não recomendado para menores de 12 anos',
                                'Histórias com cena de agressão física, insinuação de consumoo de drogas e insinuação leve de sexo.',
                                'https://www.google.com/url?sa=i&url=https%3A%2F%2Flogodownload.org%2Fclassificacao-12-anos-logo%2F&psig=AOvVaw3CbU4x6PGjoKIx5cQ0lz2A&ust=1711550636479000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLC4_Y6VkoUDFQAAAAAdAAAAABAE'
                                ),
                                (
                                'Não recomendado para menores de 14 anos',
                                'Histórias com agressão física média, consumo de drogas explícito e insinuação de sexo moderada.',
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/DJCTQ_-_14.svg/1200px-DJCTQ_-_14.svg.png'
                                ),
                                (
                                'Não recomendado para menores de 16 anos',
                                'Histórias com consumo de drogas explícito, agressão física acentuada e insinuação de sexo acentuada.',
                                'https://www.google.com/url?sa=i&url=https%3A%2F%2Flogodownload.org%2Fclassificacao-16-anos-logo%2F&psig=AOvVaw3CbU4x6PGjoKIx5cQ0lz2A&ust=1711550636479000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLC4_Y6VkoUDFQAAAAAdAAAAABAI'
                                ),
                                (
                                'Não recomendado para menores de 18 anos',
                                'Histórias com consumo e indução ao consumo de drogas, violência extrema, suicídio, cenas de sexo explícitas e distúrbios psicossomáticos.',
                                'data:image/png;base64,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'
                                );

create table tbl_genero (
	id int not null auto_increment primary key,
    nome varchar(80) not null,
    unique index (id),
    unique key (id)
);

insert into tbl_genero ( nome					
							) values (
							'Comédia'
							),(
							'Ação'
							),(
							'Romance'
							),(
							'Drama'
							),(
							'Terror'
							),(
							'Ficção científica'
							),(
							'Comédia Romantica'
							),(
							'Animação'
							),(
							'Musical'
							),(
							'Documentario'
							)
                            ;

                        
-- ****************************************************************************************************
update tbl_filme set 
nome = 'Gente Grande',
sinopse = 'A morte do treinador de basquete de infância de velhos amigos reúne a turma no mesmo lugar que celebraram um campeonato anos atrás. Os amigos, acompanhados de suas esposas e filhos, descobrem que idade não significa o mesmo que maturidade',
duracao = '01:42:00',
data_lancamento = '2010-09-24',
data_relancamento = null,
foto_capa = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS3KC5CYzKSIx0aKLEL-lYfeeF7lfTqcd4nVGWOwO2IZaBzfdaz',
valor_unitario = 40
where id = 15;          
                        
select * from tbl_filme;

select id from tbl_filme order by id desc limit 1;

select cast(last_insert_id() as decimal) as id from tbl_filme limit 1;
                        
select * from tbl_filme where nome like '%velozes%';

drop table tbl_teste;

show tables;

desc tbl_filme;

delete from tbl_filme where id = 13;

