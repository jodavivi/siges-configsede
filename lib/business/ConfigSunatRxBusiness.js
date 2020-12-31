const configSunatRxDao	= require('../dao/ConfigSunatRxDao'); 
const utils 		 	= require('../utils/utils'); 
 
/**
 * @description Función que permite consultar la configuracion sunat
 * @creation David Villanueva 29/12/2020
 * @update
 */
exports.consultarConfigSunat = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
		 //Verificamos si ya exista la tabla
		 var oFiltroSede = {};
		 oFiltroSede.iSociedadId  = req.query.iSociedadId;
		 oFiltroSede.iSedeId  	  = req.query.iSedeId;
		 oFiltroSede.iAreaId  	  = req.query.iAreaId;
		 oFiltroSede.iId 	  	  = req.query.iId; 
		 var consultarConfigSunatResponse =  await configSunatRxDao.consultarConfigSunat(oFiltroSede);
		 if(consultarConfigSunatResponse.iCode !== 1){
			throw new Error(consultarConfigSunatResponse.iCode + "||" + consultarConfigSunatResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarConfigSunatResponse.oData;
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};
 