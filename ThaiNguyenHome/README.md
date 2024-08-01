"# thuc-tap-2023 - Thực tập nghề nghệp (STA)"

# Project: Thái Nguyên Home (SleepEZ version 2.0)

#### PREVIEW WEBSITE

<p align="center">
  <img src="assets/images/image4.png" alt="Giao diện website" width="500"/>
</p>
<p align="center">Giao diện website</p>


<p align="center">
  <img src="assets/images/image15.png" alt="Giao diện xem chi tiết" width="500"/>
</p>
<p align="center">Giao diện xem chi tiết</p>


<p align="center">
  <img src="assets/images/image16.png" alt="Giao diện trang quản trị" width="500"/>
</p>
<p align="center">Giao diện trang quản trị</p>


<p align="center">
  <img src="assets/images/image14.png" alt="Giao diện trang tìm kiếm" width="500"/>
</p>
<p align="center">Giao diện trang tìm kiếm</p>

#### CONFIG START

1. go to `...\ThaiNguyenHome\rental-website\client`

```
npm i
```

2. go to `...\ThaiNguyenHome\rental-website\`

```
npm i
```

3. run 2 console

```
npm run dev
```

#### \*[Terminal] - Go to main directory fast from root folder (D:\Thuc Tap 2023):

```

cd "D:\Thuc Tap 2023\ThaiNguyenHome\rental-website\client"

```

```

cd "D:\Thuc Tap 2023\ThaiNguyenHome\rental-website\api"

```

# 1. Install React js and Tailwind CSS and create the first template

```

npm create vite@latest client

```

## step by step (after run above line)

-   React
-   JavaScript + SWC

### Intall Project

```

cd client
npm i

```

### Intall Tailwind CSS

```

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

```

### Configure Tailwind CSS (tailwind.config.js)

```

/** @type {import('tailwindcss').Config} \*/
export default {
content: [
"./index.html",
"./src/**/\*.{js,ts,jsx,tsx}",
],
theme: {
extend: {},
},
plugins: [],
}

```

### Add the Tailwind directives to your CSS (src/index.css)

```

@tailwind base;
@tailwind components;
@tailwind utilities;

```

### Delete some files - when using Tailwind CSS

-   src/App.css
-   src/assets/react.svg
-   public/vite.svg

### Run project

```

npm run dev

```

-   ➜ Local: http://localhost:5173/
-   ➜ Network: use --host to expose

# 2. Create pages and routes

### Install React Router DOM

```

npm i react-router-dom

```

# 3. Create Header component

### Install React Icons

```

npm i react-icons

```

# 4. Create and run the server

### Create a new folder & file

-   ThaiNguyenHome/rental-website/api/index.js

```

cd "D:\Thuc Tap 2023\ThaiNguyenHome\rental-website"

```

### Tạo ra file `package.json` (ThaiNguyenHome/rental-website/)

```

npm init -y

```

### Edit add `"type": "module",` for `package.json` (ThaiNguyenHome/rental-website/)

#### Before

```

...
"main": "index.js",
"scripts": {
...
},
...

```

#### After

```

...
"main": "index.js",
"type": "module",
"scripts": {
...
},
...

```

### Edit script when installed `nodemon` for `package.json` (ThaiNguyenHome/rental-website/)

#### Before

```

...
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
...

```

#### After

```

...
"scripts": {
"dev": "nodemon api/index.js",
"start": "node api/index.js"
},
...

```

### Install Express (ThaiNguyenHome/rental-website)

```

npm i express

```

### Install Nodemon (ThaiNguyenHome/rental-website)

```

npm i nodemon

```

### Run nodejs (ThaiNguyenHome/rental-website)

#### Before (not install nodemon)

```

node api/index.js

```

#### After (installed nodemon)

```

npm run dev

```

# 5. Connect to database

### Install Mongoose (ThaiNguyenHome/rental-website)

```

npm i mongoose

```

### Settings MongoDB on website (cloud.mongodb.com)

[Tutorial (skip video to) - 57:20](https://youtu.be/VAaUy_Moivw?si=K9HAB7RgOCmQiBC7)

### Code for connect (ThaiNguyenHome/rental-website/api/index.js & ThaiNguyenHome/rental-website/.env)

#### Template

```

mongodb+srv://haduc25:<password>@sleep-ez.xlzmz2i.mongodb.net/?retryWrites=true&w=majority

```

#### Deploy

```

mongodb+srv://haduc25:abcd1234@sleep-ez.xlzmz2i.mongodb.net/sleep-ez?retryWrites=true&w=majority

