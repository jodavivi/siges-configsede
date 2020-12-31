const Sequelize =  require('sequelize');
const db = require('../../config/db'); 

db.createSchema("configuracionsede").then(() => {
    // esquema para el servicio
    });

db.createSchema("sequenciasunat").then(() => {
    // esquema para crear las sequencias de folio sunat
    });

const Sociedad = db.define('sociedad', { 
    Id : {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement : true
    },
    EstadoId            : Sequelize.INTEGER,
    UsuarioCreador      : Sequelize.STRING(64),
    FechaCreacion       : Sequelize.DATE,
    TerminalCreacion    : Sequelize.STRING(64),
    UsuarioModificador  : Sequelize.STRING,
    FechaModificacion   : Sequelize.DATE,
    TerminalModificador : Sequelize.STRING(64),
    TransaccionId       : Sequelize.STRING(64),
    RazonSocial         : Sequelize.STRING(64),
    NumIdentificacion   : Sequelize.STRING(16),
    Email               : Sequelize.STRING(64),
    CodDepartamento     : Sequelize.STRING(8),
    Departamento        : Sequelize.STRING(128),
    CodProvincia        : Sequelize.STRING(8),
    Provincia           : Sequelize.STRING(128),
    CodDistrito         : Sequelize.STRING(8),
    Distrito            : Sequelize.STRING(128),
    Direccion           : Sequelize.STRING(256),
    Telefono            : Sequelize.STRING(16), 
    EstadoSociedad      : Sequelize.INTEGER
} 
,
{
    schema: "configuracionsede",
});

module.exports = Sociedad;