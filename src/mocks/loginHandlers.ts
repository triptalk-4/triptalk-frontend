import { rest } from 'msw';

interface LoginRequestBody {
  email: string;
  password: string
}

const userData = [
  {
    id: 1,
    email: 'user1@naver.com',
    password: 'Password123'
  },
  {
    id: 2,
    email: 'user2@naver.com',
    password: 'Password456'
  },
  {
    id: 3,
    email: 'user3@naver.com',
    password: 'Password789'
  },
]

export const loginHandlers = [
  // 가짜 로그인 핸들러
  rest.post<LoginRequestBody, { userId: any}>('/api/login' , (req, res, ctx) => {
    const { email, password } = req.body;
    const user = userData.find((u) => u.email === email && u.password === password)

    if (user) {
      return res(ctx.status(200), ctx.json({ userId: user.id }));
    } else {
      return res(ctx.status(401), ctx.json({ message: '로그인 실패' }))
    }
  }),
];