```

### Create a file for setting MongoDB

-   ThaiNguyenHome/rental-website/.env

### Install Dotenv for `.env` file (ThaiNguyenHome/rental-website/.env)

```

npm i dotenv

```

# 6. Create user model

# 7. Create a test api route

### Settings Insomnia API on website (insomnia.rest)

[Tutorial (skip video to) - 01:26:20](https://youtu.be/VAaUy_Moivw?si=K9HAB7RgOCmQiBC7)

# 8. Create sign up API route

#### Mã hóa mật khẩu

```

npm i bcryptjs

```

# 9. Create a middleware and a function to handle possible errors

### Create `error.js`

-   api/utils/error.js

# 10. Complete sign up page Ul

# 11. Complete sign up page functionality

### Config vite file (add proxy for `localhost:3000`) - (client/vite.config.js)

#### Before

```

export default defineConfig({
plugins: [react()],
})

```

#### After

```

export default defineConfig({
server: {
proxy: {
'/api': {
target: 'http://localhost:3000',
secure: false,
},
},
},
plugins: [react()],
});

```

# 12. Create sign in API route

### Install JSON Web Tokens

```

npm i jsonwebtoken

```

# 13. Complete sign in page functionality

# 14. Add redux toolkit

### Install Redux Toolkit and React-Redux (ThaiNguyenHome\rental-website\client)

```

npm install @reduxjs/toolkit react-redux

```

### Config Redux create some files

-   client/src/redux/store.js
-   client/src/redux/user/userSlice.js

### Provide the Redux Store to React

[Provide the Redux Store to React (client/src/main.jsx)](https://redux-toolkit.js.org/tutorials/quick-start#provide-the-redux-store-to-react)

### Create a Redux State Slice

[Create a Redux State Slice (client/src/redux/user/userSlice.js)](https://redux-toolkit.js.org/tutorials/quick-start#create-a-redux-state-slice)

### Add Slice Reducers to the Store

[Add Slice Reducers to the Store (client/src/redux/store.js)](https://redux-toolkit.js.org/tutorials/quick-start#add-slice-reducers-to-the-store)

### Use Redux State and Actions in React Components

[Use Redux State and Actions in React Components (client/src/redux/user/SignIn.jsx)](https://redux-toolkit.js.org/tutorials/quick-start#use-redux-state-and-actions-in-react-components)

# 15. Add redux persist

### Install Redux Persist (ThaiNguyenHome\rental-website\client)

```

npm i redux-persist

```

### Config & using (ThaiNguyenHome\rental-website\client\src\redux\store.js)

### Add `PersistGate` to (ThaiNguyenHome\rental-website\client\src\main.jsx)

# 16. Add Google OAuth functionality

### Config Google OAuth create some files

-   ThaiNguyenHome\rental-website\client\src\components\OAuth.jsx

-   ThaiNguyenHome\rental-website\client\src\firebase.js

-   ThaiNguyenHome\rental-website\client\.env

### Config Google Firebase

[Tutorial (skip video to) - 03:04:15](https://youtu.be/VAaUy_Moivw?si=K9HAB7RgOCmQiBC7)

# 17. Update the header and make the profile page private

### Config page private create some files

-   ThaiNguyenHome\rental-website\client\src\components\PrivateRoute.jsx

# 18. Complete profile page Ul

# 19. Complete image upload functionality

### Config store in firebase (save avatar image)

[Tutorial (skip video to) - 03:47:15](https://youtu.be/VAaUy_Moivw?si=K9HAB7RgOCmQiBC7)

#### firebase storage

# 20. Create update user API route

```

service firebase.storage {
match /b/{bucket}/o {
match /{allPaths=\*_} {
allow read;
allow write: if request.resource.size < 2 _ 1024 _ 1024 &&
request.resource.contentType.matches('image/._');
}
}
}

```

### Config API create some files

-   ThaiNguyenHome\rental-website\api\utils\veriUser.js

### Install Cookie Parser - (ThaiNguyenHome\rental-website\)

```

npm i cookie-parser

```

# 21. Complete update user functionality

# 22. Add delete user functionality

# 23. Add sign out user functionality

# 24. Add create listing API route

### Config listing API create some files

-   ThaiNguyenHome\rental-website\api\route\listing.router.js
-   ThaiNguyenHome\rental-website\api\controllers\listing.controller.js
-   ThaiNguyenHome\rental-website\api\models\listing.model.js

# 25. Complete create listing page Ul

### Config listing page Ul create some files

-   ThaiNguyenHome\rental-website\client\src\pages\CreateListing.jsx

# 26. Complete upload listing images functionality

# 27. Complete create listing page functionality

# 28. Create get user listings API route

# 29. Complete show user listings functionality

#### Thuộc tính scss trong `tailwind`

```

