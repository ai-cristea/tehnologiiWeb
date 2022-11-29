const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

const Course = sequelize.define(
    "Course",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 10]
            }
        }
    },
    {
        tableName: "Courses"
    }
)

module.exports = Course;