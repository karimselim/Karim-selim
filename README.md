# 🔥 Karim-selim — Cinematic Developer Portfolio

A visually rich, animation-driven developer portfolio built with **Next.js**, **GSAP**, **Framer Motion**, and **Styled Components**.  
This project is focused on high-end frontend development, bringing together advanced motion, interactivity, and performance optimization.

---

## 🚀 Tech Stack

- **Next.js v12**
- **React v17**
- **GSAP** — scroll-based & timeline animations
- **Framer Motion** — UI transitions & motion
- **Styled Components** — scoped component styling
- **Hover Effect.js** — image distortion/hover effects
- **React Intersection Observer** — triggers on screen entry

---

## 📁 Project Structure
karim-selim/
├── components/ # Reusable UI and animation components
│ ├── AnimateOnScreen.jsx
│ ├── AppBar.jsx
│ ├── CanvasEraser.jsx
│ ├── HorizontalSections/
│ ├── Menu/
│ ├── SocialMedia.jsx
│ ├── TextReveal.jsx
│ └── ...
├── context/ # React context for global state
├── hooks/ # Custom React hooks
├── pages/ # Next.js routing pages
├── public/ # Static assets (images, icons, etc.)
├── utils/constants/ # Shared constants or config
├── styles/ # Global styles if needed
├── .babelrc
├── .eslintrc.js
├── .prettierrc
└── ...

## 💡 Key Features

- 🎬 **Cinematic entrance animations** using GSAP
- 🎥 **Scroll-based transitions** and hover effects
- 🧠 **Text reveal animations** and custom interaction layers
- 📱 **Responsive mobile experience**
- ⚙️ **Performance-aware**, optimized for heavy animation

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/karimselim/Phoenix-Nation.git
cd Phoenix-Nation
```

### 2. Install Dependencies

```bash

npm i
```

### 3. Run The Server

```bash

npm run dev

( If you face a Node.js error, this project use:- )
NODE_OPTIONS=--openssl-legacy-provider

```

### ✅ Linting & Formatting
This project uses:

```

ESLint for code linting

Prettier for consistent formatting

Husky and lint-staged to auto-fix staged files on commit
```
### 📱 Performance Tips (Used in Project)
✨ Used will-change only on key elements
✨ All animations use transform / opacity (GPU accelerated)
✨ ScrollTrigger / requestAnimationFrame usage optimized
✨ Disabled some 3D/hover effects on mobile devices
✨ Lazy-loaded heavy components and assets
✨ Compressed textures and images for faster loading

