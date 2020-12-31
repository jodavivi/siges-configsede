const sedeRxDao		 = require('../dao/SedeRxDao'); 
const utils 		 = require('../utils/utils'); 
 
/**
 * @description Función que permite consultar las sedes
 * @creation David Villanueva 29/12/2020
 * @update
 */
exports.consultarSede = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
		 //Verificamos si ya exista la tabla
		 var oFiltroSede = {};
		 oFiltroSede.iSociedadId  = req.query.iSociedadId;
		 oFiltroSede.iId 		  = req.query.iId; 
		 var consultarSedeResponse =  await sedeRxDao.consultarSede(oFiltroSede);
		 if(consultarSedeResponse.iCode !== 1){
			throw new Error(consultarSedeResponse.iCode + "||" + consultarSedeResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarSedeResponse.oData;
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
 