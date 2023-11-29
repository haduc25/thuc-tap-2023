"# thuc-tap-2023 - Thực tập nghề nghệp"

"Tutorial from: [MERN Stack Project...](https://youtu.be/VAaUy_Moivw?si=Vd7tDAyCJQRd4-Pg)"

"Original repo from: [sahandghavidel/mern-estate](https://github.com/sahandghavidel/mern-estate)"

#### \*[Terminal] - Go to main directory fast from root folder (D:\Thuc Tap 2023):

```
cd "D:\Thuc Tap 2023\SleepEZ\rental-website\client"
```

```
cd "D:\Thuc Tap 2023\SleepEZ\rental-website\api"
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
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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

-   SleepEZ/rental-website/api/index.js

```
cd "D:\Thuc Tap 2023\SleepEZ\rental-website"
```

### Tạo ra file `package.json` (SleepEZ/rental-website/)

```
npm init -y
```

### Edit add `"type": "module",` for `package.json` (SleepEZ/rental-website/)

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

### Edit script when installed `nodemon` for `package.json` (SleepEZ/rental-website/)

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

### Install Express (SleepEZ/rental-website)

```
npm i express
```

### Install Nodemon (SleepEZ/rental-website)

```
npm i nodemon
```

### Run nodejs (SleepEZ/rental-website)

#### Before (not install nodemon)

```
node api/index.js
```

#### After (installed nodemon)

```
npm run dev
```

# 5. Connect to database

### Install Mongoose (SleepEZ/rental-website)

```
npm i mongoose
```

### Settings MongoDB on website (cloud.mongodb.com)

[Tutorial (skip video to) - 57:20](https://youtu.be/VAaUy_Moivw?si=K9HAB7RgOCmQiBC7)

### Code for connect (SleepEZ/rental-website/api/index.js & SleepEZ/rental-website/.env)

#### Template

```
mongodb+srv://haduc25:<password>@sleep-ez.xlzmz2i.mongodb.net/?retryWrites=true&w=majority
```

#### Deploy

```
mongodb+srv://haduc25:abcd1234@sleep-ez.xlzmz2i.mongodb.net/sleep-ez?retryWrites=true&w=majority
```

### Create a file for setting MongoDB

-   SleepEZ/rental-website/.env

### Install Dotenv for `.env` file (SleepEZ/rental-website/.env)

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

---

---

## List shortcut in React

| Shortcut | Description                                    |
| -------- | ---------------------------------------------- |
| rfc      | React Function Component                       |
| git diff | Show file differences that haven't been staged |

## Extentions VSCode

-   ES7 React
-   Console Ninja
-   Prettier
-   Tailwind CSS IntelliSense

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
