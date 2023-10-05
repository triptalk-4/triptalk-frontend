import { rest } from 'msw';

const userData = {
  imageUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  nickname: 'User 1',
};

const postsData = {
  id: 1,
  imageSrc: 'img/postimg1.jpg',
  title: '궁궐 달빛기행',
  schedule: '23.09.07~23.09.10',
  date: '23.09.11',
};

export const infoHandlers = [
  rest.get('/api/myinfo', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userData));
  }),
];

export const postsHandlers = [
  rest.get('/api/posts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(postsData));
  }),
];
