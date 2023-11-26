"# thuc-tap-2023 - Thực tập nghề nghệp"

"Tutorial from:  [MERN Stack Project...](https://youtu.be/VAaUy_Moivw?si=Vd7tDAyCJQRd4-Pg)"

# 1. Install React js and Tailwind CSS and create the first template

```
npm create vite@latest client
```
## step by step (after run above line)
- React
- JavaScript + SWC

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
- src/App.css
- src/assets/react.svg
- public/vite.svg

### Run project
```
npm run dev
```
- ➜ Local: http://localhost:5173/
- ➜ Network: use --host to expose


--- 
--- 

## List shortcut in React
| Shortcut | Description |
| --- | --- |
| rfc | React Function Component |
| git diff | Show file differences that haven't been staged |

## Extentions VSCode
- ES7 React
- Console Ninja
- Prettier
- Tailwind CSS IntelliSense

## Documentation
[Vite - React](https://www.npmjs.com/package/create-vite)

[Tailwind CSS with Vite](https://tailwindcss.com/docs/guides/vite)
