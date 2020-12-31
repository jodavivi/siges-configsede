const sede = require('../modelBd/entity/Sede'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config = require('../config/config.json');  

/**
 * @description Función que permite crear una sede 
 * @creation David Villanueva 29/12/2020
 * @update
 */
exports.crearSede = async function (oParam) { 
    const oResponse = {};
    try {
        var seqSede = "'" +config.seqSede +"'";
        var seq = await utilsDao.obtenetSequencia(seqSede);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oRegistro = {};
        oRegistro.Id               = parseInt(seq.oData, 10);
        oRegistro.EstadoId         = 1;
        oRegistro.UsuarioCreador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion = oParam.oAuditRequest.sTerminal;

        oRegistro.SociedadId       = oParam.oData.iSociedadId;
        oRegistro.CodDepartamento  = oParam.oData.sCodDepartamento;
        oRegistro.Departamento     = oParam.oData.sDepartamento;
        oRegistro.CodProvincia     = oParam.oData.sCodProvincia;
        oRegistro.Provincia        = oParam.oData.sProvincia;
        oRegistro.CodDistrito      = oParam.oData.sCodDistrito;
        oRegistro.Distrito         = oParam.oData.sDistrito;
        oRegistro.Direccion        = oParam.oData.sDireccion;
        oRegistro.Telefono         = oParam.oData.sTelefono;
        oRegistro.EstadoSede       = oParam.oData.iEstadoSede; 
         
        const crearRegistroPromise = await sede.create(oRegistro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: sede, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}


/**
 * @description Función que permite actualizar Sede 
 * @creation David Villanueva 29/12/2020
 * @update
 */
exports.actualizarSede = async function (oParam) { 
    const oResponse = {};
    try {
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        
        if(oParam.oData.iSociedadId !== undefined){
            oRegistro.SociedadId     = oParam.oData.iSociedadId; 
        }
        if(oParam.oData.sSede !== undefined){
            oRegistro.Sede     = oParam.oData.sSede; 
        }
        if(oParam.oData.sCodDepartamento !== undefined){
            oRegistro.CodDepartamento     = oParam.oData.sCodDepartamento; 
        }
        if(oParam.oData.sDepartamento !== undefined){
            oRegistro.Departamento     = oParam.oData.sDepartamento; 
        }
        if(oParam.oData.sCodProvincia !== undefined){
            oRegistro.CodProvincia     = oParam.oData.sCodProvincia; 
        }
        if(oParam.oData.sProvincia !== undefined){
            oRegistro.Provincia     = oParam.oData.sProvincia; 
        }
        if(oParam.oData.sProvincia !== undefined){
            oRegistro.Provincia     = oParam.oData.sProvincia; 
        }
        if(oParam.oData.sCodDistrito !== undefined){
            oRegistro.CodDistrito     = oParam.oData.sCodDistrito; 
        }
        if(oParam.oData.sDistrito !== undefined){
            oRegistro.Distrito     = oParam.oData.sDistrito; 
        }
        if(oParam.oData.sDireccion !== undefined){
            oRegistro.Direccion     = oParam.oData.sDireccion; 
        }
        if(oParam.oData.sTelefono !== undefined){
            oRegistro.Telefono     = oParam.oData.sTelefono; 
        }
        if(oParam.oData.iEstadoSede !== undefined){
            oRegistro.EstadoSede     = oParam.oData.iEstadoSede; 
        }
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await sede.update(oRegistro, oFiltro);

        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: sede, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar Sede 
 * @creation David Villanueva 29/12/2020
 * @update
 */
exports.eliminarSede = async function (oParam) { 
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
        const acrualizarRegistroPromise = await sede.update(oRegistro, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: sede, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}