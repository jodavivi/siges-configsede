const almacenRxDao	 = require('../dao/AlmacenRxDao'); 
const utils 		 = require('../utils/utils'); 
 
/**
 * @description Función que permite consultar almacen
 * @creation David Villanueva 29/12/2020
 * @update
 */
exports.consultarAlmacen = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
		 //Verificamos si ya exista la tabla
		 var oFiltroSede = {};
		 oFiltroSede.iSedeId  = req.query.iSedeId;
		 oFiltroSede.iId 	  = req.query.iId; 
		 var consultarAlmacenResponse =  await almacenRxDao.consultarAlmacen(oFiltroSede);
		 if(consultarAlmacenResponse.iCode !== 1){
			throw new Error(consultarAlmacenResponse.iCode + "||" + consultarAlmacenResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarAlmacenResponse.oData;
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
 