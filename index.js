const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

// 'public' 폴더를 정적 파일 경로로 설정
app.use(express.static(path.join(__dirname, 'public')));

// CORS 미들웨어 사용
app.use(cors());
app.use(express.json()); // JSON 바디 파싱

// 데이터베이스 파일 열기 (없으면 새로 생성)
const db = new sqlite3.Database('./foods.db', (err) => {
  if (err) {
    console.error('데이터베이스 연결 오류:', err);
  } else {
    console.log('데이터베이스 연결 성공');
  }
});

// JWT 비밀 키
const JWT_SECRET = 'your_jwt_secret';

// 사용자 인증 미들웨어
function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; // Authorization: Bearer <token>

  if (!token) {
    return res.status(401).send('토큰이 필요합니다.');
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('토큰이 유효하지 않습니다.');
    }
    req.user = user;
    next();
  });
}

// 회원가입 API
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('사용자 이름과 비밀번호는 필수입니다.');
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send('비밀번호 해싱 오류');
    }

    const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    stmt.run(username, hashedPassword, function (err) {
      if (err) {
        return res.status(500).send('회원가입 오류');
      }
      res.status(201).send('회원가입 성공');
    });
    stmt.finalize();
  });
});

// 로그인 API
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('사용자 이름과 비밀번호는 필수입니다.');
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  db.get(query, [username], (err, row) => {
    if (err || !row) {
      return res.status(401).send('사용자 이름 또는 비밀번호가 잘못되었습니다.');
    }

    bcrypt.compare(password, row.password, (err, result) => {
      if (!result) {
        return res.status(401).send('사용자 이름 또는 비밀번호가 잘못되었습니다.');
      }

      const token = jwt.sign({ id: row.id, username: row.username }, JWT_SECRET, {
        expiresIn: '1h', // 1시간 동안 유효
      });

      res.json({ token });
    });
  });
});


// 음식 목록을 랜덤으로 추천하는 API
app.get('/recommend-food', (req, res) => {
  const { foodType, soupType, cuisine } = req.query;

  let query = 'SELECT * FROM food WHERE 1=1';

  if (foodType && foodType !== '상관 없음') query += ` AND foodType = '${foodType}'`;
  if (soupType && soupType !== '상관 없음') query += ` AND soupType = '${soupType}'`;
  if (cuisine && cuisine !== '상관 없음') query += ` AND cuisine = '${cuisine}'`;

  query += ' ORDER BY RANDOM() LIMIT 1';

  db.get(query, [], (err, row) => {
    if (err) {
      console.error('쿼리 실행 오류:', err);
      return res.status(500).send('서버 오류');
    }
    if (row) {
      res.json({
        name: row.name,
        image_url: row.image_url,
        description: row.description,
      });
    } else {
      res.json({ message: '해당 조건에 맞는 음식이 없습니다.' });
    }
  });
});

app.get('/intro-image', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'images', 'intro', 'intro.jpg'));
});
// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중`);
});
