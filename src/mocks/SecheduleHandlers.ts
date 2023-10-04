import { rest } from 'msw';

const ScheduleData = [
  {
    id: 1,
    img: 'img/postimg1.jpg',
    heartCount: 30,
    lookUpCount: 30,
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
    heartCount: 35,
    lookUpCount: 20,
    date: '23.09.30'
  }
];

export const scheduleHandler = rest.get('/api/schedule', (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(ScheduleData));
});
