const Sequelize =  require('sequelize'); 
const db = require('../config/db');

/**
 * @description Función que permite crear una sequencia para la numeracion sunat por area_IdCongigSunat  
 * @creation David Villanueva 29/12/2020
 * @update
 */
exports.crearSequenciaSunat = async function (oParam) { 
    const oResponse = {};
    try {
        var nombreSequencia = "sequenciasunat." + '\"' +oParam.iAreaId + "_" + oParam.iConfigSunatId+ '\"';
        var query = 'CREATE SEQUENCE ' +nombreSequencia + ' START '+parseInt(oParam.sNumInicio,10);
        db.query(query);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK'; 
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: ConfigSunat, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite crear una sequencia para la numeracion sunat por area_IdCongigSunat  
 * @creation David Villanueva 29/12/2020
 * @update
 */
exports.actualizarSequenciaSunat = async function (oParam) { 
    const oResponse = {};
    try {
        var nombreSequencia = "sequenciasunat." + '\"' +oParam.iAreaId + "_" + oParam.iConfigSunatId+ '\"';
        var query = 'ALTER SEQUENCE ' +nombreSequencia + ' RESTART WITH '+parseInt(oParam.sNumInicio,10);
        db.query(query);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK'; 
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: ConfigSunat, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

 