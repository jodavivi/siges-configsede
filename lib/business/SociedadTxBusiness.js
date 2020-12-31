const sociedadTxDao				= require('../dao/SociedadTxDao');  
const utils 					= require('../utils/utils'); 
 
/**
 * @description Función que permite registrar una sociedad
 * @creation David Villanueva 29/12/2020
 * @update
 */
exports.registrarSociedad = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {};
	 var oRequest			= null;
     try {
		 oRequest		 = utils.customRequest(req); 
		 //Regustramos la tabla
		 var oSociedad = {};
		 oSociedad.oAuditRequest = oRequest.oAuditRequest;
		 oSociedad.oData		  = oRequest.oData; 
		 const crearSociedadResponse = await  sociedadTxDao.crearSociedad(oSociedad);
		 if(crearSociedadResponse.iCode !== 1){
			throw new Error(crearSociedadResponse.iCode + "||" + crearSociedadResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= crearSociedadResponse.oData;
		
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
 * @description Función que permite actualizar una Sociedad
 * @creation David Villanueva 01/12/2020
 * @update
 */
exports.actualizarSociedad = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {};
	var oRequest			= null;
	try {
		oRequest		 = utils.customRequest(req);
		//actualizamos la tabla
		var oSociedad = {};
		oSociedad.oAuditRequest  = oRequest.oAuditRequest;
		oSociedad.oData		  = oRequest.oData; 
		oSociedad.oData.iId	  = parseInt(req.params.id, 10); 
		const actualizarSociedadResponse = await  sociedadTxDao.actualizarSociedad(oSociedad);
		if(actualizarSociedadResponse.iCode !== 1){
		   throw new Error(actualizarSociedadResponse.iCode + "||" + actualizarSociedadResponse.sMessage);
		}
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
		oResponse.oData			= actualizarSociedadResponse.oData;
	   
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
 * @description Función que permite eliminar una sociedad
 * @creation David Villanueva 29/12/2020
 * @update
 */
exports.eliminarSociedad = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {};
	var oRequest			= null;
	try {
		oRequest		 = utils.customRequest(req);
		//eliminamos la sociedad 
		oRequest.oData.aItems.forEach(async function(e){
			var oSociedad = {};
			oSociedad.oAuditRequest  = oRequest.oAuditRequest;
			oSociedad.oData		  	 = oRequest.oData; 
			oSociedad.oData.iId	  	 = parseInt(e, 10); 
			const eliminarSociedadResponse = await  sociedadTxDao.eliminarSociedad(oSociedad);
			if(eliminarSociedadResponse.iCode !== 1){
				throw new Error(eliminarSociedadResponse.iCode + "||" + eliminarSociedadResponse.sMessage);
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

