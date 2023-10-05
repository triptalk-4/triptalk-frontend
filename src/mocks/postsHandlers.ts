import { rest } from 'msw';

interface PostItem {
  id: number;
  imgSrc: string;
  title: string;
  schedule: string;
  date: string;
}

const postsData = [
  {
    id: 1,
    imgSrc: 'img/postimg1.jpg',
    title: '궁궐 달빛기행 1',
    schedule: '09/07/2023~09/10/2023',
    date: '09/11/2023',
  },
  {
    id: 2,
    imgSrc: 'img/postimg2.jpg',
    title: '창덕궁 달빛기행 2',
    schedule: '09/13/2023~09/15/2023',
    date: '09/12/2023',
  },
  {
    id: 3,
    imgSrc: 'img/postimg3.jpg',
    title: '경복궁 달빛기행 3',
    schedule: '09/16/2023~09/18/2023',
    date: '09/13/2023',
  },
  {
    id: 4,
    imgSrc: 'img/postimg4.jpg',
    title: '창경궁 달빛기행 4',
    schedule: '09/19/2023~09/21/2023',
    date: '09/14/2023',
  },
  {
    id: 5,
    imgSrc: 'img/postimg5.jpg',
    title: '경희궁 달빛기행 5',
    schedule: '09/22/2023~09/24/2023',
    date: '09/15/2023',
  },
  {
    id: 6,
    imgSrc: 'img/postimg6.jpg',
    title: '덕수궁 달빛기행 6',
    schedule: '09/25/2023~09/27/2023',
    date: '09/16/2023',
  },
  {
    id: 7,
    imgSrc: 'img/postimg3.jpg',
    title: '창덕궁 달빛기행 7',
    schedule: '09/28/2023~09/30/2023',
    date: '09/17/2023',
  },
  {
    id: 8,
    imgSrc: 'img/postimg2.jpg',
    title: '경복궁 달빛기행 8',
    schedule: '10/01/2023~10/03/2023',
    date: '09/18/2023',
  },
  {
    id: 9,
    imgSrc: 'img/postimg1.jpg',
    title: '대한민국 달빛기행 9',
    schedule: '10/04/2023~10/06/2023',
    date: '09/19/2023',
  },
  {
    id: 10,
    imgSrc: 'img/postimg2.jpg',
    title: '창경궁 달빛기행 10',
    schedule: '10/07/2023~10/09/2023',
    date: '09/20/2023',
  },
  {
    id: 11,
    imgSrc: 'img/postimg5.jpg',
    title: '경희궁 달빛기행 11',
    schedule: '09/07/2023~09/10/2023',
    date: '09/21/2023',
  },
  {
    id: 12,
    imgSrc: '/img/postimg1.jpg',
    title: '동경루 오픈 기념 특별관람',
    schedule: '09/22/2023~09/24/2023',
    date: '09/22/2023',
  },
  {
    id: 13,
    imgSrc: '/img/postimg2.jpg',
    title: '국립고궁박물관 고전음악회',
    schedule: '09/23/2023~09/25/2023',
    date: '09/23/2023',
  },
  { id: 14, imgSrc: '/img/postimg3.jpg', title: '서울 아트 쇼', schedule: '09/24/2023~09/26/2023', date: '09/24/2023' },
  {
    id: 15,
    imgSrc: '/img/postimg4.jpg',
    title: '서울 시립 미술관 현대미술관',
    schedule: '09/25/2023~09/27/2023',
    date: '09/25/2023',
  },
  {
    id: 16,
    imgSrc: '/img/postimg5.jpg',
    title: '서울 타워 뷰맛집',
    schedule: '09/26/2023~09/28/2023',
    date: '09/26/2023',
  },
  {
    id: 17,
    imgSrc: '/img/postimg6.jpg',
    title: '서울 쇼핑 투어',
    schedule: '09/27/2023~09/29/2023',
    date: '09/27/2023',
  },
  {
    id: 18,
    imgSrc: '/img/postimg1.jpg',
    title: '테마파크 투어',
    schedule: '09/28/2023~09/30/2023',
    date: '09/28/2023',
  },
  {
    id: 19,
    imgSrc: '/img/postimg4.jpg',
    title: '서울 자전거 투어',
    schedule: '09/29/2023~10/01/2023',
    date: '09/29/2023',
  },
  { id: 20, imgSrc: '/img/postimg5.jpg', title: '한강 물놀이', schedule: '09/30/2023~10/02/2023', date: '09/30/2023' },
];

export const postsHandlers = [
  rest.get<PostItem>('/api/posts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(postsData));
  }),
];
