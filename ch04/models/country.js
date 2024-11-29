const Sequelize = require('sequelize')

module.exports = class Country extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            name: {
               type: Sequelize.STRING(100),
               allowNull: false, // NULL 값을 허용하지 않음
            },
         },
         {
            sequelize, // Sequelize 인스턴스를 전달
            timestamps: false, // 자동 생성되는 'createdAt'과 'updatedAt' 필드를 비활성화
            underscored: false, // 컬럼 이름을 camelCase로 유지
            modelName: 'Country', // Sequelize 내부에서 사용하는 모델 이름
            tableName: 'countries', // 데이터베이스에서 사용하는 실제 테이블 이름
            paranoid: false, // 소프트 삭제(soft delete)를 비활성화
            charset: 'utf8mb4', // 유니코드 4바이트 문자셋 (이모지 지원)
            collate: 'utf8mb4_general_ci', // 대소문자를 구분하지 않는 정렬 규칙
         }
      )
   }

   static associate(db) {
      // Country 모델이 Capital 모델과 1:1 관계를 가짐
      db.Country.hasOne(db.Capital, {
         foreignKey: 'CountryId', // Capital에서 외래 키로 사용할 컬럼 이름
         sourceKey: 'id', // Country에서 Capital에게 외래키로 제공할 컬럼 이름
      })
   }
}
