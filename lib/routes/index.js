const express = require('express');
const router = express.Router();

const sociedadTxBusiness        = require('../business/SociedadTxBusiness');  
const sociedadRxBusiness        = require('../business/SociedadRxBusiness'); 
const sedeTxBusiness            = require('../business/SedeTxBusiness');  
const sedeRxBusiness            = require('../business/SedeRxBusiness');   
const areaTxBusiness            = require('../business/AreaTxBusiness');  
const areaRxBusiness            = require('../business/AreaRxBusiness');  
const almacenTxBusiness         = require('../business/AlmacenTxBusiness');  
const almacenRxBusiness         = require('../business/AlmacenRxBusiness');  
const configSunatTxBusiness     = require('../business/ConfigSunatTxBusiness');  
const configSunatRxBusiness     = require('../business/ConfigSunatRxBusiness'); 


module.exports = function(){

    //sociedad
    router.post('/sociedad', sociedadTxBusiness.registrarSociedad); 
    router.put('/sociedad/:id', sociedadTxBusiness.actualizarSociedad); 
    router.delete('/sociedad', sociedadTxBusiness.eliminarSociedad);  
    router.get('/sociedad', sociedadRxBusiness.consultarSociedad); 

    //Sedes
    router.post('/sede', sedeTxBusiness.registrarSede); 
    router.put('/sede/:id', sedeTxBusiness.actualizarSede); 
    router.delete('/sede', sedeTxBusiness.eliminarSede);  
    router.get('/sede', sedeRxBusiness.consultarSede); 

    //Areas
    router.post('/area', areaTxBusiness.registrarArea); 
    router.put('/area/:id', areaTxBusiness.actualizarArea); 
    router.delete('/area/', areaTxBusiness.eliminarArea);  
    router.get('/area', areaRxBusiness.consultarArea); 

    //Almacen
    router.post('/almacen', almacenTxBusiness.registrarAlmacen); 
    router.put('/almacen/:id', almacenTxBusiness.actualizarAlmacen); 
    router.delete('/almacen', almacenTxBusiness.eliminarAlmacen);  
    router.get('/almacen', almacenRxBusiness.consultarAlmacen); 

    //Config Sunat
    router.post('/configsunat', configSunatTxBusiness.registrarConfigSunat); 
    router.put('/configsunat/:id', configSunatTxBusiness.actualizarConfigSunat); 
    router.delete('/configsunat', configSunatTxBusiness.eliminarConfigSunat);  
    router.get('/configsunat', configSunatRxBusiness.consultarConfigSunat); 
    
    return router;
}

