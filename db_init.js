const sqlite3 = require('sqlite3').verbose();

// 데이터베이스 파일 열기
const db = new sqlite3.Database('./foods.db');

// 테이블 생성
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS food (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      image_url TEXT,
      foodType TEXT,
      soupType TEXT,
      cuisine TEXT
    )
  `);
});

//음식들

const foods = [
  { name: '간장게장', image_url: '/images/food/간장게장.jpg', foodType: '해산물', soupType: '국물 없음', cuisine: '한식' },
  { name: '갈비탕', image_url: '/images/food/갈비탕.jpg', foodType: '고기', soupType: '국물', cuisine: '한식' },
  { name: '고로케', image_url: '/images/food/고로케.jpg', foodType: '밀', soupType: '국물 없음', cuisine: '양식' },
  { name: '김밥', image_url: '/images/food/김밥.jpg', foodType: '쌀', soupType: '국물 없음', cuisine: '한식' },
  { name: '김치전', image_url: '/images/food/김치전.jpg', foodType: '채소', soupType: '국물 없음', cuisine: '한식' },
  { name: '김치찌개', image_url: '/images/food/김치찌개.jpg', foodType: '채소', soupType: '국물', cuisine: '한식' },
  { name: '나가사키짬뽕', image_url: '/images/food/나가사키짬뽕.jpg', foodType: '해산물', soupType: '국물', cuisine: '중식' },
  { name: '냉면', image_url: '/images/food/냉면.jpg', foodType: '고기', soupType: '국물', cuisine: '한식' },
  { name: '뇨끼', image_url: '/images/food/뇨끼.jpg', foodType: '밀', soupType: '국물 없음', cuisine: '양식' },
  { name: '달걀말이', image_url: '/images/food/달걀말이.jpg', foodType: '고기', soupType: '국물 없음', cuisine: '한식' },
  { name: '닭꼬치', image_url: '/images/food/닭꼬치.jpg', foodType: '고기', soupType: '국물 없음', cuisine: '한식' },
  { name: '닭볶음탕', image_url: '/images/food/닭볶음탕.jpg', foodType: '고기', soupType: '국물', cuisine: '한식' },
  { name: '돈까스', image_url: '/images/food/돈까스.jpg', foodType: '고기', soupType: '국물 없음', cuisine: '일식' },
  { name: '동태찌개', image_url: '/images/food/동태찌개.jpg', foodType: '해산물', soupType: '국물', cuisine: '한식' },
  { name: '돼지국밥', image_url: '/images/food/돼지국밥.jpg', foodType: '고기', soupType: '국물', cuisine: '한식' },
  { name: '된장찌개', image_url: '/images/food/된장찌개.jpg', foodType: '채소', soupType: '국물', cuisine: '한식' },
  { name: '떡볶이', image_url: '/images/food/떡볶이.jpg', foodType: '고기', soupType: '국물 없음', cuisine: '한식' },
  { name: '라따뚜이', image_url: '/images/food/라따뚜이.jpg', foodType: '채소', soupType: '국물 없음', cuisine: '양식' },
  { name: '라멘', image_url: '/images/food/라멘.jpg', foodType: '밀', soupType: '국물', cuisine: '일식' },
  { name: '라면', image_url: '/images/food/라면.jpg', foodType: '밀', soupType: '국물', cuisine: '한식' },
  { name: '라자냐', image_url: '/images/food/라자냐.jpg', foodType: '밀', soupType: '국물 없음', cuisine: '양식' },
  { name: '리조또', image_url: '/images/food/리조또.jpg', foodType: '고기', soupType: '국물 없음', cuisine: '양식' },
  { name: '마라샹궈', image_url: '/images/food/마라샹궈.jpg', foodType: '고기', soupType: '국물 없음', cuisine: '중식' },
  { name: '만두', image_url: '/images/food/만두.jpg', foodType: '밀', soupType: '국물 없음', cuisine: '중식' },
  { name: '매운탕', image_url: '/images/food/매운탕.jpg', foodType: '해산물', soupType: '국물', cuisine: '한식' },
  { name: '미역국', image_url: '/images/food/미역국.jpg', foodType: '채소', soupType: '국물', cuisine: '한식' },
  { name: '미트볼', image_url: '/images/food/미트볼.jpg', foodType: '고기', soupType: '국물 없음', cuisine: '양식' },
  { name: '불고기', image_url: '/images/food/불고기.jpg', foodType: '고기', soupType: '국물 없음', cuisine: '한식' },
  { name: '비빔밥', image_url: '/images/food/비빔밥.jpg', foodType: '쌀', soupType: '국물 없음', cuisine: '한식' },
  { name: '삼겹살', image_url: '/images/food/삼겹살.jpg', foodType: '고기', soupType: '국물 없음', cuisine: '한식' },
  { name: '삼계탕', image_url: '/images/food/삼계탕.jpg', foodType: '고기', soupType: '국물', cuisine: '한식' },
  { name: '새우튀김', image_url: '/images/food/새우튀김.jpg', foodType: '해산물', soupType: '국물 없음', cuisine: '일식' },
  { name: '샤브샤브', image_url: '/images/food/샤브샤브.jpg', foodType: '고기', soupType: '국물', cuisine: '일식' },
  { name: '소고기무국', image_url: '/images/food/소고기무국.jpg', foodType: '고기', soupType: '국물', cuisine: '한식' },
  { name: '스테이크', image_url: '/images/food/스테이크.jpg', foodType: '고기', soupType: '국물 없음', cuisine: '양식' },
  { name: '스파게티', image_url: '/images/food/스파게티.jpg', foodType: '밀', soupType: '국물 없음', cuisine: '양식' },
  { name: '야채볶음밥', image_url: '/images/food/야채볶음밥.jpg', foodType: '쌀', soupType: '국물 없음', cuisine: '한식' },
  { name: '양꼬치', image_url: '/images/food/양꼬치.jpg', foodType: '고기', soupType: '국물 없음', cuisine: '중식' },
  { name: '연어초밥', image_url: '/images/food/연어초밥.jpg', foodType: '해산물', soupType: '국물 없음', cuisine: '일식' },
  { name: '오므라이스', image_url: '/images/food/오므라이스.jpg', foodType: '쌀', soupType: '국물 없음', cuisine: '일식' },
  { name: '오코노미야끼', image_url: '/images/food/오코노미야끼.jpg', foodType: '밀', soupType: '국물 없음', cuisine: '일식' },
  { name: '우동', image_url: '/images/food/우동.jpg', foodType: '밀', soupType: '국물', cuisine: '일식' },
  { name: '유린기', image_url: '/images/food/유린기.jpg', foodType: '고기', soupType: '국물 없음', cuisine: '중식' },
  { name: '제육볶음', image_url: '/images/food/제육볶음.jpg', foodType: '고기', soupType: '국물 없음', cuisine: '한식' },
  { name: '족발', image_url: '/images/food/족발.jpg', foodType: '고기', soupType: '국물 없음', cuisine: '한식' },
  { name: '짜장면', image_url: '/images/food/짜장면.jpg', foodType: '고기', soupType: '국물 없음', cuisine: '중식' },
  { name: '짜파게티', image_url: '/images/food/짜파게티.jpg', foodType: '고기', soupType: '국물 없음', cuisine: '한식' },
  { name: '찜닭', image_url: '/images/food/찜닭.jpg', foodType: '고기', soupType: '국물', cuisine: '한식' },
  { name: '초밥', image_url: '/images/food/초밥.jpg', foodType: '해산물', soupType: '국물 없음', cuisine: '일식' },
  { name: '치킨', image_url: '/images/food/치킨.jpg', foodType: '고기', soupType: '국물 없음', cuisine: '한식' },
  { name: '치킨너겟', image_url: '/images/food/치킨너겟.jpg', foodType: '고기', soupType: '국물 없음', cuisine: '양식' },
  { name: '카레', image_url: '/images/food/카레.jpg', foodType: '고기', soupType: '국물', cuisine: '양식' },
  { name: '카프레제', image_url: '/images/food/카프레제.jpg', foodType: '채소', soupType: '국물 없음', cuisine: '양식' },
  { name: '칼국수', image_url: '/images/food/칼국수.jpg', foodType: '쌀', soupType: '국물', cuisine: '한식' },
  { name: '케밥', image_url: '/images/food/케밥.jpg', foodType: '밀', soupType: '국물 없음', cuisine: '중식' },
  { name: '크로와상', image_url: '/images/food/크로와상.jpg', foodType: '밀', soupType: '국물 없음', cuisine: '양식' },
  { name: '타코', image_url: '/images/food/타코.jpg', foodType: '밀', soupType: '국물 없음', cuisine: '양식' },
  { name: '탕수육', image_url: '/images/food/탕수육.jpg', foodType: '고기', soupType: '국물 없음', cuisine: '중식' },
  { name: '토마토 파스타', image_url: '/images/food/토마토파스타.jpg', foodType: '밀', soupType: '국물 없음', cuisine: '양식' },
  { name: '팟타이', image_url: '/images/food/팟타이.jpg', foodType: '쌀', soupType: '국물 없음', cuisine: '중식' },
  { name: '피자', image_url: '/images/food/피자.jpg', foodType: '밀', soupType: '국물 없음', cuisine: '양식' },
  { name: '핫도그', image_url: '/images/food/핫도그.jpg', foodType: '밀', soupType: '국물 없음', cuisine: '양식' },
  { name: '해물파전', image_url: '/images/food/해물파전.jpg', foodType: '해산물', soupType: '국물 없음', cuisine: '한식' },
  { name: '햄버거', image_url: '/images/food/햄버거.jpg', foodType: '밀', soupType: '국물 없음', cuisine: '양식' },
  { name: '회', image_url: '/images/food/회.jpg', foodType: '해산물', soupType: '국물 없음', cuisine: '일식' },
  { name: '회덮밥', image_url: '/images/food/회덮밥.jpg', foodType: '쌀', soupType: '국물 없음', cuisine: '한식' },
  { name: '마라탕', image_url: '/images/food/마라탕(채소).jpg', foodType: '채소', soupType: '국물', cuisine: '중식' },
  { name: '마라탕(고기추가)', image_url: '/images/food/마라탕.jpg', foodType: '고기', soupType: '국물', cuisine: '중식' },
  { name: '버팔로윙', image_url: '/images/food/버팔로윙.jpg', foodType: '고기', soupType: '국물 없음', cuisine: '중식' },
  { name: '마파두부', image_url: '/images/food/마파두부.jpg', foodType: '채소', soupType: '국물 없음', cuisine: '중식' },
  { name: '덴푸라(야채튀김)', image_url: '/images/food/덴푸라.jpg', foodType: '채소', soupType: '국물 없음', cuisine: '일식' },
  { name: '야채 우동', image_url: '/images/food/야채우동.jpg', foodType: '채소', soupType: '국물', cuisine: '일식' },
  { name: '크림 수프', image_url: '/images/food/크림수프.jpg', foodType: '채소', soupType: '국물', cuisine: '양식' },
  { name: '해산물 우동', image_url: '/images/food/해물우동.jpg', foodType: '해산물', soupType: '국물', cuisine: '일식' },
  { name: '피쉬차우더', image_url: '/images/food/피쉬차우더.jpg', foodType: '해산물', soupType: '국물', cuisine: '양식' },
  { name: '새우 볶음밥', image_url: '/images/food/새우볶음밥.jpg', foodType: '해산물', soupType: '국물 없음', cuisine: '중식' },
  { name: '파스타(새우)', image_url: '/images/food/파스타.jpg', foodType: '해산물', soupType: '국물 없음', cuisine: '양식' },
  { name: '훠궈', image_url: '/images/food/훠궈.jpg', foodType: '밀', soupType: '국물', cuisine: '중식' },
  { name: '로브스터 비스크', image_url: '/images/food/로브스터비스크.jpg', foodType: '밀', soupType: '국물', cuisine: '양식' },
  { name: '빈대떡', image_url: '/images/food/빈대떡.jpg', foodType: '밀', soupType: '국물 없음', cuisine: '한식' }


]


// 여러 음식 데이터 삽입 함수
const insertFoods = (foods) => {
  const stmt = db.prepare(`
    INSERT INTO food (name, image_url, foodType, soupType, cuisine)
    VALUES (?, ?, ?, ?, ?)
  `);

  foods.forEach(food => {
    const { name, image_url, foodType, soupType, cuisine, } = food;
    stmt.run(name, image_url, foodType, soupType, cuisine, function(err) {
      if (err) {
        console.error("Error inserting data: ", err);
      } else {
        console.log(`Inserted ${name} into database`);
      }
    });
  });

  stmt.finalize();
};

// 음식 데이터 삽입 실행
insertFoods(foods);
