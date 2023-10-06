import { rest } from 'msw';

export const ScheduleData = [
  {
    id: 1,
    img: 'img/postimg1.jpg',
    heartCount: 5,
    lookUpCount: 5,
    date: '09/29/2023'
  },
  {
    id: 2,
    img: 'img/postimg2.jpg',
    heartCount: 25,
    lookUpCount: 40,
    date: '09/30/2023'
  },
  {
    id: 3,
    img: 'img/postimg3.jpg',
    heartCount: 15,
    lookUpCount: 20,
    date: '09/31/2023'
  },
  {
    id: 4,
    img: 'img/postimg1.jpg',
    heartCount: 5,
    lookUpCount: 5,
    date: '09/31/2023'
  },
  {
    id: 5,
    img: 'img/postimg2.jpg',
    heartCount: 25,
    lookUpCount: 40,
    date: '10/29/2023'
  },
  {
    id: 6,
    img: 'img/postimg3.jpg',
    heartCount: 15,
    lookUpCount: 20,
    date: '10/29/2023'
  },
  {
    id: 7,
    img: 'img/postimg1.jpg',
    heartCount: 5,
    lookUpCount: 5,
    date: '09/26/2023'
  },
  {
    id: 8,
    img: 'img/postimg2.jpg',
    heartCount: 25,
    lookUpCount: 40,
    date: '10/22/2023'
  },
  {
    id: 9,
    img: 'img/postimg3.jpg',
    heartCount: 15,
    lookUpCount: 20,
    date: '10/11/2023'
  },
  {
    id: 10,
    img: 'img/postimg1.jpg',
    heartCount: 5,
    lookUpCount: 5,
    date: '10/26/2023'
  },
  {
    id: 11,
    img: 'img/postimg2.jpg',
    heartCount: 25,
    lookUpCount: 40,
    date: '09/29/2023'
  },
  {
    id: 12,
    img: 'img/postimg3.jpg',
    heartCount: 15,
    lookUpCount: 20,
    date: '09/29/2023'
  },
  {
    id: 13,
    img: 'img/postimg1.jpg',
    heartCount: 5,
    lookUpCount: 5,
    date: '10/11/2023'
  },
  {
    id: 14,
    img: 'img/postimg2.jpg',
    heartCount: 25,
    lookUpCount: 40,
    date: '11/11/2023'
  },
  {
    id: 15,
    img: 'img/postimg3.jpg',
    heartCount: 15,
    lookUpCount: 20,
    date: '09/22/2023'
  },
  {
    id: 16,
    img: 'img/postimg1.jpg',
    heartCount: 5,
    lookUpCount: 5,
    date: '10/22/2023'
  },
  {
    id: 17,
    img: 'img/postimg2.jpg',
    heartCount: 25,
    lookUpCount: 40,
    date: '10/20/2023'
  },
  {
    id: 18,
    img: 'img/postimg3.jpg',
    heartCount: 15,
    lookUpCount: 20,
    date: '10/29/2023'
  },
  {
    id: 19,
    img: 'img/postimg1.jpg',
    heartCount: 5,
    lookUpCount: 5,
    date: '09/25/2023'
  },
  {
    id: 20,
    img: 'img/postimg2.jpg',
    heartCount: 25,
    lookUpCount: 40,
    date: '09/26/2023'
  },
  {
    id: 21,
    img: 'img/postimg3.jpg',
    heartCount: 15,
    lookUpCount: 20,
    date: '09/28/2023'
  },
  {
    id: 22,
    img: 'img/postimg4.jpg',
    heartCount: 8,
    lookUpCount: 21,
    date: '09/27/2023'
  },
  {
    id: 23,
    img: 'img/postimg5.jpg',
    heartCount: 35,
    lookUpCount: 40,
    date: '09/29/2023'
  },
  {
    id: 24,
    img: 'img/postimg6.jpg',
    heartCount: 18,
    lookUpCount: 20,
    date: '10/01/2023'
  },
  {
    id: 25,
    img: 'img/postimg1.jpg',
    heartCount: 5,
    lookUpCount: 5,
    date: '10/02/2023'
  },
  {
    id: 26,
    img: 'img/postimg2.jpg',
    heartCount: 25,
    lookUpCount: 40,
    date: '10/03/2023'
  },
  {
    id: 27,
    img: 'img/postimg3.jpg',
    heartCount: 15,
    lookUpCount: 20,
    date: '10/09/2023'
  },
  {
    id: 28,
    img: 'img/postimg1.jpg',
    heartCount: 5,
    lookUpCount: 5,
    date: '10/29/2023'
  },
  {
    id: 29,
    img: 'img/postimg2.jpg',
    heartCount: 25,
    lookUpCount: 40,
    date: '10/28/2023'
  },
  {
    id: 30,
    img: 'img/postimg3.jpg',
    heartCount: 15,
    lookUpCount: 20,
    date: '10/29/2023'
  },
  {
    id: 31,
    img: 'img/postimg1.jpg',
    heartCount: 5,
    lookUpCount: 5,
    date: '09/31/2023'
  },
  {
    id: 32,
    img: 'img/postimg2.jpg',
    heartCount: 25,
    lookUpCount: 40,
    date: '09/30/2023'
  }
];
export const scheduleHandler = [
  rest.get('/api/schedule', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(ScheduleData));
  })
];
