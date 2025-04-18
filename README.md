# Fitness Tracker

**Fitness Tracker** is a responsive, front-end fitness tracking website that lets users create accounts, log in, track workouts, view nutrition plans, and monitor progress. Built using **HTML**, **CSS (Bootstrap)**, and **JavaScript**, with REST API integration for backend user and favourites management.

---

## Features

- **User Auth**: Sign up / Log in using a dynamic navbar
- **Workout Selection**: Choose from 12 workouts and save favourites
- **Nutrition Plans**: Browse healthy recipes and save your favourites
- **Progress Tracking**:
  - Edit and update user profile
  - View BMI and key stats (highlighted by BMI range)
  - See favourite workouts and recipes
- **Favourites**: Add/remove recipes and workouts from favourites
- **Delete Account**: Allows secure account deletion
- **Responsive Design**: Fully optimised for desktop and mobile

---

## Tech Stack

| Technology             | Purpose                                           |
| ---------------------- | ------------------------------------------------- |
| **HTML5**              | Page structure                                    |
| **CSS3 / Bootstrap 5** | Responsive design & layout                        |
| **JavaScript (ES6)**   | Frontend logic, API interaction, DOM manipulation |
| **jQuery**             | DOM interaction                                   |
| **REST API**           | Handles user authentication and data              |

---

## Project Structure

```bash
📦 Prozhekt
│
├── html/
│   ├── homePage.html
│   ├── workout.html
│   ├── nutrition.html
│   ├── tracker.html
│   ├── logout.html
│   └── navbar.html
│
├── css/
│   ├── homePage.css
│   ├── workout.css
│   ├── nutrition.css
│   ├── tracker.css
│   ├── navbar.css
│   └── bootstrap.min.css
│
├── js/
│   ├── homePage.js
│   ├── nutrition.js
│   ├── tracker.js
│   ├── navbar.js
│   ├── favorites.js
│   └── jquery-3.7.1.min.js
│
├── assets/
│
├── images/
│
└── README.md
```

---

## Setup Instructions

1. **Clone the repo:**

   ```bash
   git clone https://github.com/MarkoPapathimiu/Prozhekt.git
   ```

2. **Open `homePage.html` in your browser** to start using the app.

> Make sure your backend API is running on `https://localhost:7084` as expected.

---

## Notes

- LocalStorage is used for maintaining login sessions
- API calls handle:
  - User creation, login, deletion
  - Favourite workout and recipe management
  - Profile updates

---

## License

FSHN © 2025 Prozhekt Team
