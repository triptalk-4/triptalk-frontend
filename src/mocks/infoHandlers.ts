import { rest } from 'msw';

interface userInfoItem {
  imgUrl: string;
  nickname: string;
}

const userInfoData = {
  imgUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  nickname: 'User 1',
};

export const infoHandlers = [
  rest.get<userInfoItem>('/api/userinfo', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userInfoData));
  }),
];
