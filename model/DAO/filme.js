/**********************************************************************
 * Objetivo: Criar  interação com o banco de dados MySQL de filmes.
 * Data: 30/01/2024.
 * Autor: Natália Bastazini.
 * Versao: 1.0
 **********************************************************************/

//Import da biblioteca doo prisma client
const { PrismaClient } = require ('@prisma/client')

//Instanciando o objeto prisma com as caraterísticas do prisma client
const prisma = new PrismaClient()

//Inserir um novo filme,

const insertFilme = async function(dadosFilme){
    try {
        let sql

        if(dadosFilme.data_relancamento == null || dadosFilme.data_relancamento == '' || dadosFilme.data_relancamento == undefined){
            sql = `insert into tbl_filme (
                nome,
                sinopse,
                data_lancamento,
                data_relancamento,
                duracao,
                foto_capa,
                valor_unitario
            ) values (
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.data_lancamento}',
                null,
                '${dadosFilme.duracao}',
                '${dadosFilme.foto_capa}',
                '${dadosFilme.valor_unitario}'
            )`;   
        }else{
            //Script SQL para inserir os dados no banco
            sql = `insert into tbl_filme (
                                            nome,
                                            sinopse,
                                            data_lancamento,
                                            data_relancamento,
                                            duracao,
                                            foto_capa,
                                            valor_unitario
                                        ) values (
                                            '${dadosFilme.nome}',
                                            '${dadosFilme.sinopse}',
                                            '${dadosFilme.data_lancamento}',
                                            '${dadosFilme.data_relancameto}',
                                            '${dadosFilme.duracao}',
                                            '${dadosFilme.foto_capa}',
                                            '${dadosFilme.valor_unitario}'
                                        )`;
        }
        
        //Executa o scriptSQL no BD (devemos usar o comando execute não query)
        //O comando execute deve ser utilizado para (insert, update e delete)
        let result = await prisma.$executeRawUnsafe(sql)
        
        //Validação para verificar se o insert funcionou no BD
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Atualizar um filme existente filtrando pelo ID.

const updateFilme = async function(id){

}

//Excluir um filme existente filtrando pelo ID.

const deleteFilme = async function(id){

}

//Listar todos os filmes existentes na tabela.

const selectAllFilmes = async function(){

    //Script SQL para listar todos os registros
    let sql = 'select * from tbl_filme'

    //$queryRawUnsafe() ---- encaminha apenas variável.
    //$queryRaw('select * from tbl_filme') ---- encaminha o script.

    //Executa o scriptSQL no BD e recebe o retorno dos dados na variável rsFilmes
    let rsFilmes =  await  prisma.$queryRawUnsafe(sql)

    //Tratamento de erro para retornar os dados ou retornar false
    if (rsFilmes.length > 0)
        return rsFilmes
    else
        return false
}

//Buscar o filme existente filtrando pelo ID.

const selectByIdFilme = async function(id){

    try {
        //Realiza a busca do filme pelo ID
        let sql = `select * from tbl_filme where id = ${id}`

        //Executa no Banco de Dados o script SQL
        let rsFilme = await prisma.$queryRawUnsafe(sql)
        return rsFilme
         
    } catch (error) {
        return false
    }

   
}

//Buscar o filme existente filtrando pelo nome.
const selectByNomeFilme = async function(nome){

    let nomeFilme = nome

    let sql = `select * from tbl_filme where nome like '%${nomeFilme}%'`

    let rsFilmes = await prisma.$queryRawUnsafe(sql)

    if (nomeFilme.length > 0)
        return rsFilmes
    else
        return false
}

module.exports={
    insertFilme, 
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectByNomeFilme
}