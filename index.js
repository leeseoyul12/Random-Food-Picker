const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 'public' 폴더를 정적 파일 경로로 설정
app.use(express.static(path.join(__dirname, 'public')));

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

// 음식 목록을 랜덤으로 추천하는 API
app.get('/recommend-food', (req, res) => {
  const { spiceLevel, foodType, soupType, cuisine } = req.query;

  // 쿼리 조건을 동적으로 생성
  let query = 'SELECT * FROM food WHERE 1=1';  // 테이블 이름을 'food'로 수정

  // 조건에 값이 있을 때만 쿼리에 추가
  if (foodType && foodType !== '상관 없음') query += ` AND foodType = '${foodType}'`;
  if (soupType && soupType !== '상관 없음') query += ` AND soupType = '${soupType}'`;
  if (cuisine && cuisine !== '상관 없음') query += ` AND cuisine = '${cuisine}'`;

  // 랜덤으로 음식을 하나 선택
  query += ' ORDER BY RANDOM() LIMIT 1';

  db.get(query, [], (err, row) => {
    if (err) {
      console.error('쿼리 실행 오류:', err);
      res.status(500).send('서버 오류');
    } else {
      res.json(row); // 선택된 음식 정보를 응답으로 반환
    }
  });
});

// 'public' 폴더를 정적 파일 경로로 설정
app.use(express.static(path.join(__dirname, 'public')));

app.get('/intro-image', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'images', 'intro', 'intro.jpg'));
});




// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중`);
});
