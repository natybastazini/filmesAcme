/**********************************************************************
 * Objetivo: Criar  interação com o banco de dados MySQL de filmes.
 * Data: 30/01/2024.
 * Autor: Natalia Bastazini.
 * Versao: 1.0
 **********************************************************************/

//Import da biblioteca doo prisma client
const { PrismaClient } = require ('@prisma/client')

//Instanciando o objeto prisma com as caraterísticas do prisma client
const prisma = new PrismaClient()

//Inserir um novo filme,

const insertFilme = async function(){

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

const selectByIdFilme = async function(){

}

module.exports={
    insertFilme, 
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme
}