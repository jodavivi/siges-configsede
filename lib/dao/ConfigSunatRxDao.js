const configSunat = require('../modelBd/entity/ConfigSunat');   

const sociedad = require('../modelBd/entity/Sociedad');   
const sede = require('../modelBd/entity/Sede');   
const area = require('../modelBd/entity/Area');   

exports.consultarConfigSunat = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroLista = {}; 
        oFiltroLista.where ={}; 
        if(oFiltro.iSociedadId !== undefined){
            oFiltroLista.where.SociedadId  = oFiltro.iSociedadId; 
        } 
        if(oFiltro.iSedeId !== undefined){
            oFiltroLista.where.SedeId  = oFiltro.iSedeId; 
        } 
        if(oFiltro.iAreaId !== undefined){
            oFiltroLista.where.AreaId  = oFiltro.iAreaId; 
        } 
        if(oFiltro.iId !== undefined){
            oFiltroLista.where.Id  = oFiltro.iId; 
        }  
        oFiltroLista.where.EstadoId     = 1;  
        oFiltroLista.include = [
            { model: sociedad, as: "Sociedad" },
            { model: sede, as: "Sede" },
            { model: area, as: "Area" }
        ]

        const consultarListaResponse = await  configSunat.findAll(oFiltroLista); 
        if(consultarListaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarListaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información de Configuración de Sede'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla:  Configuración de Sede, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}