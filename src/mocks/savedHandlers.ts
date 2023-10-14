import { rest } from 'msw';

interface SaveItem {
  id: number;
  imgSrc: string;
  title: string;
  schedule: string;
  date: string;
}

const savedData = [
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
];

export const savedHandlers = [
  rest.get<SaveItem>('/api/saved', (req, res, ctx) => {
    console.log(req);
    return res(ctx.status(200), ctx.json(savedData));
  }),
];
