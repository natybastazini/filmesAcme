/**********************************************************************
 * Objetivo: Criar  interação com o banco de dados MySQL de filmes.
 * Data: 16/04/2024.
 * Autor: Natália Bastazini.
 * Versao: 1.0
 **********************************************************************/

const { PrismaClient } = require ('@prisma/client')
const prisma = new PrismaClient()

//Inserir um novo ator

const insertAtor = async function(dadosAtor){
    try {
        let sql

        if( dadosAtor.data_falecimento == null ||
            dadosAtor.data_falecimento == '' ||
            dadosAtor.data_falecimento == undefined
        ){
                sql = `insert into tbl_ator (
                            nome,
                            data_nascimento,
                            data_falecimento, 
                            foto,
                            biografia,
                            sexo_id
                ) values (
                    '${dadosAtor.nome}',
                    '${dadosAtor.data_nascimento}',
                    null,
                    '${dadosAtor.foto}',
                    '${dadosAtor.biografia}',
                    '${dadosAtor.sexo_id}'
                )`;
        }else{
                sql = `insert into tbl_ator (
                                                nome,
                                                data_nascimento,
                                                data_falecimento, 
                                                foto,
                                                biografia,
                                                sexo_id
                                            ) values (
                                                        '${dadosAtor.nome}',
                                                        '${dadosAtor.data_nascimento}',
                                                        '${dadosAtor.data_falecimento}',
                                                        '${dadosAtor.foto}',
                                                        '${dadosAtor.biografia}',
                                                        '${dadosAtor.sexo_id}'
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

//Atualizar um ator existente filtrando pelo ID.

const updateAtor = async function(id, dadosAtor){
    try {

        let sql

        if( dadosAtor.data_falecimento == null ||
            dadosAtor.data_falecimento == '' ||
            dadosAtor.data_falecimento == undefined
        ){    
            sql = `update tbl_ator set
                                        nome = '${dadosAtor.nome}',
                                        data_nascimento = '${dadosAtor.data_nascimento}',
                                        data_falecimento = null,
                                        foto = '${dadosAtor.foto}',
                                        biografia = '${dadosAtor.biografia}',
                                        sexo_id = ${dadosAtor.sexo_id}
                                        where id = ${id}`
            
        } else {

            sql = `update tbl_ator set 
                                        nome = '${dadosAtor.nome}',
                                        data_nascimento = '${dadosAtor.data_nascimento}',
                                        data_falecimento = '${dadosAtor.data_falecimento}',
                                        foto = '${dadosAtor.foto}',
                                        biografia = '${dadosAtor.biografia}',
                                        sexo_id = ${dadosAtor.sexo_id}
                                        where id = ${id}`

        }

        // Executa o script SQL no Banco de Dados (devemos usar o comando execute e não o query)
        // O comando execute deve ser utilizado para INSERT, UPDATE, DELETE
        let resultado = await prisma.$executeRawUnsafe(sql)
        
        // Validação para verificar se o insert funcionou no DB
        if(resultado)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }

}

//Excluir um ator existente filtrando pelo ID.

const deleteAtor = async function(id){
    try {
        //Exclui o Ator pelo ID
        let sql = `delete from tbl_ator where id = ${id}`

        let rsAtor = await prisma.$queryRawUnsafe(sql)
        return rsAtor
    } catch (error) {
        return false
    }

}

const selectAllAtores = async function(){

    //Script SQL para listar todos os registros
    let sql = 'select * from tbl_ator order by id desc'

    let rsAtores =  await  prisma.$queryRawUnsafe(sql)

    if (rsAtores.length > 0)
        return rsAtores
    else
        return false
}

const selectByIdAtor = async function(id){

    try {
        let sql = `select * from tbl_ator where id = ${id}`

        let rsAtor = await prisma.$queryRawUnsafe(sql)
        return rsAtor
         
    } catch (error) {
        return false
    }  
}

const selectByNomeAtor = async function(nome){

    let nomeAtor = nome

    let sql = `select * from tbl_ator where nome like '%${nomeAtor}%'`

    let rsAtor = await prisma.$queryRawUnsafe(sql)

    if (nomeAtor.length > 0)
        return rsAtor
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
    selectAllAtores,
    selectByIdAtor,
    selectByNomeAtor,
    selectUltimoId,
    insertAtor,
    updateAtor,
    deleteAtor
}