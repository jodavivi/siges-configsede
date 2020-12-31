const Sequelize =  require('sequelize');
const db = require('../../config/db'); 

const Sociedad = require('./Sociedad'); 
const Sede = require('./Sede'); 
const Area = require('./Area'); 

const ConfigSunat = db.define('configsunat', { 
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
    SociedadId          : {
        type: Sequelize.INTEGER,
        references: {
        model: 'sociedad', // 'fathers' refers to table name
        key: 'Id', // 'id' refers to column name in fathers table
        }
    },
    SedeId              : {
        type: Sequelize.INTEGER,
        references: {
        model: 'sede', // 'fathers' refers to table name
        key: 'Id', // 'id' refers to column name in fathers table
        }
    },
    AreaId              : {
                            type: Sequelize.INTEGER,
                            references: {
                            model: 'area', // 'fathers' refers to table name
                            key: 'Id', // 'id' refers to column name in fathers table
                            }
                        },
    CodTipoDocumento    : Sequelize.STRING(8),
    TipoDocumento       : Sequelize.STRING(128),
    Serie               : Sequelize.STRING(32),
    NumInicio           : Sequelize.STRING(8), 
    EstadoConfigSunat   : Sequelize.INTEGER
} 
,
{
    schema: "configuracionsede",
});

ConfigSunat.belongsTo(Sociedad, { as: "Sociedad",targetKey: 'Id',foreignKey: 'SociedadId' });   
ConfigSunat.belongsTo(Sede, { as: "Sede",targetKey: 'Id',foreignKey: 'SedeId' });   
ConfigSunat.belongsTo(Area, { as: "Area",targetKey: 'Id',foreignKey: 'AreaId' });   

module.exports = ConfigSunat;