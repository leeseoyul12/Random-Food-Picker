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

// 테이블 생성 (없으면 생성)
db.run("CREATE TABLE IF NOT EXISTS foods (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, image_url TEXT, spiceLevel TEXT, foodType TEXT, soupType TEXT, cuisine TEXT, mealType TEXT)", (err) => {
  if (err) {
    console.error('테이블 생성 오류:', err);
  } else {
    console.log('테이블 생성 성공');
  }
});

// 음식 목록과 이미지 URL
const foods = [
  { name: '간장게장', image_url: '/images/food/간장게장.jpg', spiceLevel: '안 매운', foodType: '해산물', soupType: '국물', cuisine: '한식', mealType: '요리' },
  { name: '갈비탕', image_url: '/images/food/갈비탕.jpg', spiceLevel: '안 매운', foodType: '고기', soupType: '국물', cuisine: '한식', mealType: '요리' },
  { name: '고로케', image_url: '/images/food/고로케.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '양식', mealType: '간식' },
  { name: '김밥', image_url: '/images/food/김밥.jpg', spiceLevel: '안 매운', foodType: '고기', soupType: '국물 없음', cuisine: '한식', mealType: '간식' },
  { name: '김치전', image_url: '/images/food/김치전.jpg', spiceLevel: '매운', foodType: '채소', soupType: '국물 없음', cuisine: '한식', mealType: '간식' },
  { name: '김치찌개', image_url: '/images/food/김치찌개.jpg', spiceLevel: '매운', foodType: '채소', soupType: '국물', cuisine: '한식', mealType: '요리' },
  { name: '나가사키짬뽕', image_url: '/images/food/나가사키짬뽕.jpg', spiceLevel: '매운', foodType: '해산물', soupType: '국물', cuisine: '중식', mealType: '요리' },
  { name: '냉면', image_url: '/images/food/냉면.jpg', spiceLevel: '안 매운', foodType: '고기', soupType: '국물', cuisine: '한식', mealType: '요리' },
  { name: '뇨끼', image_url: '/images/food/뇨끼.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '양식', mealType: '요리' },
  { name: '달걀말이', image_url: '/images/food/달걀말이.jpg', spiceLevel: '안 매운', foodType: '고기', soupType: '국물 없음', cuisine: '한식', mealType: '요리' },
  { name: '닭꼬치', image_url: '/images/food/닭꼬치.jpg', spiceLevel: '매운', foodType: '고기', soupType: '국물 없음', cuisine: '한식', mealType: '간식' },
  { name: '닭볶음탕', image_url: '/images/food/닭볶음탕.jpg', spiceLevel: '매운', foodType: '고기', soupType: '국물', cuisine: '한식', mealType: '요리' },
  { name: '돈까스', image_url: '/images/food/돈까스.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '양식', mealType: '요리' },
  { name: '동태찌개', image_url: '/images/food/동태찌개.jpg', spiceLevel: '안 매운', foodType: '해산물', soupType: '국물', cuisine: '한식', mealType: '요리' },
  { name: '돼지국밥', image_url: '/images/food/돼지국밥.jpg', spiceLevel: '안 매운', foodType: '고기', soupType: '국물', cuisine: '한식', mealType: '요리' },
  { name: '된장찌개', image_url: '/images/food/된장찌개.jpg', spiceLevel: '안 매운', foodType: '채소', soupType: '국물', cuisine: '한식', mealType: '요리' },
  { name: '떡볶이', image_url: '/images/food/떡볶이.jpg', spiceLevel: '매운', foodType: '고기', soupType: '국물 없음', cuisine: '한식', mealType: '간식' },
  { name: '라따뚜이', image_url: '/images/food/라따뚜이.jpg', spiceLevel: '상관 없음', foodType: '채소', soupType: '국물 없음', cuisine: '양식', mealType: '요리' },
  { name: '라멘', image_url: '/images/food/라멘.jpg', spiceLevel: '매운', foodType: '고기', soupType: '국물', cuisine: '일식', mealType: '요리' },
  { name: '라면', image_url: '/images/food/라면.jpg', spiceLevel: '매운', foodType: '고기', soupType: '국물', cuisine: '한식', mealType: '요리' },
  { name: '라자냐', image_url: '/images/food/라자냐.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '양식', mealType: '요리' },
  { name: '리조또', image_url: '/images/food/리조또.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '양식', mealType: '요리' },
  { name: '마라샹궈', image_url: '/images/food/마라샹궈.jpg', spiceLevel: '매운', foodType: '고기', soupType: '국물 없음', cuisine: '중식', mealType: '요리' },
  { name: '만두', image_url: '/images/food/만두.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '중식', mealType: '간식' },
  { name: '매운탕', image_url: '/images/food/매운탕.jpg', spiceLevel: '매운', foodType: '해산물', soupType: '국물', cuisine: '한식', mealType: '요리' },
  { name: '미역국', image_url: '/images/food/미역국.jpg', spiceLevel: '안 매운', foodType: '채소', soupType: '국물', cuisine: '한식', mealType: '요리' },
  { name: '미트볼', image_url: '/images/food/미트볼.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '양식', mealType: '간식' },
  { name: '불고기', image_url: '/images/food/불고기.jpg', spiceLevel: '안 매운', foodType: '고기', soupType: '국물 없음', cuisine: '한식', mealType: '요리' },
  { name: '비빔밥', image_url: '/images/food/비빔밥.jpg', spiceLevel: '매운', foodType: '채소', soupType: '국물 없음', cuisine: '한식', mealType: '요리' },
  { name: '삼겹살', image_url: '/images/food/삼겹살.jpg', spiceLevel: '안 매운', foodType: '고기', soupType: '국물 없음', cuisine: '한식', mealType: '요리' },
  { name: '삼계탕', image_url: '/images/food/삼계탕.jpg', spiceLevel: '안 매운', foodType: '고기', soupType: '국물', cuisine: '한식', mealType: '요리' },
  { name: '새우튀김', image_url: '/images/food/새우튀김.jpg', spiceLevel: '상관 없음', foodType: '해산물', soupType: '국물 없음', cuisine: '일식', mealType: '간식' },
  { name: '샤브샤브', image_url: '/images/food/샤브샤브.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물', cuisine: '한식', mealType: '요리' },
  { name: '소고기무국', image_url: '/images/food/소고기무국.jpg', spiceLevel: '안 매운', foodType: '고기', soupType: '국물', cuisine: '한식', mealType: '요리' },
  { name: '스테이크', image_url: '/images/food/스테이크.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '양식', mealType: '요리' },
  { name: '스파게티', image_url: '/images/food/스파게티.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '양식', mealType: '요리' },
  { name: '야채볶음밥', image_url: '/images/food/야채볶음밥.jpg', spiceLevel: '상관 없음', foodType: '채소', soupType: '국물 없음', cuisine: '한식', mealType: '요리' },
  { name: '양꼬치', image_url: '/images/food/양꼬치.jpg', spiceLevel: '매운', foodType: '고기', soupType: '국물 없음', cuisine: '중식', mealType: '요리' },
  { name: '연어초밥', image_url: '/images/food/연어초밥.jpg', spiceLevel: '안 매운', foodType: '해산물', soupType: '국물 없음', cuisine: '일식', mealType: '요리' },
  { name: '오므라이스', image_url: '/images/food/오므라이스.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '일식', mealType: '요리' },
  { name: '오코노미야끼', image_url: '/images/food/오코노미야끼.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '일식', mealType: '요리' },
  { name: '우동', image_url: '/images/food/우동.jpg', spiceLevel: '안 매운', foodType: '고기', soupType: '국물', cuisine: '일식', mealType: '요리' },
  { name: '유린기', image_url: '/images/food/유린기.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '중식', mealType: '요리' },
  { name: '제육볶음', image_url: '/images/food/제육볶음.jpg', spiceLevel: '매운', foodType: '고기', soupType: '국물 없음', cuisine: '한식', mealType: '요리' },
  { name: '족발', image_url: '/images/food/족발.jpg', spiceLevel: '안 매운', foodType: '고기', soupType: '국물 없음', cuisine: '한식', mealType: '요리' },
  { name: '짜장면', image_url: '/images/food/짜장면.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '중식', mealType: '요리' },
  { name: '짜파게티', image_url: '/images/food/짜파게티.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '한식', mealType: '간식' },
  { name: '찜닭', image_url: '/images/food/찜닭.jpg', spiceLevel: '매운', foodType: '고기', soupType: '국물', cuisine: '한식', mealType: '요리' },
  { name: '초밥', image_url: '/images/food/초밥.jpg', spiceLevel: '안 매운', foodType: '해산물', soupType: '국물 없음', cuisine: '일식', mealType: '요리' },
  { name: '치킨', image_url: '/images/food/치킨.jpg', spiceLevel: '매운', foodType: '고기', soupType: '국물 없음', cuisine: '한식', mealType: '간식' },
  { name: '치킨너겟', image_url: '/images/food/치킨너겟.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '양식', mealType: '간식' },
  { name: '카레', image_url: '/images/food/카레.jpg', spiceLevel: '매운', foodType: '고기', soupType: '국물', cuisine: '양식', mealType: '요리' },
  { name: '카프레제', image_url: '/images/food/카프레제.jpg', spiceLevel: '상관 없음', foodType: '채소', soupType: '국물 없음', cuisine: '양식', mealType: '요리' },
  { name: '칼국수', image_url: '/images/food/칼국수.jpg', spiceLevel: '안 매운', foodType: '고기', soupType: '국물', cuisine: '한식', mealType: '요리' },
  { name: '케밥', image_url: '/images/food/케밥.jpg', spiceLevel: '매운', foodType: '고기', soupType: '국물 없음', cuisine: '중식', mealType: '요리' },
  { name: '크로와상', image_url: '/images/food/크로와상.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '양식', mealType: '간식' },
  { name: '타코', image_url: '/images/food/타코.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '양식', mealType: '간식' },
  { name: '탕수육', image_url: '/images/food/탕수육.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '중식', mealType: '요리' },
  { name: '코르티야', image_url: '/images/food/코르티야.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '양식', mealType: '간식' },
  { name: '토마토파스타', image_url: '/images/food/토마토파스타.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '양식', mealType: '요리' },
  { name: '팟타이', image_url: '/images/food/팟타이.jpg', spiceLevel: '매운', foodType: '고기', soupType: '국물 없음', cuisine: '중식', mealType: '요리' },
  { name: '피자', image_url: '/images/food/피자.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '양식', mealType: '요리' },
  { name: '핫도그', image_url: '/images/food/핫도그.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '양식', mealType: '간식' },
  { name: '해물파전', image_url: '/images/food/해물파전.jpg', spiceLevel: '매운', foodType: '해산물', soupType: '국물 없음', cuisine: '한식', mealType: '간식' },
  { name: '햄버거', image_url: '/images/food/햄버거.jpg', spiceLevel: '상관 없음', foodType: '고기', soupType: '국물 없음', cuisine: '양식', mealType: '간식' },
  { name: '회', image_url: '/images/food/회.jpg', spiceLevel: '안 매운', foodType: '해산물', soupType: '국물 없음', cuisine: '일식', mealType: '요리' },
  { name: '회덮밥', image_url: '/images/food/회덮밥.jpg', spiceLevel: '매운', foodType: '해산물', soupType: '국물 없음', cuisine: '한식', mealType: '요리' }
];



// 사용자가 선택한 옵션에 맞는 음식 필터링
app.get('/random-food', (req, res) => {
  const { spiceLevel, foodType, soupType, cuisine, mealType } = req.query;

  // 필터링된 음식 목록
  let filteredFoods = foods.filter(food => {
    return (spiceLevel === '상관 없음' || food.spiceLevel === spiceLevel) &&
           (foodType === '상관 없음' || food.foodType === foodType) &&
           (soupType === '상관 없음' || food.soupType === soupType) &&
           (cuisine === '상관 없음' || food.cuisine === cuisine) &&
           (mealType === '상관 없음' || food.mealType === mealType);
  });

  // 필터링된 음식이 없으면 에러 반환
  if (filteredFoods.length === 0) {
    return res.status(404).json({ message: '조건에 맞는 음식이 없습니다.' });
  }

  // 랜덤으로 음식 하나 선택
  const randomFood = filteredFoods[Math.floor(Math.random() * filteredFoods.length)];
  
  // 랜덤 음식 반환
  res.json(randomFood);
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
