const Sequelize = require('sequelize')
const Post = require('./post')
const dotenv = require('dotenv')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]

dotenv.config()

const sequelize = new Sequelize(config.database, config.username, config.password, config)

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//    host: process.env.DB_HOST,
//    dialect: 'mysql',
//    logging: false, // SQL 쿼리 로깅 비활성화
// })

const db = {}
db.sequelize = sequelize
db.Post = Post(sequelize)

module.exports = db
