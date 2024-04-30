const setUpdateAtor = async function(id, contentType, dadosAtores){
    try{
        let idAtor = id;
        console.log(idAtor)

        if(idAtor == '' || idAtor == undefined || isNaN (idAtor)){
            return message.ERROR_INVALID_ID;

           
            
        }else{

        if(String(contentType).toLowerCase() == 'application/json'){
            let updateAtorJson = {};
           // Validação de campos obrigatórios e consistência de dados
            if( dadosAtores.nome == ''                       || dadosAtores.nome == undefined              || dadosAtores.nome.length > 150              ||
            dadosAtores.data_nascimento == ''            || dadosAtores.data_nascimento == undefined            || dadosAtores.data_nascimento.length > 10       || 
            dadosAtores.foto == ''                       || dadosAtores.foto == undefined           ||dadosAtores.foto.length > 65000           || 
            dadosAtores.biografia == ''                  || dadosAtores.biografia == undefined   ||dadosAtores.biografia.length > 65000         || 
            dadosAtores.sexo_id == ''                    || dadosAtores.sexo_id == undefined     ||    dadosAtores.sexo_id.length > 1        || 
            dadosAtores.nacionalidade_id == ''           || dadosAtores.nacionalidade_id == undefined     ||    dadosAtores.nacionalidade_id.length > 1       
    
    
        ){
            return message.ERROR_REQUIRED_FIELDS
        } else {

            let validateStatus = true;

            let atorById = await atoresDAO.selectAtorsById(id)

            if(atorById.length > 0){
                if (validateStatus){
                    let updateAtor = await atoresDAO.updateAtor(id,dadosAtores);
    
                    if(updateAtor){
                      
                        updateAtorJson.ator = dadosAtores
                        updateAtorJson.status = message.SUCESS_UPDATED_ITEM.status
                        updateAtorJson.status_code = message.SUCESS_UPDATED_ITEM.status_code
                        updateAtorJson.message = message.SUCESS_UPDATED_ITEM.message
    
                        return updateAtorJson;
                    } else {
                         return message.ERROR_INTERNAL_SERVER_DB
                    }
                }
            }else{
                return message.ERROR_NOT_FOUND
            }
        }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}