const configSunat = require('../modelBd/entity/ConfigSunat'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config = require('../config/config.json');  

/**
 * @description Función que permite crear ConfigSunat 
 * @creation David Villanueva 29/12/2020
 * @update
 */
exports.crearConfigSunat = async function (oParam) { 
    const oResponse = {};
    try {
        var seqConfigSunat = "'" +config.seqConfigSunat +"'";
        var seq = await utilsDao.obtenetSequencia(seqConfigSunat);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oRegistro = {};
        oRegistro.Id               = parseInt(seq.oData, 10);
        oRegistro.EstadoId         = 1;
        oRegistro.UsuarioCreador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion = oParam.oAuditRequest.sTerminal; 
        oRegistro.SociedadId        = oParam.oData.iSociedadId;
        oRegistro.SedeId            = oParam.oData.iSedeId;
        oRegistro.AreaId            = oParam.oData.iAreaId;
        oRegistro.CodTipoDocumento  = oParam.oData.sCodTipoDocumento;
        oRegistro.TipoDocumento     = oParam.oData.sTipoDocumento;
        oRegistro.Serie             = oParam.oData.sSerie;
        oRegistro.NumInicio         = oParam.oData.sNumInicio;
        oRegistro.EstadoConfigSunat = oParam.oData.iEstadoConfigSunat;   
        const crearRegistroPromise = await configSunat.create(oRegistro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: ConfigSunat, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}


/**
 * @description Función que permite actualizar ConfigSunat 
 * @creation David Villanueva 29/12/2020
 * @update
 */
exports.actualizarConfigSunat = async function (oParam) { 
    const oResponse = {};
    try {
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        
        if(oParam.oData.iSociedadId !== undefined){
            oRegistro.SociedadId     = oParam.oData.iSociedadId; 
        }
        if(oParam.oData.iSedeId !== undefined){
            oRegistro.SedeId     = oParam.oData.iSedeId; 
        }
        if(oParam.oData.iAreaId !== undefined){
            oRegistro.AreaId     = oParam.oData.iAreaId; 
        }
        if(oParam.oData.sCodTipoDocumento !== undefined){
            oRegistro.CodTipoDocumento     = oParam.oData.sCodTipoDocumento; 
        }
        if(oParam.oData.sTipoDocumento !== undefined){
            oRegistro.TipoDocumento     = oParam.oData.sTipoDocumento; 
        }
        if(oParam.oData.sSerie !== undefined){
            oRegistro.Serie     = oParam.oData.sSerie; 
        }
        if(oParam.oData.sNumInicio !== undefined){
            oRegistro.NumInicio     = oParam.oData.sNumInicio; 
        }
        if(oParam.oData.iEstadoConfigSunat !== undefined){
            oRegistro.EstadoConfigSunat     = oParam.oData.iEstadoConfigSunat; 
        }
         
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await configSunat.update(oRegistro, oFiltro);

        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: ConfigSunat, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar ConfigSunat 
 * @creation David Villanueva 29/12/2020
 * @update
 */
exports.eliminarConfigSunat = async function (oParam) { 
    const oResponse = {};
    try {
 
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        oRegistro.EstadoId             = 0;
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await configSunat.update(oRegistro, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: ConfigSunat, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}