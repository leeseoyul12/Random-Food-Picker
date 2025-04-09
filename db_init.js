const sqlite3 = require('sqlite3').verbose();

// 데이터베이스 파일 열기
const db = new sqlite3.Database('./foods.db');

// 테이블 생성
db.serialize(() => {




  db.run(`DROP TABLE IF EXISTS food`);

  // 음식 테이블 생성
  db.run(`
    CREATE TABLE IF NOT EXISTS food (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      image_url TEXT UNIQUE,
      description TEXT,
      category TEXT,   
      cuisine TEXT,      
      spicy TEXT
    );
  `);


  // 유저 테이블 생성
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password_hash TEXT
    );
  `);
});


const foods = [
  { name: '간장게장', image_url: '/images/food/간장게장.jpg', description: '게장을 간장에 절여 만든 한식 요리입니다.', category: '밥류', cuisine: '한식', spicy: '안매운맛' },
  { name: '갈비탕', image_url: '/images/food/갈비탕.jpg', description: '소갈비를 푹 고아 만든 맑은 국물의 한식 요리입니다.', category: '국물요리', cuisine: '한식', spicy: '안매운맛' },
  { name: '고로케', image_url: '/images/food/고로케.jpg', description: '겉은 바삭하고 속은 부드러운 감자나 고기 속을 넣은 튀김 요리입니다.', category: '튀김', cuisine: '양식', spicy: '안매운맛' },
  { name: '김밥', image_url: '/images/food/김밥.jpg', description: '밥과 다양한 재료를 김으로 말아 만든 한국식 롤 요리입니다.', category: '밥류', cuisine: '한식', spicy: '안매운맛' },
  { name: '김치전', image_url: '/images/food/김치전.jpg', description: '김치와 밀가루 반죽을 이용해 바삭하게 부친 한식 전 요리입니다.', category: '분식', cuisine: '한식', spicy: '매운맛' },
  { name: '김치찌개', image_url: '/images/food/김치찌개.jpg', description: '김치를 주재료로 한 얼큰하고 깊은 맛의 한국식 찌개입니다.', category: '국물요리', cuisine: '한식', spicy: '매운맛' },
  { name: '나가사키짬뽕', image_url: '/images/food/나가사키짬뽕.jpg', description: '해산물과 고기를 넣어 깊은 국물 맛을 내는 일본식 짬뽕입니다.', category: '국물요리', cuisine: '중식', spicy: '안매운맛' },
  { name: '냉면', image_url: '/images/food/냉면.jpg', description: '차가운 육수와 메밀면을 사용한 여름철 대표 한식 요리입니다.', category: '면류', cuisine: '한식', spicy: '안매운맛' },
  { name: '뇨끼', image_url: '/images/food/뇨끼.jpg', description: '감자와 밀가루를 반죽하여 만든 이탈리아식 파스타 요리입니다.', category: '면류', cuisine: '양식', spicy: '안매운맛' },
  { name: '달걀말이', image_url: '/images/food/달걀말이.jpg', description: '달걀을 풀어 부드럽게 말아 만든 한식 반찬 요리입니다.', category: '밥류', cuisine: '한식', spicy: '안매운맛' },
  { name: '닭꼬치', image_url: '/images/food/닭꼬치.jpg', description: '닭고기를 꼬치에 끼워 구운 간식 또는 안주 요리입니다.', category: '구이', cuisine: '한식', spicy: '안매운맛' },
  { name: '닭볶음탕', image_url: '/images/food/닭볶음탕.jpg', description: '매콤한 양념으로 닭고기와 채소를 졸여 만든 한국식 요리입니다.', category: '국물요리', cuisine: '한식', spicy: '매운맛' },

  { name: '돈까스', image_url: '/images/food/돈까스.jpg', description: '바삭하게 튀긴 돼지고기에 달콤한 소스를 곁들인 일본 요리입니다.', category: '튀김', cuisine: '일식', spicy: '안매운맛' },
  { name: '동태찌개', image_url: '/images/food/동태찌개.jpg', description: '얼큰한 국물에 동태와 다양한 채소를 넣어 끓인 한국식 찌개입니다.', category: '국물요리', cuisine: '한식', spicy: '매운맛' },
  { name: '돼지국밥', image_url: '/images/food/돼지국밥.jpg', description: '진하게 우려낸 돼지고기 육수에 밥을 말아 먹는 한국 전통 국밥입니다.', category: '밥류', cuisine: '한식', spicy: '안매운맛' },
  { name: '된장찌개', image_url: '/images/food/된장찌개.jpg', description: '된장을 베이스로 한 구수한 국물에 다양한 채소와 두부를 넣어 끓인 찌개입니다.', category: '국물요리', cuisine: '한식', spicy: '안매운맛' },
  { name: '떡볶이', image_url: '/images/food/떡볶이.jpg', description: '쫄깃한 떡을 매콤한 고추장 소스로 볶아 만든 한국의 대표적인 간식입니다.', category: '분식', cuisine: '한식', spicy: '매운맛' },
  { name: '라따뚜이', image_url: '/images/food/라따뚜이.jpg', description: '다양한 채소를 토마토 소스와 함께 조리한 프랑스 남부 지역의 전통 요리입니다.', category: '분식', cuisine: '양식', spicy: '안매운맛' },
  { name: '라멘', image_url: '/images/food/라멘.jpg', description: '진한 육수에 쫄깃한 면을 넣어 즐기는 일본식 국수 요리입니다.', category: '면류', cuisine: '일식', spicy: '안매운맛' },
  { name: '라면', image_url: '/images/food/라면.jpg', description: '매콤하고 진한 국물에 쫄깃한 면이 특징인 한국의 인기 있는 인스턴트 면 요리입니다.', category: '면류', cuisine: '한식', spicy: '매운맛' },
  { name: '라자냐', image_url: '/images/food/라자냐.jpg', description: '층층이 쌓인 라자냐 면과 고기, 치즈, 토마토 소스를 오븐에서 구운 이탈리아 요리입니다.', category: '면류', cuisine: '양식', spicy: '안매운맛' },
  { name: '리조또', image_url: '/images/food/리조또.jpg', description: '부드럽고 크리미한 식감이 특징인 이탈리아식 쌀 요리입니다.', category: '밥류', cuisine: '양식', spicy: '안매운맛' },
  { name: '마라샹궈', image_url: '/images/food/마라샹궈.jpg', description: '중국 사천 요리로, 마라 소스를 이용해 고기와 채소를 볶아낸 매콤한 요리입니다.', category: '구이', cuisine: '중식', spicy: '매운맛' },

  { name: '만두', image_url: '/images/food/만두.jpg', description: '다양한 속 재료를 밀가루 반죽으로 감싸 쪄내거나 튀긴 중국 전통 요리입니다.', category: '분식', cuisine: '중식', spicy: '안매운맛' },
  { name: '매운탕', image_url: '/images/food/매운탕.jpg', description: '각종 해산물을 얼큰한 양념으로 끓여낸 한국식 매운 국물 요리입니다.', category: '국물요리', cuisine: '한식', spicy: '매운맛' },
  { name: '미역국', image_url: '/images/food/미역국.jpg', description: '소고기 또는 해산물을 넣어 미역과 함께 끓인 담백한 국물 요리입니다.', category: '국물요리', cuisine: '한식', spicy: '안매운맛' },
  { name: '미트볼', image_url: '/images/food/미트볼.jpg', description: '잘게 다진 고기를 동그랗게 빚어 구운 후 소스와 함께 제공되는 서양식 요리입니다.', category: '구이', cuisine: '양식', spicy: '안매운맛' },
  { name: '불고기', image_url: '/images/food/불고기.jpg', description: '얇게 썬 소고기를 양념에 재워 구운 한국 전통 고기 요리입니다.', category: '구이', cuisine: '한식', spicy: '안매운맛' },
  { name: '비빔밥', image_url: '/images/food/비빔밥.jpg', description: '다양한 채소, 고기, 달걀을 밥 위에 올리고 고추장과 함께 비벼 먹는 한국 요리입니다.', category: '밥류', cuisine: '한식', spicy: '매운맛' },
  { name: '삼겹살', image_url: '/images/food/삼겹살.jpg', description: '지방과 살코기가 적절히 섞인 돼지고기를 구워 먹는 한국 대표 고기 요리입니다.', category: '구이', cuisine: '한식', spicy: '안매운맛' },
  { name: '삼계탕', image_url: '/images/food/삼계탕.jpg', description: '닭고기에 인삼, 대추, 찹쌀을 넣고 푹 끓여 만든 보양식입니다.', category: '국물요리', cuisine: '한식', spicy: '안매운맛' },

  { name: '새우튀김', image_url: '/images/food/새우튀김.jpg', description: '바삭하게 튀긴 새우로, 간장이나 텐동 소스와 함께 즐기기 좋습니다.', category: '튀김', cuisine: '일식', spicy: '안매운맛' },
  { name: '샤브샤브', image_url: '/images/food/샤브샤브.jpg', description: '얇게 썬 고기를 뜨거운 국물에 살짝 익혀 먹는 요리입니다.', category: '국물요리', cuisine: '일식', spicy: '안매운맛' },
  { name: '소고기무국', image_url: '/images/food/소고기무국.jpg', description: '담백한 국물에 무와 소고기가 들어간 한국식 국물 요리입니다.', category: '국물요리', cuisine: '한식', spicy: '안매운맛' },
  { name: '스테이크', image_url: '/images/food/스테이크.jpg', description: '두껍게 구운 소고기로, 버터와 허브로 풍미를 더한 요리입니다.', category: '구이', cuisine: '양식', spicy: '안매운맛' },
  { name: '스파게티', image_url: '/images/food/스파게티.jpg', description: '이탈리아식 면 요리로, 다양한 소스와 곁들여 먹습니다.', category: '면류', cuisine: '양식', spicy: '안매운맛' },
  { name: '야채볶음밥', image_url: '/images/food/야채볶음밥.jpg', description: '다양한 야채와 함께 볶아낸 건강한 볶음밥입니다.', category: '밥류', cuisine: '한식', spicy: '안매운맛' },
  { name: '양꼬치', image_url: '/images/food/양꼬치.jpg', description: '숯불에 구운 양고기 꼬치로, 향신료와 함께 즐기는 중식 요리입니다.', category: '구이', cuisine: '중식', spicy: '안매운맛' },
  { name: '연어초밥', image_url: '/images/food/연어초밥.jpg', description: '신선한 연어를 얹은 일본식 초밥입니다.', category: '밥류', cuisine: '일식', spicy: '안매운맛' },

  { name: '오므라이스', image_url: '/images/food/오므라이스.jpg', description: '계란으로 감싼 볶음밥으로, 케첩 소스와 함께 즐깁니다.', category: '밥류', cuisine: '일식', spicy: '안매운맛' },
  { name: '오코노미야끼', image_url: '/images/food/오코노미야끼.jpg', description: '일본식 부침개로, 양배추와 다양한 재료를 넣어 만듭니다.', category: '분식', cuisine: '일식', spicy: '안매운맛' },
  { name: '우동', image_url: '/images/food/우동.jpg', description: '쫄깃한 면발과 깊은 국물 맛이 조화를 이루는 일본식 면 요리입니다.', category: '면류', cuisine: '일식', spicy: '안매운맛' },
  { name: '유린기', image_url: '/images/food/유린기.jpg', description: '튀긴 닭고기에 새콤달콤한 소스를 뿌린 중국식 요리입니다.', category: '튀김', cuisine: '중식', spicy: '안매운맛' },
  { name: '제육볶음', image_url: '/images/food/제육볶음.jpg', description: '매콤한 양념에 돼지고기를 볶아 만든 한국식 요리입니다.', category: '구이', cuisine: '한식', spicy: '매운맛' },
  { name: '족발', image_url: '/images/food/족발.jpg', description: '양념된 돼지고기를 푹 삶아 촉촉하고 쫄깃한 식감이 특징인 한식 요리.', category: '구이', cuisine: '한식', spicy: '안매운맛' },
  { name: '짜장면', image_url: '/images/food/짜장면.jpg', description: '검은 짜장 소스와 쫄깃한 면이 조화를 이루는 대표적인 중국 요리.', category: '면류', cuisine: '중식', spicy: '안매운맛' },
  { name: '짜파게티', image_url: '/images/food/짜파게티.jpg', description: '인스턴트 짜장라면으로, 간편하면서도 깊은 맛을 즐길 수 있는 인기 음식.', category: '면류', cuisine: '한식', spicy: '안매운맛' },
  { name: '찜닭', image_url: '/images/food/찜닭.jpg', description: '달콤 짭짤한 간장 소스로 양념한 닭고기와 당면이 조화를 이루는 요리.', category: '국물요리', cuisine: '한식', spicy: '안매운맛' },
  { name: '초밥', image_url: '/images/food/초밥.jpg', description: '신선한 해산물과 간장, 와사비가 어우러진 대표적인 일본 요리.', category: '밥류', cuisine: '일식', spicy: '안매운맛' },
  { name: '치킨', image_url: '/images/food/치킨.jpg', description: '바삭하게 튀긴 닭고기로, 다양한 소스와 함께 즐길 수 있는 국민 간식.', category: '튀김', cuisine: '한식', spicy: '매운맛' },
  { name: '치킨너겟', image_url: '/images/food/치킨너겟.jpg', description: '한 입 크기로 튀긴 닭고기 조각으로, 간편하게 먹기 좋은 음식.', category: '튀김', cuisine: '양식', spicy: '안매운맛' },
  { name: '카레', image_url: '/images/food/카레.jpg', description: '향신료가 어우러진 진한 소스와 밥을 함께 먹는 인기 요리.', category: '밥류', cuisine: '양식', spicy: '안매운맛' },
  { name: '칼국수', image_url: '/images/food/칼국수.jpg', description: '쫄깃한 면발과 진한 육수가 어우러진 한국식 국수 요리.', category: '면류', cuisine: '한식', spicy: '안매운맛' },
  { name: '케밥', image_url: '/images/food/케밥.jpg', description: '양고기나 닭고기를 빵과 함께 먹는 중동식 샌드위치 스타일의 음식.', category: '구이', cuisine: '중식', spicy: '매운맛' },
  { name: '크로와상', image_url: '/images/food/크로와상.jpg', description: '겹겹이 쌓인 버터 풍미 가득한 프랑스식 페이스트리.', category: '구이', cuisine: '양식', spicy: '안매운맛' },
  { name: '타코', image_url: '/images/food/타코.jpg', description: '또르티야에 다양한 재료를 넣어 먹는 멕시코 대표 요리.', category: '분식', cuisine: '양식', spicy: '매운맛' },
  { name: '탕수육', image_url: '/images/food/탕수육.jpg', description: '바삭하게 튀긴 돼지고기에 새콤달콤한 소스를 곁들인 중국 요리.', category: '튀김', cuisine: '중식', spicy: '안매운맛' },
  { name: '토마토 파스타', image_url: '/images/food/토마토파스타.jpg', description: '진한 토마토 소스와 면이 어우러진 이탈리아 대표 요리.', category: '면류', cuisine: '양식', spicy: '안매운맛' },
  { name: '팟타이', image_url: '/images/food/팟타이.jpg', description: '태국식 볶음 국수로, 달콤 짭짤한 맛이 매력적인 요리.', category: '면류', cuisine: '중식', spicy: '안매운맛' },
  { name: '피자', image_url: '/images/food/피자.jpg', description: '도우 위에 다양한 토핑을 올려 구운 전 세계적으로 인기 있는 음식.', category: '구이', cuisine: '양식', spicy: '안매운맛' },
  { name: '핫도그', image_url: '/images/food/핫도그.jpg', description: '빵 안에 소시지를 넣고 다양한 소스를 곁들인 간편한 음식.', category: '분식', cuisine: '양식', spicy: '안매운맛' },
  
  { name: '해물파전', image_url: '/images/food/해물파전.jpg', description: '바삭한 부침개에 해산물이 듬뿍 들어간 한식 전 요리.', category: '튀김', cuisine: '한식', spicy: '안매운맛' },
  { name: '햄버거', image_url: '/images/food/햄버거.jpg', description: '고기 패티와 신선한 채소가 들어간 간편한 서양식 샌드위치.', category: '분식', cuisine: '양식', spicy: '안매운맛' },
  { name: '회', image_url: '/images/food/회.jpg', description: '신선한 해산물을 얇게 썰어 간장과 와사비에 찍어 먹는 요리.', category: '구이', cuisine: '일식', spicy: '안매운맛' },
  { name: '회덮밥', image_url: '/images/food/회덮밥.jpg', description: '각종 회와 채소를 매콤한 양념장과 함께 비벼 먹는 덮밥 요리.', category: '밥류', cuisine: '한식', spicy: '매운맛' },
  { name: '마라탕', image_url: '/images/food/마라탕(채소).jpg', description: '얼얼한 마라 소스에 다양한 채소와 재료를 넣어 끓인 중국식 탕 요리.', category: '국물요리', cuisine: '중식', spicy: '매운맛' },
  { name: '마라탕(고기추가)', image_url: '/images/food/마라탕.jpg', description: '얼얼한 마라탕에 추가된 고기로 더욱 풍부한 맛을 느낄 수 있는 요리.', category: '국물요리', cuisine: '중식', spicy: '매운맛' },
  { name: '버팔로윙', image_url: '/images/food/버팔로윙.jpg', description: '매콤한 소스에 버무려진 치킨 윙으로 맥주 안주로 인기.', category: '튀김', cuisine: '중식', spicy: '매운맛' },
  { name: '마파두부', image_url: '/images/food/마파두부.jpg', description: '매콤한 두반장 소스에 부드러운 두부를 넣어 만든 중식 요리.', category: '밥류', cuisine: '중식', spicy: '매운맛' },
  { name: '덴푸라(야채튀김)', image_url: '/images/food/덴푸라.jpg', description: '바삭하게 튀긴 다양한 채소 튀김으로 일본식 요리.', category: '튀김', cuisine: '일식', spicy: '안매운맛' },
  { name: '야채 우동', image_url: '/images/food/야채우동.jpg', description: '쫄깃한 우동 면발과 신선한 야채가 어우러진 따뜻한 국물 요리.', category: '면류', cuisine: '일식', spicy: '안매운맛' },
  { name: '크림 수프', image_url: '/images/food/크림수프.jpg', description: '부드럽고 크리미한 질감의 서양식 수프입니다.', category: '국물요리', cuisine: '양식', spicy: '안매운맛' },
  
  { name: '해산물 우동', image_url: '/images/food/해물우동.jpg', description: '진한 해산물 육수와 쫄깃한 우동 면이 조화를 이루는 일본식 국수 요리입니다.', category: '면류', cuisine: '일식', spicy: '안매운맛' },
{ name: '피쉬차우더', image_url: '/images/food/피쉬차우더.jpg', description: '고소한 크림 베이스에 해산물이 듬뿍 들어간 서양식 수프입니다.', category: '국물요리', cuisine: '양식', spicy: '안매운맛' },
{ name: '새우 볶음밥', image_url: '/images/food/새우볶음밥.jpg', description: '탱글한 새우와 고슬고슬한 밥이 어우러진 중국식 볶음밥입니다.', category: '밥류', cuisine: '중식', spicy: '안매운맛' },
{ name: '파스타(새우)', image_url: '/images/food/파스타.jpg', description: '올리브 오일과 새우가 어우러진 클래식한 이탈리안 파스타입니다.', category: '면류', cuisine: '양식', spicy: '안매운맛' },
{ name: '훠궈', image_url: '/images/food/훠궈.jpg', description: '얼얼한 마라 국물에 다양한 재료를 넣어 먹는 중국식 샤부샤부입니다.', category: '국물요리', cuisine: '중식', spicy: '매운맛' },
{ name: '로브스터 비스크', image_url: '/images/food/로브스터비스크.jpg', description: '고급스러운 로브스터 풍미가 가득한 부드러운 프랑스식 스프입니다.', category: '국물요리', cuisine: '양식', spicy: '안매운맛' },
{ name: '빈대떡', image_url: '/images/food/빈대떡.jpg', description: '바삭하고 고소한 전통 한식 전 요리로, 녹두로 만들어집니다.', category: '튀김', cuisine: '한식', spicy: '안매운맛' },
{ name: '추어탕', image_url: '/images/food/추어탕.jpg', description: '미꾸라지를 푹 고아 만든 영양 가득한 한식 탕 요리입니다.', category: '국물요리', cuisine: '한식', spicy: '안매운맛' },
{ name: '죽', image_url: '/images/food/죽.jpg', description: '속을 편안하게 해주는 부드러운 한식 죽 요리입니다.', category: '국물요리', cuisine: '한식', spicy: '안매운맛' },


{ name: '규동', image_url: '/images/food/규동소고기덮밥.jpg', description: '달콤 짭짤한 양념에 조린 소고기가 올라간 일본식 덮밥입니다.', category: '밥류', cuisine: '일식', spicy: '안매운맛' },
{ name: '스키야키', image_url: '/images/food/스키야키.jpg', description: '진한 간장 소스에 고기를 익혀 먹는 일본 전골 요리입니다.', category: '국물요리', cuisine: '일식', spicy: '안매운맛' },
{ name: '잠발라야', image_url: '/images/food/잠발라야.jpg', description: '스페인식 파에야와 유사한 매콤한 미국 남부 스타일 볶음밥입니다.', category: '밥류', cuisine: '양식', spicy: '매운맛' },
{ name: '유산슬', image_url: '/images/food/유산슬밥.jpg', description: '해산물과 채소가 조화로운 중국식 볶음 요리입니다.', category: '밥류', cuisine: '중식', spicy: '안매운맛' },
{ name: '해물누룽지탕', image_url: '/images/food/해물누룽지탕.jpg', description: '고소한 누룽지와 진한 해물 국물이 어우러진 중국식 탕 요리입니다.', category: '국물요리', cuisine: '중식', spicy: '안매운맛' },
{ name: '산라탕', image_url: '/images/food/산라탕.jpg', description: '새콤하고 매콤한 맛이 특징인 중국식 국물 요리입니다.', category: '국물요리', cuisine: '중식', spicy: '매운맛' },
{ name: '비프스튜', image_url: '/images/food/비트스튜밥.jpg', description: '진한 소고기 육수와 야채가 어우러진 서양식 스튜입니다.', category: '국물요리', cuisine: '양식', spicy: '안매운맛' },
{ name: '치킨마살라', image_url: '/images/food/치킨마살라밥.jpg', description: '인도 향신료와 치킨이 어우러진 강렬한 맛의 커리 요리입니다.', category: '국물요리', cuisine: '양식', spicy: '매운맛' }

]





// 음식 데이터 삽입
const insertFoods = (foods) => {
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO food (name, image_url, description, category, cuisine, spicy)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  foods.forEach(food => {
    const { name, image_url, description, category, cuisine, spicy } = food;
    stmt.run(name, image_url, description, category, cuisine, spicy, function(err) {
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

// DB 연결 닫기
db.close();