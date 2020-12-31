const almacen = require('../modelBd/entity/Almacen');  
const sede = require('../modelBd/entity/Sede');  
const sociedad = require('../modelBd/entity/Sociedad');  


exports.consultarAlmacen = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroLista = {}; 
        oFiltroLista.where ={}; 
        if(oFiltro.iSedeId !== undefined){
            oFiltroLista.where.SedeId  = oFiltro.iSedeId; 
        } 
        if(oFiltro.iId !== undefined){
            oFiltroLista.where.Id  = oFiltro.iId; 
        }  
        oFiltroLista.where.EstadoId     = 1;  
        oFiltroLista.include = [
            { model: sede, as: "Sede" },
            { model: sociedad, as: "Sociedad" }  
        ]
        const consultarListaResponse = await  almacen.findAll(oFiltroLista); 
        if(consultarListaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarListaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información de almacen'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: almacen, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}