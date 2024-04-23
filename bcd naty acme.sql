create database db_acme_filmes_turma_ab;

use db_acme_filmes_turma_ab;

desc tbl_filme;

drop database db_acme_filmes_turma_ab;

create table tbl_classificacao (
	id int not null auto_increment primary key,
    sigla varchar(4) not null,
    nome varchar(100),
    descricao varchar(300) not null,
    icone varchar(150),
    unique index (id),
    unique key (id)
);

insert into tbl_classificacao ( sigla,
								nome,
                                descricao,
                                icone
								) values (
								'AL',
                                'Livre para todos os púbicos.',
                                'Histórias sem conteúdos potencialmente prejudiciais para qualquer faixa etária.',
                                'https://logodownload.org/wp-content/uploads/2017/07/classificacao-livre-logo.png'
								),(
								'A10',
                                'Não recomendado para menores de 10 anos',
                                'Histórias de conteúdo violento e linguagem imprópria de nível leve.',
                                'https://logodownload.org/wp-content/uploads/2017/07/classificacao-10-anos-logo-1.png'
								),(
                                'A12',
                                'Não recomendado para menores de 12 anos',
                                'Histórias com cena de agressão física, insinuação de consumoo de drogas e insinuação leve de sexo.',
                                'https://logodownload.org/wp-content/uploads/2017/07/classificacao-12-anos-logo-1.png'
                                ),(
                                'A14',
                                'Não recomendado para menores de 14 anos',
                                'Histórias com agressão física média, consumo de drogas explícito e insinuação de sexo moderada.',
                                'https://logodownload.org/wp-content/uploads/2017/07/classificacao-14-anos-logo.png'
                                ),(
                                'A16',
                                'Não recomendado para menores de 16 anos',
                                'Histórias com consumo de drogas explícito, agressão física acentuada e insinuação de sexo acentuada.',
                                'https://logodownload.org/wp-content/uploads/2017/07/classificacao-16-anos-logo-1.png'
                                ),(
                                'A18',
                                'Não recomendado para menores de 18 anos',
                                'Histórias com consumo e indução ao consumo de drogas, violência extrema, suicídio, cenas de sexo explícitas e distúrbios psicossomáticos.',
                                'https://logodownload.org/wp-content/uploads/2017/07/classificacao-18-anos-logo-1.png'
                                );

create table tbl_filme (
	id int not null auto_increment primary key,
    nome varchar(100) not null,
    sinopse text not null,
    duracao time not null,
    data_lancamento date not null,
    data_relancamento date,
    foto_capa varchar(150) not null,
    valor_unitario float,
    unique index (id),
    unique key (id),
    classificacao_id int not null,
    foreign key (classificacao_id) references tbl_classificacao (id)
);

select cast(last_insert_id() as decimal) as id from tbl_filme limit 1;

insert into tbl_filme (	nome,
						sinopse,
                        duracao,
                        data_lancamento,
                        data_relancamento,
                        foto_capa,
                        valor_unitario,
                        classificacao_id
                        ) values (
                        'Sr. & Sra. Smith',
                        'John e Jane Smith aparentemente parecem formar um casal normal, 
                        mas na realidade ambos mantêm um segredo.
                        Os dois são assassinos de aluguel contratados por empresas rivais. 
                        A verdade só vem à tona quando John e Jane, sem saber, 
                        recebem uma missão para eliminar o mesmo alvo e mais tarde descobrem que devem matar um ao outro.',
                        '02:06:00',
                        '2005-06-10',
                        null,
                        'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTIU3BZ4QRbkrZSXF19-pK-pAGevfhKvAUB5AIoi20jSO6e5i-0',
                        '50.00',
                        4
                        ),(
                        'Velozes e Furiosos',
                        'Brian OConner é um policial que se infiltra no submundo dos rachas de rua para investigar uma série de furtos. 
                        Enquanto tenta ganhar o respeito e a confiança do líder Dom Toretto, ele corre o risco de ser desmascarado.',
                        '01:46:00',
                        '2001-09-28',
                        null,
                        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSRzqY49FGdOAUVxHf6h0qXBw5CNwKiDMkXhdW0hFAxVS7hzf5F',
                        '50.00',
                        3
                        );
                        
