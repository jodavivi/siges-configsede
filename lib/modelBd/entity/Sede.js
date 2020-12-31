const Sequelize =  require('sequelize');
const db = require('../../config/db');
const Sociedad = require('./Sociedad'); 

const Sede = db.define('sede', { 
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
    SociedadId          :  {
                                type: Sequelize.INTEGER,
                                references: {
                                model: 'sociedad', // 'fathers' refers to table name
                                key: 'Id', // 'id' refers to column name in fathers table
                                }
                            },
    Sede                : Sequelize.STRING(64),
    CodDepartamento     : Sequelize.STRING(8),
    Departamento        : Sequelize.STRING(128),
    CodProvincia        : Sequelize.STRING(8),
    Provincia           : Sequelize.STRING(128),
    CodDistrito         : Sequelize.STRING(8),
    Distrito            : Sequelize.STRING(128),
    Direccion           : Sequelize.STRING(256),
    Telefono            : Sequelize.STRING(16), 
    EstadoSede          : Sequelize.INTEGER
} 
,
{
    schema: "configuracionsede",
});
//Sede.hasOne(Sociedad, { as: "Sociedad",targetKey: 'SociedadId',foreignKey: 'Id' }); 
Sede.belongsTo(Sociedad, { as: "Sociedad",targetKey: 'Id',foreignKey: 'SociedadId' });   
Sociedad.hasMany(Sede, { as: "Sede",foreignKey: 'SociedadId' });

module.exports = Sede;