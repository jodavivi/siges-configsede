const sociedadRxDao				= require('../dao/SociedadRxDao'); 
const utils 					= require('../utils/utils'); 
 
/**
 * @description Función que permite consultar tabla Maestra
 * @creation David Villanueva 30/11/2020
 * @update
 */
exports.consultarSociedad = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
		 //Verificamos si ya exista la tabla
		 var oFiltroTabla = {};
		 oFiltroTabla.sRazonSocial = req.query.sRazonSocial;
		 oFiltroTabla.iId		   = req.query.iId;
		 var consultarSociedadResponse =  await sociedadRxDao.consultarSociedad(oFiltroTabla);
		 if(consultarSociedadResponse.iCode !== 1){
			throw new Error(consultarSociedadResponse.iCode + "||" + consultarSociedadResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarSociedadResponse.oData;
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
 