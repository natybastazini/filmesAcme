/**********************************************************************
 * Objetivo: Criar  interação com o banco de dados MySQL de filmes.
 * Data: 16/04/2024.
 * Autor: Natália Bastazini.
 * Versao: 1.0
 **********************************************************************/

const { PrismaClient } = require ('@prisma/client')
const prisma = new PrismaClient()

const insertDiretor = async function(dadosDiretor){
    try {
        let sql

        if( dadosDiretor.data_falecimento == null ||
            dadosDiretor.data_falecimento == '' ||
            dadosDiretor.data_falecimento == undefined
        ){
                sql = `insert into tbl_diretor (
                            nome,
							data_nascimento,
                            data_falecimento, 
                            foto,
                            biografia,
                            sexo_id
                ) values (
                    '${dadosDiretor.nome}',
                    '${dadosDiretor.data_nascimento}',
                    null,
                    '${dadosDiretor.foto}',
                    '${dadosDiretor.biografia}',
                    '${dadosDiretor.sexo_id}'
                )`;
        }else{
                sql = `insert into tbl_diretor (
                                                nome,
                                                data_nascimento,
                                                data_falecimento, 
                                                foto,
                                                biografia,
                                                sexo_id
                                            ) values (
                                                        '${dadosDiretor.nome}',
                                                        '${dadosDiretor.data_nascimento}',
                                                        '${dadosDiretor.data_falecimento}',
                                                        '${dadosDiretor.foto}',
                                                        '${dadosDiretor.biografia}',
                                                        '${dadosDiretor.sexo_id}'
                                            )`;
        } 

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

const deleteDiretor = async function(id){
    try {
        //Exclui o Ator pelo ID
        let sql = `delete from tbl_diretor where id = ${id}`

        let rsDiretor = await prisma.$queryRawUnsafe(sql)
        return rsDiretor
    } catch (error) {
        return false
    }

}

const selectAllDiretor = async function(){

    //Script SQL para listar todos os registros
    let sql = 'select * from tbl_diretor order by id desc'

    let rsDiretor =  await  prisma.$queryRawUnsafe(sql)

    if (rsDiretor.length > 0)
        return rsDiretor
    else
        return false
}

const selectByIdDiretor = async function(id){

    try {
        let sql = `select * from tbl_diretor where id = ${id}`

        let rsDiretor = await prisma.$queryRawUnsafe(sql)
        return rsDiretor
         
    } catch (error) {
        return false
    }  
}

const selectByNomeDiretor = async function(nome){

    let nomeDiretor = nome

    let sql = `select * from tbl_diretor where nome like '%${nomeDiretor}%'`

    let rsDiretor = await prisma.$queryRawUnsafe(sql)

    if (nomeDiretor.length > 0)
        return rsDiretor
    else
        return false
}

const selectUltimoId = async function(){
        
    try {
        sql = `select cast(last_insert_id() as decimal) as id from tbl_ator limit 1;`
    
        let rsAtor = await prisma.$queryRawUnsafe(sql)
        return rsAtor
             
    } catch (error) {
        return false
    }

}

module.exports = {
    selectAllDiretor,
    selectByIdDiretor,
    selectByNomeDiretor,
    selectUltimoId,
    insertDiretor,
    deleteDiretor
}