# 🚀 StudBud AI

> An AI-powered Chrome Extension that integrates directly with LeetCode to provide contextual hints, complexity analysis, and guided problem-solving assistance — without revealing full solutions.

StudBud AI enhances your problem-solving process by understanding the current LeetCode question and maintaining conversational context, helping you think better instead of just giving answers.

---

# ✨ Features

* 🧠 Context-aware AI assistance
* 💡 Progressive hints instead of direct solutions
* ⏱️ Time & space complexity analysis
* 🔍 Edge case identification
* 🔄 Maintains conversation state per problem
* 🧩 Seamless Chrome Extension side panel integration

---

# 📦 Installation Guide

## 1️⃣ Prerequisites

Make sure you have **Node.js** installed:

👉 https://nodejs.org/

---

## 2️⃣ Clone & Install

```bash
git clone https://github.com/your-username/studbud-ai.git
cd studbud-ai
npm install
```

---

## 3️⃣ Environment Setup

Create a `.env` file in the root directory and add:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 4️⃣ Build & Load the Extension

Run the build command:

```bash
npm run build
```

This generates the `dist/` folder.

Now load it into Chrome:

1. Open: `chrome://extensions/`
2. Enable **Developer Mode** (top-right corner)
3. Click **Load Unpacked**
4. Select the generated `dist/` folder

---

# 🧠 Technical Challenges & Solutions

## 1️⃣ Synchronizing AI Context

**Challenge:**
The AI was initially stateless — it forgot the problem details and previous hints after the first interaction.

**Solution:**
Implemented custom state-mapping logic inside the React `handleSend` function.
This combines:

* Scraped problem context
* Current message history

into a single structured prompt for every API call.

---

## 2️⃣ Overcoming Dynamic DOM Scraping

**Challenge:**
LeetCode is a Single Page Application (SPA) with frequently changing CSS classes (e.g., `.elfjS`).

**Solution:**
Switched to using the more stable:

```html
[data-track-load="description_content"]
```

attribute selector used internally by LeetCode analytics.
This ensures scraping stability across UI updates.

---

## 3️⃣ Managing Chrome Extension State

**Challenge:**
Passing data between:

* Content Script (LeetCode page)
* Side Panel (React app)

without losing data during refresh.

**Solution:**
Used:

```js
chrome.storage.local
```

as a communication bridge.

* Content Script → saves problem state
* React Side Panel → listens using `chrome.storage.onChanged`

---

# 📖 Usage

1. Open any problem on LeetCode
2. Click the **"Help"** button (bottom-right)
3. Use StudBud Assistant to:

   * Ask for hints
   * Get time complexity analysis
   * Discuss edge cases
   * Understand logic improvements

---

# 🛡️ License

Distributed under the **MIT License**.
See the `LICENSE` file for more information.