truncate

```

-   khi text quá dài sẽ hiển thị `...`

# 30. Complete delete user listing functionality

# 31. Create update listing API route

# 32. Complete update listing functionality

### Config update listing page Ul create some files

-   ThaiNguyenHome\rental-website\client\src\pages\CreateListing.jsx

# 33. Add image slider to the listing page

### Config listing page Ul create some files

-   ThaiNguyenHome\rental-website\client\src\pages\Listing.jsx

### Install Swiper (its slider) - (ThaiNguyenHome\rental-website\client)

```

npm i swiper

```

# 34. Complete listing page

# 35. Add contact landlord functionality to the listing page

### Config contact landlord create some files

-   ThaiNguyenHome\rental-website\client\src\components\Contact.jsx

# 36. Create search API route

-   Search: tìm từ đồng nghĩa bằng `#regex`

```

...
name: { $regex: searchTerm, $options: 'i' },
...

```

# 37. Complete header search form functionality

-   sử dụng `URLSearchParams(window.location.search)` có thể tìm kiếm bằng thanh `url` luôn

# 38. Create search page Ul

### Config search page Ul create some files

-   ThaiNguyenHome\rental-website\client\src\pages\Search.jsx

# 39. Add onChange and onSubmit functionality to the search page

# 40. Create the listing item component and show listings

### Config search page Ul create some files

-   ThaiNguyenHome\rental-website\client\src\components\ListingItem.jsx

### Install TailWind CSS - Line-clamp (ThaiNguyenHome\rental-website\)

```

npm install -D @tailwindcss/line-clamp

```

### Install TailWind CSS - Line-clamp Config & add the plugin to `tailwind.config.js` file (ThaiNguyenHome\rental-website\client)

#### Before

```

...
plugins: [],
...

```

#### After

```

...
plugins: [require('@tailwindcss/line-clamp')],
...

```

# 41. Add show more listings functionality

# 42. Complete home page

# 43. Complete about page

//////////////////////////////////////////////////////////////

## List shortcut in React

| Shortcut        | Description                                       |
| --------------- | ------------------------------------------------- |
| rfc             | React Function Component                          |
| MB1 + Alt       | Dùng để sửa nhiều dòng cùng 1 lúc                 |
| Shift + Alt + o | Loại bỏ các thư viện mà không dùng đến trong file |

## Extentions VSCode

-   ES7 React
-   Console Ninja
-   Prettier
-   Tailwind CSS IntelliSense

## Extentions Browser

-   [Redux DevTools - \*Required restart browser](https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

## Documentation

[Vite - React](https://www.npmjs.com/package/create-vite)

[Tailwind CSS with Vite](https://tailwindcss.com/docs/guides/vite)

[React Router DOM](https://www.npmjs.com/package/react-router-dom)

<!-- Icon -->

[React Icons](https://www.npmjs.com/package/react-icons)

[Express](https://www.npmjs.com/package/express?activeTab=readme)

<!-- Tự động refresh khi code thay đổi -->

[Nodemon](https://www.npmjs.com/package/nodemon?activeTab=readme)

<!-- Database -->

[Mongoose](https://www.npmjs.com/package/mongoose)

<!-- Xử lý file .env -->

[Dotenv](https://www.npmjs.com/package/dotenv)

<!-- Mã hóa mật khẩu -->

[Bcryptjs](https://www.npmjs.com/package/bcryptjs)

<!-- JSON Web Tokens -->

[Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

[Redux Toolkit and React-Redux](https://redux-toolkit.js.org/tutorials/quick-start#install-redux-toolkit-and-react-redux)

[Redux Persist](https://www.npmjs.com/package/redux-persist)

[Cookie Parser](https://www.npmjs.com/package/cookie-parser)

<!-- Thanh trượt slider cho navbar -->

[Swiper - Slider](https://www.npmjs.com/package/swiper)

[TailWind CSS - Line-clamp](https://github.com/tailwindlabs/tailwindcss-line-clamp)

[Primereact](https://primereact.org/installation/)

### Install more

#### Dialog ("D:\Thuc Tap 2023\ThaiNguyenHome\rental-website\")

```
npm install primereact
```

<!-- Lấy API Google Map -->

[Google Map - Lấy Embed](https://www.maps.ie/create-google-map/)

#### install (../client/)

```
npm install react-chartjs-2 chart.js
```