create table tbl_genero (
	id int not null auto_increment primary key,
    nome varchar(45) not null,
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
                        
create table tbl_filme_genero (
	id int not null auto_increment primary key,
    unique index (id),
    unique key (id),
    filme_id int,
    foreign key (filme_id) references tbl_filme (id),
    genero_id int,
    foreign key (genero_id) references tbl_genero (id)
);

insert into tbl_filme_genero (	filme_id,
								genero_id
								) value (
                                1, 2
                                ), (
                                1, 7
                                );
                            
create table tbl_sexo (
	id int not null auto_increment primary key,
	sigla varchar(1) not null,
    nome varchar(45) not null,
    unique index (id),
    unique key (id)
);

insert into tbl_sexo (
						sigla,
                        nome
					) values (
						'F',
                        'Feminino'
                    ),
                    (	'M',
						'Masculino'
                    );
                        
create table tbl_ator (
	id int not null auto_increment primary key,
    nome varchar(100) not null,
    data_nascimento date,
    data_falecimento date,
    foto varchar(200),
    biografia text,
    unique index (id),
    unique key (id),
    sexo_id int,
    foreign key (sexo_id) references tbl_sexo (id)
);

insert into tbl_ator (		nome,
							data_nascimento,
                            data_falecimento, 
                            foto,
                            biografia,
                            sexo_id
						) values (
						'Adam Sandler',
                        '1966-09-09',
                        null,
                        'https://br.web.img3.acsta.net/c_310_420/pictures/17/06/20/16/57/103535.jpg',
                        'Adam Richard Sandler é um ator, comediante, produtor, roteirista, 
                        dublador e músico norte-americano, de origem judaica. 
                        Depois de entrar para o elenco do Saturday Night Live,
                        Sandler passou a estrelar vários filmes de Hollywood que 
                        juntos arrecadaram mais de US$ 2 bilhões de dólares nas bilheterias',
                        2
                        ),(
                        'Vin Diesel',
                        '1967-07-18',
                        null,
                        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTgQM_Yxck1R7ECSXhxUGXAdD6tIF8OWz8avAWrXuB6G8X2kiu3',
                        'Mark Sinclair Vincent, mais conhecido como Vin Diesel é um ator, 
                        roteirista e produtor de cinema norte-americano. 
                        Depois de aparecer no filme de guerra Saving Private Ryan, 
                        ele ganhou fama internacional com seu papel como Dominic Toretto na franquia Velozes e Furiosos.',
                        2
                        );
                        
create table tbl_filme_ator (
	id int not null auto_increment primary key,
    filme_id int,
    foreign key (filme_id) references tbl_filme (id),
    ator_id int,
    foreign key (ator_id) references tbl_ator (id)
);

insert into tbl_filme_ator (
							filme_id,
                            ator_id
							)values (
                            2, 
                            2
							);


create table tbl_diretor (
	id int not null auto_increment primary key,
    nome varchar(100) not null,
    data_nascimento date,
    data_falecimento date,
    foto varchar(200),
    biografia text,
    unique index (id),
    unique key (id),
    sexo_id int,
    foreign key (sexo_id) references tbl_sexo (id)
);

insert into tbl_diretor ( 	nome,
							data_nascimento,
                            data_falecimento,
                            foto,
                            biografia,
                            sexo_id
							) values (
							'Rob Cohen',
                            '1949-03-12',
                            null,
                            'https://br.web.img3.acsta.net/c_310_420/pictures/15/09/16/16/15/319169.jpg',
							'Rob Cohen é um diretor de cinema norte-americano.',
                            2
							),(
							'Dennis Dugan',
                            '1946-09-05',
                            null,
                            'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/81509_v9_bb.jpg',
							'Dennis Dugan é um diretor e ator de cinema e televisão.',
                            2
							);
                            
create table tbl_filme_diretor (
	id int not null auto_increment primary key,
    filme_id int,
    foreign key (filme_id) references tbl_filme (id),
    diretor_id int,
    foreign key (diretor_id) references tbl_diretor (id)
);

insert into tbl_filme_diretor (
								filme_id,
                                diretor_id
								) values (
                                2, 1
                                );
                            
create table tbl_nacionalidade (
	id int not null auto_increment primary key,
    nome varchar(100) not null,
    unique index (id),
    unique key (id)
);

insert into tbl_nacionalidade (nome) values (
											'Brasileiro'
										),(
											'Estadunidense'
                                        );

create table tbl_ator_nacionalidade (
	id int not null auto_increment primary key,
    unique index (id),
    unique key (id),
    ator_id int,
    foreign key (ator_id) references tbl_ator (id),
    nacionalidade_id int,
     foreign key (nacionalidade_id) references tbl_nacionalidade (id)
);

insert into tbl_ator_nacionalidade (ator_id,
									nacionalidade_id
									) values (
											1, 2
										);

create table tbl_diretor_nacionalidade (
	id int not null auto_increment primary key,
    unique index (id),
    unique key (id),
    diretor_id int,
    foreign key (diretor_id) references tbl_diretor (id),
    nacionalidade_id int,
	foreign key (nacionalidade_id) references tbl_nacionalidade (id)
);

insert into tbl_diretor_nacionalidade (	diretor_id,
										nacionalidade_id
										) values (
											1, 2 
										);







                            


                        
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

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --     
                        
select * from tbl_filme;

select id from tbl_filme order by id desc limit 1;

select cast(last_insert_id() as decimal) as id from tbl_filme limit 1;
                        
select * from tbl_filme where nome like '%velozes%';

drop table tbl_filme;

drop database db_acme_filmes_turma_ab;

show tables;

desc tbl_sexo;

select * from tbl_sexo;

desc tbl_filme;

delete from tbl_filme where id = 13;

drop database db_acme_filmes_turma_ab;

select * from tbl_diretor where id = 1;

select * from tbl_diretor where nome like '';

select * from tbl_ator_nacionalidade as tan
inner join tbl_nacionalidade as tn
on tan.nacionalidade_id = tn.id where tn.id = 2;


