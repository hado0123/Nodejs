const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
   return sequelize.define(
      'Post',
      {
         title: {
            type: DataTypes.STRING(100),
            allowNull: false, // 필수
         },
         content: {
            type: DataTypes.TEXT,
            allowNull: false, // 필수
         },
         author: {
            type: DataTypes.STRING(50),
            allowNull: false, // 필수
         },
         createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, // 기본값: 현재 시간
         },
      },
      {
         timestamps: false, // createdAt, updatedAt 자동 관리 비활성화
      }
   )
}
