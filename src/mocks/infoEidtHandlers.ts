import { rest } from 'msw';

interface userInfoEditItem {
  imgUrl: string;
  nickname: string;
  email: string;
  password: string;
}

const userInfoData = {
  imgUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  nickname: '사조사조',
  email: 'user1@naver.com',
  password: 'Password123',
};

export const infoEditHandlers = [
  rest.get<userInfoEditItem>('/api/userinfoeidt', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userInfoData));
  }),
];
