const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const port = 3000;



// 'public' 폴더를 정적 파일 경로로 설정
app.use(express.static('public'));




// CORS 미들웨어 사용
app.use(cors());

// 데이터베이스 파일 열기 (없으면 새로 생성)
const db = new sqlite3.Database('./foods.db', (err) => {
  if (err) {
    console.error('데이터베이스 연결 오류:', err);
  } else {
    console.log('데이터베이스 연결 성공');
  }
});

// 테이블 생성 (없으면 생성)
db.run("CREATE TABLE IF NOT EXISTS foods (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, image_url TEXT)", (err) => {
  if (err) {
    console.error('테이블 생성 오류:', err);
  } else {
    console.log('테이블 생성 성공');
  }
});
// 음식 목록과 이미지 URL
const foods = [
  { name: '치킨', image_url: '/images/치킨.jpg' },
  { name: '피자', image_url: '/images/피자.jpg' },
  { name: '초밥', image_url: '/images/초밥.jpg' },
  { name: '불고기', image_url: '/images/불고기.jpg' },
  { name: '김밥', image_url: '/images/김밥.jpg' },
  { name: '햄버거', image_url: '/images/햄버거.jpg' },
  { name: '라면', image_url: '/images/라면.jpg' },
  { name: '떡볶이', image_url: '/images/떡볶이.jpg' }
];


// 배치 삽입 함수
const insertFoodsBatch = () => {
  const stmt = db.prepare("INSERT INTO foods (name, image_url) VALUES (?, ?)"); // 쿼리 준비

  db.run("BEGIN TRANSACTION"); // 트랜잭션 시작

  foods.forEach(food => {
    stmt.run(food.name, food.image_url); // 각 음식을 데이터베이스에 삽입
  });

  db.run("COMMIT"); // 트랜잭션 완료
  stmt.finalize(); // 준비된 쿼리 종료
  console.log('음식 데이터를 배치로 삽입했습니다.');
};

// 음식 데이터를 배치 삽입 (서버 시작 전에 한 번만 실행)
insertFoodsBatch();

// 랜덤 음식 추천 API
app.get('/recommend', (req, res) => {
  const randomFood = foods[Math.floor(Math.random() * foods.length)];
  res.json({ recommendedFood: randomFood });
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});



