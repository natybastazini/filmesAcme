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

//Inserir novo gênero
const insertGenero = async function(dadosGenero){
    try {
        let sql;

        sql = `insert into tbl_genero (
                        nome
                ) values (
                    '${dadosGenero.nome}'
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

//Atualizar um gênero existente filtrando pelo ID.

const updateGenero = async function(id, dadosGenero){
    try {

        let sql;
        console.log(sql)

        sql = `update tbl_genero set
                                    nome = '${dadosGenero.nome}'
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

const deleteGenero = async function(id){
    try {
        //Exclui o filme pelo ID
        let sql = `delete from tbl_genero where id = ${id}`

        //Executa no Banco de Dados o script SQL
        let rsGenero = await prisma.$queryRawUnsafe(sql)
        return rsGenero
    } catch (error) {
        return false
    }

}

//Listar todos os gêneros existentes na tabela.

const selectAllGeneros = async function(){

    //Script SQL para listar todos os registros
    let sql = 'select * from tbl_genero order by id desc'

    //$queryRawUnsafe() ---- encaminha apenas variável.
    //$queryRaw('select * from tbl_genero') ---- encaminha o script.

    //Executa o scriptSQL no BD e recebe o retorno dos dados na variável rsFilmes
    let rsGeneros =  await  prisma.$queryRawUnsafe(sql)

    //Tratamento de erro para retornar os dados ou retornar false
    if (rsGeneros.length > 0)
        return rsGeneros
    else
        return false
}

//Buscar o gênero existente filtrando pelo ID.

const selectByIdGenero = async function(id){

    try {
        //Realiza a busca do gênero pelo ID
        let sql = `select * from tbl_genero where id = ${id}`

        //Executa no Banco de Dados o script SQL
        let rsGeneros = await prisma.$queryRawUnsafe(sql)
        return rsGeneros
         
    } catch (error) {
        return false
    } 
}

//Buscar o gênero existente filtrando pelo nome.
const selectByNomeGenero = async function(nome){

    let nomeGenero = nome

    let sql = `select * from tbl_genero where nome like '%${nomeGenero}%'`

    let rsGeneros = await prisma.$queryRawUnsafe(sql)

    if (nomeGenero.length > 0)
        return rsGeneros
    else
        return false
}

const selectUltimoId = async function(){
        
    try {
        sql = `select cast(last_insert_id() as decimal) as id from tbl_genero limit 1`
    
        let rsGenero = await prisma.$queryRawUnsafe(sql)
        return rsGenero
             
    } catch (error) {
        return false
    }

}

const selectByIdGeneroFilme = async function(id){

    try {
        let sql = `select tg.id, tg.nome from tbl_genero as tg
        inner join tbl_filme_genero as tfg
        on tg.id = tfg.genero_id where tfg.filme_id = ${id};`

        let rsGenero = await prisma.$queryRawUnsafe(sql)
        return rsGenero
         
    } catch (error) {
        return false
    }
}

module.exports={
    selectAllGeneros,
    selectByIdGenero,
    selectByNomeGenero,
    insertGenero,
    updateGenero,
    deleteGenero,
    selectUltimoId,
    selectByIdGeneroFilme
}