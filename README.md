# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

```
triptalk
├─ .env
├─ .eslintrc.json
├─ .prettierrc.json
├─ .vscode
│  └─ settings.json
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ img
│  │  ├─ addimg.jpg
│  │  ├─ Boast.jpg
│  │  ├─ Carousel.png
│  │  ├─ footer_logo.png
│  │  ├─ logo.png
│  │  ├─ Travelimg1.jpg
│  │  ├─ Travelimg10.jpg
│  │  ├─ Travelimg11.jpg
│  │  ├─ Travelimg12.jpg
│  │  ├─ Travelimg13.jpg
│  │  ├─ Travelimg14.jpg
│  │  ├─ Travelimg15.jpg
│  │  ├─ Travelimg16.jpg
│  │  ├─ Travelimg17.jpg
│  │  ├─ Travelimg18.jpg
│  │  ├─ Travelimg19.jpg
│  │  ├─ Travelimg2.jpg
│  │  ├─ Travelimg20.jpg
│  │  ├─ Travelimg21.jpg
│  │  ├─ Travelimg22.jpg
│  │  ├─ Travelimg23.jpg
│  │  ├─ Travelimg24.jpg
│  │  ├─ Travelimg25.jpg
│  │  ├─ Travelimg26.jpg
│  │  ├─ Travelimg27.jpg
│  │  ├─ Travelimg28.jpg
│  │  ├─ Travelimg29.jpg
│  │  ├─ Travelimg3.jpg
│  │  ├─ Travelimg30.jpg
│  │  ├─ Travelimg31.jpg
│  │  ├─ Travelimg32.jpg
│  │  ├─ Travelimg33.jpg
│  │  ├─ Travelimg34.jpg
│  │  ├─ Travelimg35.jpg
│  │  ├─ Travelimg36.jpg
│  │  ├─ Travelimg37.jpg
│  │  ├─ Travelimg38.jpg
│  │  ├─ Travelimg39.jpg
│  │  ├─ Travelimg4.jpg
│  │  ├─ Travelimg40.jpg
│  │  ├─ Travelimg5.jpg
│  │  ├─ Travelimg6.jpg
│  │  ├─ Travelimg7.jpg
│  │  ├─ Travelimg8.jpg
│  │  └─ Travelimg9.jpg
│  └─ mockServiceWorker.js
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.tsx
│  ├─ color
│  │  └─ color.ts
│  ├─ component
│  │  ├─ AddressSearch.tsx
│  │  ├─ Carousel
│  │  │  ├─ LikeCarousel.tsx
│  │  │  ├─ MainCarousel.tsx
│  │  │  ├─ PostImgs.tsx
│  │  │  └─ TravelCarousel.tsx
│  │  ├─ DatePicker
│  │  │  ├─  FullSchedule.tsx
│  │  │  ├─ edit.css
│  │  │  └─ ExcludeTimes.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Header.tsx
│  │  ├─ ImgUpload
│  │  │  ├─ EditProfile.tsx
│  │  │  └─ ImgEdit.tsx
│  │  ├─ MainLayout.tsx
│  │  ├─ PostBox
│  │  │  ├─ PostBox.tsx
│  │  │  └─ ViewComments.tsx
│  │  ├─ ScheduleMap.tsx
│  │  ├─ Search
│  │  │  ├─ Search.tsx
│  │  │  ├─ SearchBody.tsx
│  │  │  ├─ SearchHead.tsx
│  │  │  ├─ SearchPopular.tsx
│  │  │  └─ SearchRecent.tsx
│  │  ├─ Sechedule
│  │  │  └─ ItemCard.tsx
│  │  ├─ SecheduleSelect
│  │  │  └─ SecheduleSelect.tsx
│  │  ├─ SocialLogin
│  │  │  ├─ AuthHandler.tsx
│  │  │  ├─ Google.tsx
│  │  │  ├─ GoogleLogin.tsx
│  │  │  └─ KakaoLogin.tsx
│  │  └─ TopButton
│  │     └─ TopButton.tsx
│  ├─ fonts
│  │  ├─ GmarketSansTTFBold.ttf
│  │  ├─ GmarketSansTTFLight.ttf
│  │  └─ GmarketSansTTFMedium.ttf
│  ├─ index.css
│  ├─ json
│  │  └─ travelsData.json
│  ├─ main.tsx
│  ├─ mocks
│  │  ├─ infoEidtHandlers.ts
│  │  ├─ loginHandlers.ts
│  │  ├─ postsHandlers.ts
│  │  ├─ savedHandlers.ts
│  │  ├─ ScheduleHandlers.ts
│  │  ├─ setup.ts
│  │  └─ travelHandlers.ts
│  ├─ page
│  │  ├─ DetailPage
│  │  │  └─ SecheduleDetail.tsx
│  │  ├─ EditPage
│  │  │  ├─ AddSchedule.tsx
│  │  │  └─ EditSchedule.tsx
│  │  ├─ LoginPage
│  │  │  ├─ LoginContainer.tsx
│  │  │  ├─ LoginForm.tsx
│  │  │  └─ SignupForm.tsx
│  │  ├─ MainPage
│  │  │  └─ Main.tsx
│  │  ├─ MyPage
│  │  │  ├─ AnotherPlanner.tsx
│  │  │  ├─ EditInfo
│  │  │  │  ├─ EditForm.tsx
│  │  │  │  ├─ EditIntroduct.tsx
│  │  │  │  └─ EditMyInfo.tsx
│  │  │  ├─ MyInfo.tsx
│  │  │  ├─ MyInfoPost.tsx
│  │  │  ├─ MyInfoSaved.tsx
│  │  │  ├─ MyPost.tsx
│  │  │  └─ MySaved.tsx
│  │  ├─ ReviewMap
│  │  │  └─ LookMap.tsx
│  │  ├─ SchedulePage
│  │  │  └─ Schedule.tsx
│  │  ├─ SearchPage.tsx
│  │  └─ TravelPage
│  │     ├─ CarouselBox
│  │     │  └─ SwiperImg.tsx
│  │     ├─ PopUp
│  │     │  ├─ DetailPopUp.tsx
│  │     │  ├─ OrderButton.tsx
│  │     │  └─ RegionButton.tsx
│  │     └─ Travel.tsx
│  ├─ regex
│  │  └─ Regex.ts
│  ├─ store
│  │  ├─ editMyInfoSlice.ts
│  │  ├─ mapAddress.ts
│  │  ├─ placeSlice.ts
│  │  ├─ store.ts
│  │  ├─ tokenSlice.ts
│  │  └─ userSlice.ts
│  ├─ utils
│  │  ├─ formatDate.ts
│  │  └─ Rest.ts
│  └─ vite-env.d.ts
├─ travelsData.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ vercel.json
└─ vite.config.ts

```
