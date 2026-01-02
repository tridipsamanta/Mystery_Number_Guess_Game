# 🎮 Number Guessing Game (React + TypeScript)

An interactive **Number Guessing Game** built using **React, TypeScript**, and modern UI principles.  
The game provides an engaging gaming experience with **dynamic difficulty**, **emotional feedback**, **sound alerts**, and **win/lose animations**.

---

## 📌 Project Overview

In this game, the system generates a random number, and the user gets **10 chances** to guess it correctly.

As the chances decrease:
- The UI becomes more intense
- Irritating and dramatic messages appear
- Alert sounds change dynamically
- The final chance creates maximum pressure 😈

Winning or losing triggers **special screens with sound and animation effects**.

---

## 🚀 Features

### 🎯 Core Gameplay
- Random number generation
- 10 total attempts
- Difficulty modes:
  - Easy
  - Medium
  - Hard
- Guess validation (only numbers allowed)
- Guess history tracking

---

### 😈 Emotional Feedback System
- Friendly messages in early attempts
- Irritating messages after **7 attempts**
- Aggressive warnings in last chances
- Extreme dramatic messages on the **final attempt**

---

### 🔊 Sound System
- Different alert sounds based on remaining chances
- Warning sounds increase with pressure
- Victory sound on win 🎉
- Failure sound on loss 💀
- Sound ON / OFF toggle

---

### 🏆 Win & Lose Screens
- **Victory Screen**
  - Confetti
  - Trophy animation
  - Winning sound
- **Game Over Screen**
  - Dark theme
  - Failure message
  - Retry option

---

### 🎨 UI & UX
- Gaming-style dark theme
- Smooth animations
- Responsive layout (mobile + desktop)
- Clean component-based architecture

---

## 🛠️ Tech Stack

- **Frontend:** React
- **Language:** TypeScript
- **Styling:** CSS / Tailwind CSS (optional)
- **State Management:** React Hooks
- **Sound:** HTML5 Audio API
- **Build Tool:** Vite / Create React App

---


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/number-guessing-game.git
cd number-guessing-game

npm install

npm run dev

