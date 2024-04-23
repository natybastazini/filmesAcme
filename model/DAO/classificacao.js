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

//Listar todos os classificação existentes na tabela.

const selectAllClassificacao = async function(){

    let sql = 'select * from tbl_classificacao order by id desc'

    //$queryRawUnsafe() ---- encaminha apenas variável.
    //$queryRaw('select * from tbl_classificacao') ---- encaminha o script.

    let rsClassificacao =  await  prisma.$queryRawUnsafe(sql)

    if (rsClassificacao.length > 0)
        return rsClassificacao
    else
        return false
}

//Buscar o classificação existente filtrando pelo ID.

const selectByIdClassificacao = async function(id){

    try {
        let sql = `select * from tbl_classificacao where id = ${id}`

        let rsClassificacao = await prisma.$queryRawUnsafe(sql)
        return rsClassificacao
         
    } catch (error) {
        return false
    }

   
}

//Buscar o classificação existente filtrando pelo nome.
const selectByNomeClassificacao = async function(nome){

    let nomeClassificacao = nome

    let sql = `select * from tbl_classificacao where nome like '%${nomeClassificacao}%'`

    let rsClassificacao = await prisma.$queryRawUnsafe(sql)

    if (nomeClassificacao.length > 0)
        return rsClassificacao
    else
        return false
}

const insertClassificacao = async function(dadosClassificacao){
    try {
        let sql;

        sql = `insert into tbl_classificacao (
                        sigla,
                        nome,
                        descricao,
                        icone
                ) values (
                    '${dadosClassificacao.sigla}',
                    '${dadosClassificacao.nome}',
                    '${dadosClassificacao.descricao}',
                    '${dadosClassificacao.icone}'
                
                )`

        console.log(sql)
        
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

//Atualizar uma classificação existente filtrando pelo ID.

const updateClassificacao = async function(id, dadosClassificacao){
    try {

        let sql

        sql = `update tbl_classificacao set
                                        sigla = '${dadosClassificacao.sigla}',
                                        nome = '${dadosClassificacao.nome}',
                                        descricao = '${dadosClassificacao.descricao}',
                                        icone = '${dadosClassificacao.icone}'
                                        where id = ${id}`
            

        // Executa o script SQL no Banco de Dados (devemos usar o comando execute e não o query)
        // O comando execute deve ser utilizado para INSERT, UPDATE, DELETE
        let resultado = await prisma.$executeRawUnsafe(sql)
        
        // Validação para verificar se o insert funcionou no DB
        if(resultado)
            return true
        else
            return false
    } catch (error) {
        return false
    }

}

const deleteClassificacao = async function(id){
    try {
        //Exclui a classificação pelo ID
        let sql = `delete from tbl_classificacao where id = ${id}`

        //Executa no Banco de Dados o script SQL
        let rsClassificacao = await prisma.$queryRawUnsafe(sql)
        return rsClassificacao
    } catch (error) {
        return false
    }

}

const selectUltimoId = async function(){
        
    try {
        sql = `select cast(last_insert_id() as decimal) as id from tbl_classificacao limit 1`
    
        let rsClassificacao = await prisma.$queryRawUnsafe(sql)
        return rsClassificacao
             
    } catch (error) {
        return false
    }

}

module.exports={
    selectAllClassificacao,
    selectByIdClassificacao,
    selectByNomeClassificacao,
    insertClassificacao,
    updateClassificacao,
    deleteClassificacao,
    selectUltimoId
}