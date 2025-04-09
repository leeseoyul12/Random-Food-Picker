require('dotenv').config();

const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/htmls', express.static(path.join(__dirname, 'htmls')));

app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET;

// DB 연결
const db = new sqlite3.Database('./foods.db', (err) => {
  if (err) {
    console.error('데이터베이스 연결 오류:', err);
  } else {
    console.log('데이터베이스 연결 성공');
  }
});



// 음식 추천 API (새 조건: category, cuisine, spicy)
app.get('/recommend-food', (req, res) => {
  const { category, cuisine, spicy } = req.query;
  //사용자가 입력한 조건들이 여기서 쿼리로 만들어짐

  let query = 'SELECT * FROM food WHERE 1=1';

  if (category && category !== '상관 없음') query += ` AND category = '${category}'`;
  if (cuisine && cuisine !== '상관 없음') query += ` AND cuisine = '${cuisine}'`;
  if (spicy && spicy !== '상관 없음') query += ` AND spicy = '${spicy}'`;
  //상관 없음을 고르면 이 조건은 쿼리에 추가 X

  query += ' ORDER BY RANDOM() LIMIT 1';
//하나의 음식을 랜덤으로 반환
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



//  회원가입 API
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: '아이디와 비밀번호를 모두 입력해 주세요.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `INSERT INTO users (username, password_hash) VALUES (?, ?)`;

  db.run(query, [username, hashedPassword], function (err) {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.status(409).json({ message: '이미 존재하는 아이디입니다.' });
      }
      console.error('회원가입 오류:', err);
      return res.status(500).json({ message: '서버 오류' });
    }

    return res.status(201).json({ message: '회원가입 성공' });
  });
});

//  로그인 API
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: '아이디와 비밀번호를 모두 입력해 주세요.' });
  }

  const query = `SELECT * FROM users WHERE username = ?`;

  db.get(query, [username], async (err, user) => {
    if (err) {
      console.error('로그인 DB 오류:', err);
      return res.status(500).json({ message: '서버 오류' });
    }

    if (!user) {
      return res.status(401).json({ message: '존재하지 않는 아이디입니다.' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, {
      expiresIn: '1h',
    });

    return res.json({ message: '로그인 성공', token });
  });
});

// index.html 라우팅
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 인트로 이미지 라우팅
app.get('/intro-image', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'images', 'intro', 'intro.jpg'));
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중`);
});
