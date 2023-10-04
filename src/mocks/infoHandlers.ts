import { rest } from 'msw';

const userData = {
  imageUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  nickname: 'User 3',
};

export const infoHandlers = [
  rest.get('/api/myinfo', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userData));
  }),
];
