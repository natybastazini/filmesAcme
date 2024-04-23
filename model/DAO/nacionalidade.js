/**********************************************************************
 * Objetivo: Criar  interação com o banco de dados MySQL de filmes.
 * Data: 23/04/2024.
 * Autor: Natália Bastazini.
 * Versao: 1.0
 **********************************************************************/

const { PrismaClient } = require ('@prisma/client')
const prisma = new PrismaClient()

const selectByIdNacionalidade = async function(id){

    try {
        let sql = `select * from tbl_ator_nacionalidade as tan
        inner join tbl_nacionalidade as tn
        on tan.nacionalidade_id = tn.id where tn.id = ${id};`

        let rsNacionalidade = await prisma.$queryRawUnsafe(sql)
        return rsNacionalidade
         
    } catch (error) {
        return false
    }
}

module.exports = {
    selectByIdNacionalidade
}