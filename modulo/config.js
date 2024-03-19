/*****************************************************************************************************
 * Objetivo: Arquivo responsável pelas configurações globais de mensagens, valores e conteúdos 
 * para o projeto.
 * Data: 20/02/2024.
 * Autor: Natália Bastazini.
 * Versao: 1.0
 ****************************************************************************************************/

/********************  MENSAGENS DE ERRO ********************/
const ERROR_INVALID_ID              =   {status: false, status_code: 400, message: 'O ID encaminhado na requisição não é válido!!!'}

const ERROR_REQUIRED_FIELDS         =   {status: false, status_code: 400, message: 'Existem dados obrigatórios que não foram prreenchidos corretamente!!!'}

const ERROR_NOT_FOUND               =   {status: false, status_code: 404, message: 'Nenhum item encontrado na requisição!!!'}

const ERROR_INTERNAL_SERVER_DB      =   {status: false, status_code: 500, message: 'Ocorreram erros internos no servidor de Banco de Dados, por favor contate o administrador do sistema!!!'}

const ERROR_INVALID                 =   {status: false, status_code: 400, message: 'O nome encaminhado na requisição não é válido!!!'}

const ERROR_CONTENT_TYPE            =   {status: false, status_code: 415, message: 'O Content-Type da requisição não é suportado. Precisa ser enviados dados no formato application/JSON!!!'}

const ERROR_INTERNAL_SERVER         =   {status: false, status_code: 500, message: 'Ocorreram erros internos no servidor na camada de negócio da API, por favor contate o administrador do sistema!!!'}

/********************  MENSAGENS DE SUCESSO ********************/

const SUCESS_CREATED_ITEM           =   {status: true, status_code: 201,message: 'Item criado com sucesso no Banco de Dados!!!'}

const SUCESS_DELETED_ITEM           =   {status: true, status_code: 200,message: 'Item deletado com sucesso no Banco de Dados!!!'}

module.exports={
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_INVALID,
    ERROR_REQUIRED_FIELDS,
    SUCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER,
    SUCESS_DELETED_ITEM
}