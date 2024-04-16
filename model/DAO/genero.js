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

//Listar todos os gêneros existentes na tabela.

const selectAllGeneros = async function(){

    let sql = 'select * from tbl_genero order by id desc'

    //$queryRawUnsafe() ---- encaminha apenas variável.
    //$queryRaw('select * from tbl_filme') ---- encaminha o script.

    let rsGenero =  await  prisma.$queryRawUnsafe(sql)

    if (rsGenero.length > 0)
        return rsGenero
    else
        return false
}

//Buscar o gênero existente filtrando pelo ID.

const selectByIdGenero = async function(id){

    try {
        let sql = `select * from tbl_genero where id = ${id}`

        let rsGenero = await prisma.$queryRawUnsafe(sql)
        return rsGenero
         
    } catch (error) {
        return false
    }

   
}

//Buscar o gênero existente filtrando pelo nome.
const selectByNomeGenero = async function(nome){

    let nomeGenero = nome

    let sql = `select * from tbl_genero where nome like '%${nomeGenero}%'`

    let rsGenero = await prisma.$queryRawUnsafe(sql)

    if (nomeGenero.length > 0)
        return rsGenero
    else
        return false
}

module.exports={
    selectAllGeneros,
    selectByIdGenero,
    selectByNomeGenero
}