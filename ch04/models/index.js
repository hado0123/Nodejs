const Sequelize = require('sequelize')
const User = require('./user')
const Comment = require('./comment')

const Country = require('./country')
const Capital = require('./capital')

const Post = require('./post')
const Hashtag = require('./hashtag')

const dotenv = require('dotenv')

// 현재 실행 환경을 가져옴. 'development', 'production', 'test' 중 하나로 설정됨. 기본값은 'development'
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]
const db = {}

dotenv.config()

// Sequelize 라이브러리를 사용하여 데이터베이스 연결 인스턴스를 생성
const sequelize = new Sequelize(config.database, config.username, config.password, config)

// db 객체를 생성하여 Sequelize 인스턴스와 모델들을 저장
db.sequelize = sequelize

// User 모델과 Comment 모델을 db 객체에 추가
db.User = User
db.Comment = Comment

db.Country = Country
db.Capital = Capital

db.Post = Post
db.Hashtag = Hashtag

// 모델을 초기화하고 데이터베이스와 연결
User.init(sequelize)
Comment.init(sequelize)

Country.init(sequelize)
Capital.init(sequelize)

Post.init(sequelize)
Hashtag.init(sequelize)

// 모델의 관계 설정 (예: 외래 키, 연관 테이블 등)
User.associate(db)
Comment.associate(db)

Country.associate(db)
Capital.associate(db)

Post.associate(db)
Hashtag.associate(db)

// db 객체를 모듈로 내보내어 다른 파일에서 사용할 수 있도록 설정
module.exports = db
