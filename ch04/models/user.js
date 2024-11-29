const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      // super.init을 호출하여 테이블의 컬럼과 옵션을 정의
      return super.init(
         {
            // 'name' 컬럼 정의
            name: {
               type: Sequelize.STRING(20), // 최대 20글자의 문자열
               allowNull: false, // NULL 값을 허용하지 않음
               unique: true, // 값이 고유해야 함
            },
            // 'age' 컬럼 정의
            age: {
               type: Sequelize.INTEGER.UNSIGNED, // 양수만 허용하는 정수
               allowNull: false, // NULL 값을 허용하지 않음
            },
            // 'married' 컬럼 정의
            married: {
               type: Sequelize.BOOLEAN, // 참(true) 또는 거짓(false) 값
               allowNull: false, // NULL 값을 허용하지 않음
            },
            // 'comment' 컬럼 정의
            comment: {
               type: Sequelize.TEXT, // 길이에 제한이 없는 텍스트
               allowNull: true, // NULL 값을 허용
            },
            // 'created_at' 컬럼 정의
            created_at: {
               type: Sequelize.DATE, // 날짜와 시간을 저장
               allowNull: false, // NULL 값을 허용하지 않음
               defaultValue: Sequelize.NOW, // 기본값으로 현재 시간 설정
            },
         },
         {
            sequelize, // Sequelize 인스턴스를 전달
            timestamps: false, // 자동 생성되는 'createdAt'과 'updatedAt' 필드를 비활성화
            underscored: false, // 컬럼 이름을 camelCase로 유지
            modelName: 'User', // Sequelize 내부에서 사용하는 모델 이름
            tableName: 'users', // 데이터베이스에서 사용하는 실제 테이블 이름
            paranoid: false, // 소프트 삭제(soft delete)를 비활성화
            charset: 'utf8mb4', // 유니코드 4바이트 문자셋 (이모지 지원)
            collate: 'utf8mb4_general_ci', // 대소문자를 구분하지 않는 정렬 규칙
         }
      )
   }

   // 모델 간의 관계를 정의하는 메서드
   static associate(db) {
      // User 모델이 Comment 모델과 1:N 관계를 가짐
      db.User.hasMany(db.Comment, {
         foreignKey: 'commenter', // Comment에서 외래 키로 사용할 컬럼 이름
         sourceKey: 'id', // User에서 Comment에게 외래키로 제공할 컬럼 이름
      })
   }
}
