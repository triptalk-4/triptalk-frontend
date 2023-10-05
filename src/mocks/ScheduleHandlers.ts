import { rest } from 'msw';

export const ScheduleData = [
  {
    id: 1,
    img: 'img/postimg1.jpg',
    heartCount: 5,
    lookUpCount: 5,
    date: '23.09.28'
  },
  {
    id: 2,
    img: 'img/postimg2.jpg',
    heartCount: 25,
    lookUpCount: 40,
    date: '23.09.29'
  },
  {
    id: 3,
    img: 'img/postimg3.jpg',
    heartCount: 15,
    lookUpCount: 20,
    date: '23.09.30'
  },
  {
    id: 4,
    img: 'img/postimg1.jpg',
    heartCount: 5,
    lookUpCount: 5,
    date: '23.09.28'
  },
  {
    id: 5,
    img: 'img/postimg2.jpg',
    heartCount: 25,
    lookUpCount: 40,
    date: '23.09.29'
  },
  {
    id: 6,
    img: 'img/postimg3.jpg',
    heartCount: 15,
    lookUpCount: 20,
    date: '23.09.30'
  },
  {
    id: 7,
    img: 'img/postimg1.jpg',
    heartCount: 5,
    lookUpCount: 5,
    date: '23.09.28'
  },
  {
    id: 8,
    img: 'img/postimg2.jpg',
    heartCount: 25,
    lookUpCount: 40,
    date: '23.09.29'
  },
  {
    id: 9,
    img: 'img/postimg3.jpg',
    heartCount: 15,
    lookUpCount: 20,
    date: '23.09.30'
  },
  {
    id: 10,
    img: 'img/postimg1.jpg',
    heartCount: 5,
    lookUpCount: 5,
    date: '23.09.28'
  },
  {
    id: 11,
    img: 'img/postimg2.jpg',
    heartCount: 25,
    lookUpCount: 40,
    date: '23.09.29'
  },
  {
    id: 12,
    img: 'img/postimg3.jpg',
    heartCount: 15,
    lookUpCount: 20,
    date: '23.09.30'
  },
  {
    id: 13,
    img: 'img/postimg1.jpg',
    heartCount: 5,
    lookUpCount: 5,
    date: '23.09.28'
  },
  {
    id: 14,
    img: 'img/postimg2.jpg',
    heartCount: 25,
    lookUpCount: 40,
    date: '23.09.29'
  },
  {
    id: 15,
    img: 'img/postimg3.jpg',
    heartCount: 15,
    lookUpCount: 20,
    date: '23.09.30'
  },
  {
    id: 16,
    img: 'img/postimg1.jpg',
    heartCount: 5,
    lookUpCount: 5,
    date: '23.09.28'
  },
  {
    id: 17,
    img: 'img/postimg2.jpg',
    heartCount: 25,
    lookUpCount: 40,
    date: '23.09.29'
  },
  {
    id: 18,
    img: 'img/postimg3.jpg',
    heartCount: 15,
    lookUpCount: 20,
    date: '23.09.30'
  },
  {
    id: 19,
    img: 'img/postimg1.jpg',
    heartCount: 5,
    lookUpCount: 5,
    date: '23.09.28'
  },
  {
    id: 20,
    img: 'img/postimg2.jpg',
    heartCount: 25,
    lookUpCount: 40,
    date: '23.09.29'
  },
  {
    id: 21,
    img: 'img/postimg3.jpg',
    heartCount: 15,
    lookUpCount: 20,
    date: '23.09.30'
  },
  {
    id: 22,
    img: 'img/postimg4.jpg',
    heartCount: 8,
    lookUpCount: 21,
    date: '23.10.01'
  },
  {
    id: 23,
    img: 'img/postimg5.jpg',
    heartCount: 35,
    lookUpCount: 40,
    date: '23.10.02'
  },
  {
    id: 24,
    img: 'img/postimg6.jpg',
    heartCount: 18,
    lookUpCount: 20,
    date: '23.10.03'
  },
  {
    id: 25,
    img: 'img/postimg1.jpg',
    heartCount: 5,
    lookUpCount: 5,
    date: '23.09.28'
  },
  {
    id: 26,
    img: 'img/postimg2.jpg',
    heartCount: 25,
    lookUpCount: 40,
    date: '23.09.29'
  },
  {
    id: 27,
    img: 'img/postimg3.jpg',
    heartCount: 15,
    lookUpCount: 20,
    date: '23.09.30'
  },
  {
    id: 28,
    img: 'img/postimg1.jpg',
    heartCount: 5,
    lookUpCount: 5,
    date: '23.09.28'
  },
  {
    id: 29,
    img: 'img/postimg2.jpg',
    heartCount: 25,
    lookUpCount: 40,
    date: '23.09.29'
  },
  {
    id: 30,
    img: 'img/postimg3.jpg',
    heartCount: 15,
    lookUpCount: 20,
    date: '23.09.30'
  },
  {
    id: 31,
    img: 'img/postimg1.jpg',
    heartCount: 5,
    lookUpCount: 5,
    date: '23.09.28'
  },
  {
    id: 32,
    img: 'img/postimg2.jpg',
    heartCount: 25,
    lookUpCount: 40,
    date: '23.09.29'
  },
  {
    id: 33,
    img: 'img/postimg3.jpg',
    heartCount: 15,
    lookUpCount: 20,
    date: '23.09.30'
  }
];
export const scheduleHandler = [
  rest.get('/api/schedule', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(ScheduleData));
  })
];
