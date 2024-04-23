/**********************************************************************
 * Objetivo: Criar  interação com o banco de dados MySQL de filmes.
 * Data: 23/04/2024.
 * Autor: Natália Bastazini.
 * Versao: 1.0
 **********************************************************************/

const { PrismaClient } = require ('@prisma/client')
const prisma = new PrismaClient()

const selectByIdSexo = async function(id){

    try {
        let sql = `select * from tbl_sexo where id = ${id}`

        let rsSexo = await prisma.$queryRawUnsafe(sql)
        return rsSexo
         
    } catch (error) {
        return false
    }
}

module.exports = {
    selectByIdSexo
}