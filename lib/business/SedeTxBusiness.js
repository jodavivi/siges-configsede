const sedeTxDao	 = require('../dao/SedeTxDao');  
const utils 	 = require('../utils/utils'); 
 
/**
 * @description Función que permite registrar una Sede
 * @creation David Villanueva 29/12/2020
 * @update
 */
exports.registrarSede = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {};
	 var oRequest			= null;
     try {
		 oRequest		 = utils.customRequest(req); 
		 //Registramos el parametro
		 var oRegistro = {};
		 oRegistro.oAuditRequest = oRequest.oAuditRequest;
		 oRegistro.oData		  = oRequest.oData;
		 oRegistro.oData.sTipo	  = "C";
		 oRegistro.oData.sFuente = "APP"; 
		 const crearSedeResponse = await  sedeTxDao.crearSede(oRegistro);
		 if(crearSedeResponse.iCode !== 1){
			throw new Error(crearSedeResponse.iCode + "||" + crearSedeResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= crearSedeResponse.oData;
		
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
		oResponse.oData	= oRequest.oData;
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};


/**
 * @description Función que permite actualizar una sede
 * @creation David Villanueva 29/12/2020
 * @update
 */
exports.actualizarSede = async (req, res) => { 
	var oResponse		 = {};
	oResponse.oData		 = {};
	var oRequest		 = null;
	try { 
		oRequest		 = utils.customRequest(req);
		//actualizamos la Sede
		var oRegistro = {};
		oRegistro.oAuditRequest  = oRequest.oAuditRequest;
		oRegistro.oData		  = oRequest.oData; 
		oRegistro.oData.iId	  = parseInt(req.params.id, 10); 
		const actualizarSedeResponse = await  sedeTxDao.actualizarSede(oRegistro);
		if(actualizarSedeResponse.iCode !== 1){
		   throw new Error(actualizarSedeResponse.iCode + "||" + actualizarSedeResponse.sMessage);
		}
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
		oResponse.oData			= oRequest.oData; 
	   
	} catch (e) {
	   var oError = utils.customError(e);
	   if (e.name === 'Error') {
		   oResponse.iCode 	= oError.iCode; 
		   oResponse.sMessage	= oError.sMessage;
	   }else{
		   oResponse.iCode 		= -2;
		   oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
	   } 
	   oResponse.oData	= oRequest.oData;
	}finally{
		oResponse.sIdTransaccion =  req.headers.sidtransaccion;
		oResponse = utils.customResponse(oResponse);
	}  
	res.json(oResponse) 
};

/**
 * @description Función que permite eliminar sedes
 * @creation David Villanueva 29/12/2020
 * @update
 */
exports.eliminarSede = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {};
	var oRequest			= null;
	try {
		oRequest		 = utils.customRequest(req);
		//actualizamos la tabla
		oRequest.oData.aItems.forEach(async function(e){
			var oRegistro = {};
			oRegistro.oAuditRequest  = oRequest.oAuditRequest;
			oRegistro.oData		  	 = {}; 
			oRegistro.oData.iId	  	 = parseInt(e, 10); 
			const eliminarSedeResponse = await  sedeTxDao.eliminarSede(oRegistro);
			if(eliminarSedeResponse.iCode !== 1){
				throw new Error(eliminarSedeResponse.iCode + "||" + eliminarSedeResponse.sMessage);
			} 
		});
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
	   
	} catch (e) {
	   var oError = utils.customError(e);
	   if (e.name === 'Error') {
		   oResponse.iCode 	= oError.iCode; 
		   oResponse.sMessage	= oError.sMessage;
	   }else{
		   oResponse.iCode 		= -2;
		   oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
	   } 
	   oResponse.oData	= oRequest.oData;
	}finally{
		oResponse.sIdTransaccion =  req.headers.sidtransaccion;
		oResponse = utils.customResponse(oResponse);
	}  
	res.json(oResponse) 
};

