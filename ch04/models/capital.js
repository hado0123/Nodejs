const Sequelize = require('sequelize')

module.exports = class Capital extends Sequelize.Model {
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
            modelName: 'Capital', // Sequelize 내부에서 사용하는 모델 이름
            tableName: 'capitals', // 데이터베이스에서 사용하는 실제 테이블 이름
            paranoid: false, // 소프트 삭제(soft delete)를 비활성화
            charset: 'utf8mb4', // 유니코드 4바이트 문자셋 (이모지 지원)
            collate: 'utf8mb4_general_ci', // 대소문자를 구분하지 않는 정렬 규칙
         }
      )
   }

   static associate(db) {
      // Capital 모델이 Country 모델과 1:1 관계를 가짐
      db.Capital.belongsTo(db.Country, {
         foreignKey: 'CountryId', // Capital에서 외래 키로 사용할 컬럼 이름
         sourceKey: 'id', // Capital이 Country에서 참조할 컬럼 이름
      })
   }
}
