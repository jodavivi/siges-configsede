const areaRxDao		 = require('../dao/AreaRxDao'); 
const utils 		 = require('../utils/utils'); 
 
/**
 * @description Función que permite consultar las areas
 * @creation David Villanueva 29/12/2020
 * @update
 */
exports.consultarArea = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
		 //Verificamos si ya exista la tabla
		 var oFiltroSede = {};
		 oFiltroSede.iSedeId  = req.query.iSedeId;
		 oFiltroSede.iId 	  = req.query.iId; 
		 var consultarAreaResponse =  await areaRxDao.consultarArea(oFiltroSede);
		 if(consultarAreaResponse.iCode !== 1){
			throw new Error(consultarAreaResponse.iCode + "||" + consultarAreaResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarAreaResponse.oData;
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
 