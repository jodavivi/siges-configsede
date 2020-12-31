const Sequelize =  require('sequelize');
const db = require('../../config/db'); 

const Sede = require('./Sede'); 
const Sociedad = require('./Sociedad'); 
  
const Almacen = db.define('almacen', { 
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
    SociedadId              : {
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
    Almacen             : Sequelize.STRING(64),
    CodDepartamento     : Sequelize.STRING(8),
    Departamento        : Sequelize.STRING(128),
    CodProvincia        : Sequelize.STRING(8),
    Provincia           : Sequelize.STRING(128),
    CodDistrito         : Sequelize.STRING(8),
    Distrito            : Sequelize.STRING(128),
    Direccion           : Sequelize.STRING(256),
    Telefono            : Sequelize.STRING(16), 
    EstadoAlmacen       : Sequelize.INTEGER
} 
,
{
    schema: "configuracionsede",
});

Sede.hasMany(Almacen, { as: "Almacen",foreignKey: 'SedeId' });

Almacen.belongsTo(Sociedad, { as: "Sociedad",targetKey: 'Id',foreignKey: 'SociedadId' });   
Almacen.belongsTo(Sede, { as: "Sede",targetKey: 'Id',foreignKey: 'SedeId' });   

module.exports = Almacen;