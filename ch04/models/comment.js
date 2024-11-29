const Sequelize = require('sequelize')

// Comment 모델을 정의하는 클래스. Sequelize.Model을 상속받음
module.exports = class Comment extends Sequelize.Model {
   static init(sequelize) {
      // super.init을 통해 테이블의 컬럼 및 옵션을 정의
      return super.init(
         {
            // 'comment' 컬럼 정의
            comment: {
               type: Sequelize.STRING(100), // 최대 100글자의 문자열
               allowNull: false, // NULL 값을 허용하지 않음
            },
            // 'created_at' 컬럼 정의
            created_at: {
               type: Sequelize.DATE, // 날짜 및 시간 데이터 타입
               allowNull: true, // NULL 값을 허용
               defaultValue: Sequelize.NOW, // 기본값으로 현재 시간 설정
            },
         },
         {
            // Sequelize 초기화 옵션
            sequelize, // Sequelize 인스턴스
            timestamps: false, // 'createdAt'과 'updatedAt' 자동 생성 필드 비활성화
            modelName: 'Comment', // Sequelize 내부에서 사용할 모델 이름
            tableName: 'comments', // 데이터베이스에서 사용할 테이블 이름
            paranoid: false, // 소프트 삭제(soft delete) 비활성화
            charset: 'utf8mb4', // 문자셋을 utf8mb4로 설정 (이모지 지원)
            collate: 'utf8mb4_general_ci', // 대소문자 구분하지 않는 정렬 규칙 설정
         }
      )
   }

   // 모델 간의 관계를 설정하는 메서드
   static associate(db) {
      // Comment 모델이 User 모델과 1:N 관계를 가짐
      db.Comment.belongsTo(db.User, {
         foreignKey: 'commenter', //  Comment 외래 키 컬럼 이름
         targetKey: 'id', // Comment가 User에서 참조할 컬럼 이름
      })
   }
}
