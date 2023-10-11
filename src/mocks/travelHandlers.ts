import { rest } from 'msw';

interface travelItem {
  imgUrl: string;
  title: string;
  nickname: string;
  address: string;
  date: string;
  heartCount: number;
  lookUpCount: number;
}

const travelData = [
  {
    imgUrl: 'img/Travelimg1.jpg',
    title: '서울 여행',
    nickname: '모험가',
    address: '서울시 강남구 강남대로 123번길 45',
    date: '10/01/2023',
    heartCount: 5,
    lookUpCount: 5,
  },
  {
    imgUrl: 'img/Travelimg2.jpg',
    title: '부산 바닷가~~ 힐링휴가',
    nickname: '해변객',
    address: '부산 해운대구 해운대해변로 123',
    date: '10/05/2023',
    heartCount: 10,
    lookUpCount: 7,
  },
  {
    imgUrl: 'img/Travelimg5.jpg',
    title: '제주도 자연 탐방',
    nickname: '제주탐험가',
    address: '제주도 제주시 중문관광로 56-3',
    date: '10/10/2023',
    heartCount: 8,
    lookUpCount: 12,
  },
  {
    imgUrl: 'img/Travelimg1.jpg',
    title: '대전 먹방 투어',
    nickname: '음식탐험가',
    address: '대전 유성구 온천북로33번길 22-3 101호',
    date: '10/15/2023',
    heartCount: 15,
    lookUpCount: 8,
  },
  {
    imgUrl: 'img/Travelimg5.jpg',
    title: '자린이 서울 자전거 여행',
    nickname: '자전거탐험가',
    address: '서울시 마포구 서교동 123-45',
    date: '10/20/2023',
    heartCount: 20,
    lookUpCount: 12,
  },
  {
    imgUrl: 'img/Travelimg2.jpg',
    title: '부산 해변 휴식',
    nickname: '해변휴식가',
    address: '부산 사하구 사하로 678번길 67',
    date: '10/25/2023',
    heartCount: 12,
    lookUpCount: 10,
  },
  {
    imgUrl: 'img/Travelimg1.jpg',
    title: '제주도 힐링 여행 떠나보자고~',
    nickname: '제주힐러',
    address: '제주도 서귀포시 남원읍 321-1',
    date: '10/30/2023',
    heartCount: 18,
    lookUpCount: 14,
  },
  {
    imgUrl: 'img/Travelimg2.jpg',
    title: '대전 문화 탐방',
    nickname: '대전문화인',
    address: '대전 중구 계백로 1234번길 56',
    date: '11/05/2023',
    heartCount: 9,
    lookUpCount: 15,
  },
  {
    imgUrl: 'img/Travelimg5.jpg',
    title: '대전 문화 탐방 2',
    nickname: '대전문화인2',
    address: '대전 중구 계백로 567번길 89',
    date: '11/10/2023',
    heartCount: 10,
    lookUpCount: 12,
  },

  {
    imgUrl: 'img/Travelimg1.jpg',
    title: '제주도 해변 휴식',
    nickname: '제주해변휴식',
    address: '제주도 제주시 성산읍 123-45',
    date: '11/15/2023',
    heartCount: 10,
    lookUpCount: 14,
  },
  {
    imgUrl: 'img/Travelimg5.jpg',
    title: '제주도 자연 탐방 2',
    nickname: '제주탐험가2',
    address: '제주도 제주시 중문로 678',
    date: '11/20/2023',
    heartCount: 14,
    lookUpCount: 9,
  },

  {
    imgUrl: 'img/Travelimg1.jpg',
    title: '부산 휴식 여행 2',
    nickname: '부산휴식가2',
    address: '부산 해운대구 해운로 789',
    date: '11/25/2023',
    heartCount: 11,
    lookUpCount: 15,
  },
  {
    imgUrl: 'img/Travelimg2.jpg',
    title: '부산 바닷가 휴가 2',
    nickname: '해변객2',
    address: '부산 해운대구 해운대해변로 456',
    date: '11/30/2023',
    heartCount: 13,
    lookUpCount: 10,
  },

  {
    imgUrl: 'img/Travelimg5.jpg',
    title: '서울 자전거 여행 2',
    nickname: '자전거탐험가2',
    address: '서울시 강남구 강남대로 789',
    date: '12/05/2023',
    heartCount: 19,
    lookUpCount: 11,
  },
  {
    imgUrl: 'img/Travelimg2.jpg',
    title: '서울 문화 탐방 2',
    nickname: '서울문화인2',
    address: '서울시 종로구 종로 1010',
    date: '12/10/2023',
    heartCount: 7,
    lookUpCount: 8,
  },
  {
    imgUrl: 'img/Travelimg1.jpg',
    title: '서울 쇼핑 투어 2',
    nickname: '서울쇼핑가2',
    address: '서울시 마포구 상암로 1234',
    date: '12/15/2023',
    heartCount: 12,
    lookUpCount: 10,
  },
  {
    imgUrl: 'img/Travelimg5.jpg',
    title: '서울 도심 힐링',
    nickname: '도시탐험가',
    address: '서울시 중구 명동길 567',
    date: '12/20/2023',
    heartCount: 9,
    lookUpCount: 13,
  },
];

export const travelHandlers = [
  // 저장한 정보 보내는 것
  rest.get<travelItem>('/api/travels', (req, res, ctx) => {
    console.log(req);
    return res(ctx.status(200), ctx.json(travelData));
  }),
];
