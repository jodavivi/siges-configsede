const configSunatTxDao	 = require('../dao/ConfigSunatTxDao');  
const utils 	     	 = require('../utils/utils'); 
const sequenciaSunatTxDao	 = require('../dao/SequenciaSunatTxDao');  

/**
 * @description Función que permite registrar configuracion sunat
 * @creation David Villanueva 29/12/2020
 * @update
 */
exports.registrarConfigSunat = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {};
	 var oRequest			= null;
     try {
		 oRequest		 = utils.customRequest(req); 
		 //Registramos ConfigSunat
		 var oRegistroArea = {};
		 oRegistroArea.oAuditRequest  = oRequest.oAuditRequest;
		 oRegistroArea.oData		  = oRequest.oData; 
		 const crearConfigSunatResponse = await  configSunatTxDao.crearConfigSunat(oRegistroArea);
		 if(crearConfigSunatResponse.iCode !== 1){
			throw new Error(crearConfigSunatResponse.iCode + "||" + crearConfigSunatResponse.sMessage);
		 }
		 var oConfigSunat = crearConfigSunatResponse.oData;
		 //Creamos la numeracion o sequencia para el folio sunat
		 var oParamSeq = {};
		 oParamSeq.iAreaId 		  = oRequest.oData.iAreaId;
		 oParamSeq.iConfigSunatId = oConfigSunat.Id; 
		 oParamSeq.sNumInicio	  = oRequest.oData.sNumInicio;
		 const crearSequenciaSunatResponse = await  sequenciaSunatTxDao.crearSequenciaSunat(oParamSeq);
		 if(crearSequenciaSunatResponse.iCode !== 1){
			throw new Error(crearSequenciaSunatResponse.iCode + "||" + crearSequenciaSunatResponse.sMessage);
		 }

     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= oConfigSunat;
		
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
 * @description Función que permite actualizar configuracion sunat
 * @creation David Villanueva 29/12/2020
 * @update
 */
exports.actualizarConfigSunat = async (req, res) => { 
	var oResponse		 = {};
	oResponse.oData		 = {};
	var oRequest		 = null;
	try { 
		oRequest		 = utils.customRequest(req);
		//actualizamos Area
		var oRegistro = {};
		oRegistro.oAuditRequest  = oRequest.oAuditRequest;
		oRegistro.oData		     = oRequest.oData; 
		oRegistro.oData.iId	     = parseInt(req.params.id, 10); 
		const actualizarConfigSunatResponse = await  configSunatTxDao.actualizarConfigSunat(oRegistro);
		if(actualizarConfigSunatResponse.iCode !== 1){
		   throw new Error(actualizarConfigSunatResponse.iCode + "||" + actualizarConfigSunatResponse.sMessage);
		}

		//Actualizamos la numeracion o sequencia para el folio sunat
		var oParamSeq = {};
		oParamSeq.iAreaId 		  = oRequest.oData.iAreaId;
		oParamSeq.iConfigSunatId  = parseInt(req.params.id, 10); 
		oParamSeq.sNumInicio	  = oRequest.oData.sNumInicio;
		const actualizarSequenciaSunatResponse = await  sequenciaSunatTxDao.actualizarSequenciaSunat(oParamSeq);
		if(actualizarSequenciaSunatResponse.iCode !== 1){
		   throw new Error(actualizarSequenciaSunatResponse.iCode + "||" + actualizarSequenciaSunatResponse.sMessage);
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
 * @description Función que permite eliminar Configuracion Sunat
 * @creation David Villanueva 29/12/2020
 * @update
 */
exports.eliminarConfigSunat = async (req, res) => { 
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
			const eliminarConfigSunatResponse = await  configSunatTxDao.eliminarConfigSunat(oRegistro);
			if(eliminarConfigSunatResponse.iCode !== 1){
				throw new Error(eliminarConfigSunatResponse.iCode + "||" + eliminarConfigSunatResponse.sMessage);
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

