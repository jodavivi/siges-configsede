const Sequelize =  require('sequelize');
const db = require('../../config/db'); 
const Sede = require('./Sede'); 

const Area = db.define('area', { 
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
    SedeId              : {
                            type: Sequelize.INTEGER,
                            references: {
                            model: 'sede', // 'fathers' refers to table name
                            key: 'Id', // 'id' refers to column name in fathers table
                            }
                        },
    Area                : Sequelize.STRING(64), 
    Telefono            : Sequelize.STRING(16), 
    EstadoArea          : Sequelize.INTEGER
} 
,
{
    schema: "configuracionsede",
});

Area.belongsTo(Sede, { as: "Sede",targetKey: 'Id',foreignKey: 'SedeId' });   
Sede.hasMany(Area, { as: "Area",foreignKey: 'SedeId' });

module.exports = Area;