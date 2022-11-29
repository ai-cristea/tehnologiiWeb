const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

const Student = sequelize.define(
    "Student",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['ACTIVE', 'INACTIVE', 'FREEZED']
        }
    },
    {
        tableName: "Students"
    }
)

module.exports = Student;