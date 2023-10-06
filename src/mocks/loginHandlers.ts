import { rest } from 'msw';

interface LoginRequestBody {
  email: string;
  password: string
}

const userData = [
  {
    imgUrl: '',
    nickname : '제로',
    email: 'user1@naver.com',
    password: 'Password123'
  },
  {
    imgUrl: '',
    nickname : '콜라',
    email: 'user2@naver.com',
    password: 'Password456'
  },
  {
    imgUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    nickname : '제로사이다',
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
      const userInfo = {
        imageUrl : user.imgUrl,
        email: user.email,
        nickName: user.nickname,
        password: user.password,
      }

      localStorage.setItem('userInfo', JSON.stringify(userInfo))

      return res(ctx.status(200), ctx.json({ userId: user.email }));
    } else {
      return res(ctx.status(401), ctx.json({ message: '로그인 실패' }))
    }
  }),
];