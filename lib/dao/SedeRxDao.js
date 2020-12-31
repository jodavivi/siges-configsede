const sede      = require('../modelBd/entity/Sede');   
const sociedad  = require('../modelBd/entity/Sociedad');   

exports.consultarSede = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroLista = {}; 
        oFiltroLista.where ={}; 
        if(oFiltro.iSociedadId !== undefined){
            oFiltroLista.where.SociedadId  = oFiltro.iSociedadId; 
        } 
        if(oFiltro.iId !== undefined){
            oFiltroLista.where.Id  = oFiltro.iId; 
        }  
        oFiltroLista.where.EstadoId     = 1;  
        oFiltroLista.include = [
            { model: sociedad, as: "Sociedad" } 
        ]
        const consultarListaResponse = await  sede.findAll(oFiltroLista); 
        if(consultarListaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarListaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información de sedes'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: sede, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}