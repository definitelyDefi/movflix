# 🎬 Movflix - Your Ultimate Movie & TV Show Discovery Platform

Welcome to **MovFlix**, the ultimate destination for discovering movies and TV shows effortlessly! 🍿🎥 Dive into an extensive database of films, explore different genres, filter content, and keep track of your favorite shows.

---

## 🌟 Features
- 🔎 **Advanced Search & Filters** - Find movies and TV shows by genre, rating, year, and more.
- 🎭 **Category Switcher** - Explore trending, top-rated, upcoming, and now-playing movies.
- 📌 **Detailed Movie & TV Show Pages** - View cast, trailers, reviews, and additional information.
- 🖼 **Responsive Grid Layout** - Optimized for mobile, tablet, and desktop.
- 🎨 **Dark Mode UI** - Stylish and easy on the eyes.
- 🚀 **Fast & Smooth Navigation** - Built with React and optimized for performance.
- 🌍 Available in 4 Languages - English, Spanish, French and russian.

---

## 🛠️ Tech Stack
- **Frontend:** React, React Router, Swiper
- **Backend/API:** TMDB (The Movie Database API)
- **Deployment:** Netlify

---

## 📸 Screenshots
![MovFlix Homepage](https://via.placeholder.com/800x400)

---

## 🚀 Installation & Setup

### 🔹 Clone the Repository
```sh
 git clone https://github.com/yourusername/movflix.git
 cd movflix
```

### 🔹 Install Dependencies
```sh
 npm install
```

### 🔹 Add API Key
1. Get a free API keys from [TMDB](https://www.themoviedb.org/documentation/api). and [OMBD](https://www.omdbapi.com/)
2. Create a `.env` file in the root directory and add:
   ```env
   REACT_APP_TMDB_API_KEY=your_api_key_here
   REACT_APP_OMDB_API_KEY=your key here
   REACT_APP_CALLBACK_URL = http://your-custom-domain/movflix/auth_callback
   ```

### 🔹 Run the Development Server
```sh
 npm start
```

Your app should now be running at `http://localhost:3000/` 🚀

---

## 📦 Deployment
MovFlix is deployed on **Netlify**. To deploy your own version:
1. Run the build command:
   ```sh
   npm run build
   ```
2. Deploy the `build/` folder to Netlify.
3. Set environment variables on Netlify for API access.

---

## 🤝 Contributing
We welcome contributions! Feel free to fork the repo, submit a pull request, or report issues.

---

## 📜 License
This project is licensed under the MIT License.

---

## 🎬 Live Demo
👉 [MovFlix Live](https://movflixapp.netlify.app/movflix/)

Enjoy your movie discovery experience with **MovFlix**! 🍿🎉

