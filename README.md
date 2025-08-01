# 🧑‍🍳 EasyChef – Full-Stack Recipe Management Platform

A full-stack recipe sharing platform where users can create, customize, and explore recipes by diet, cuisine, and ingredients — built using React, Django REST Framework, and SQLite.

> 🔐 Includes secure authentication, token-based API access, and dynamic ingredient scaling
> 🔄 Supports interactive recipe creation, editable shopping lists, and real-time user interaction features
> ✅ Delivered as a fully functional end-to-end system across three major development phases

---

## 🚀 Features

* 🍽️ **Dynamic Recipe Builder**: Create custom recipes with step-by-step instructions, ingredients, images, and videos
* 🧮 **Smart Serving Adjustments**: Real-time ingredient scaling when changing serving sizes
* 💬 **Social Features**: Comment, rate, and favorite recipes — track your interactions and discover top-rated meals
* 🛒 **Shopping Cart Generator**: Aggregate ingredients across recipes and auto-compute combined totals
* 🔐 **Secure Token Auth**: All critical endpoints protected with token-based user authentication
* 🧠 **Autocomplete Search & Filtering**: Search by name, cuisine, or ingredient with support for filters and sorting

---

## 🧱 Tech Stack

| Language                     | Libraries & Frameworks                  | Infrastructure                      |
| ---------------------------- | --------------------------------------- | ----------------------------------- |
| JavaScript, Python, HTML/CSS, Bash | React, Django REST Framework, Bootstrap | SQLite, Ubuntu, Postman |

---

## 🔍 Project Overview

EasyChef was built over three progressive development phases:

1. **Phase 1 – UI/UX Demo**:
   HTML/CSS static prototype with full page navigation and mock content using Bootstrap.
   Focus on user experience, layout design, and semantic HTML structure.

2. **Phase 2 – Backend API**:
   Implemented all core features via Django REST Framework with a custom user model and full token-based auth.
   Included rating system, comment support, autocomplete, and paginated search.

3. **Phase 3 – React Frontend Integration**:
   Built a complete SPA using React Router, with dynamic frontend-backend interactions and full CRUD capabilities.
   Custom hooks manage auth tokens, and all pages support in-place updates and navigation flow.

---

## 📊 Backend Highlights

| Feature                 | Implementation Details                                            |
| ----------------------- | ----------------------------------------------------------------- |
| 🔐 Token Auth           | DRF Token Authentication with protected endpoints                 |
| 🧩 Custom User Model    | Extended default User to include avatar, phone, etc.              |
| 📋 CRUD API Design      | Recipes, Ingredients, Steps, Comments fully covered               |
| 🔄 Nested Serialization | RecipeSerializer handles embedded lists for ingredients/steps     |
| 📈 Rating Logic         | JSON fields to track per-user ratings and auto-calculate averages |
| 📌 Favorite Logic       | Toggleable mark/unmark with aggregation of total likes            |
| 🛒 Session-Based Cart   | Combined ingredient quantities across multiple recipes            |

---

## ⚛️ Frontend Highlights

| Feature                    | Implementation Details                                            |
| -------------------------- | ----------------------------------------------------------------- |
| 🧠 React SPA               | Built with React Router for dynamic routing and protected pages   |
| 📥 Modular Forms           | Multi-step recipe creation flow with ingredient and step handling |
| 🔒 Auth Integration        | Custom `useToken` hook and global config usage                    |
| 📤 API Chaining            | Sequential creation of steps, ingredients, and final recipe       |
| ✅ UX Flows                 | Login, Signup, Success pages, and data-driven rendering           |
| 🧪 Local State Management  | `useState` and class-based components for controlled logic        |
| 🔗 Config-Driven Endpoints | Used `global.config` for flexible API and auth integration        |

---

## 🧠 What I Learned

* Gained hands-on experience with full-stack application delivery and version control in a team setting
* Learned to manage state across asynchronous frontend/backend operations
* Designed clean REST APIs and learned nested serialization strategies in Django
* Applied best practices for UX flows, token-based security, and responsive UI design
* Gained fluency in debugging cross-stack issues, from React components to backend API logic

---

## 🏁 How to Run Locally

### 🧩 Prerequisites

* Python 3.10+
* Node.js 18+
* Ubuntu 20.04 (recommended)
* `pip`, `virtualenv`, and `npm` installed

### ⚙️ Setup and Launch

```bash
# clone the repo
git clone https://github.com/Dam-Sam/EasyChef.git
cd EasyChef

# setup environment
./startup.sh    # creates virtualenv, installs packages, applies migrations, runs npm install

# run backend and frontend servers
./run.sh
```

> *Tested on clean Ubuntu environment with default dependencies available. Uses SQLlite and static seed data.*

---

## 🤝 Collaboration & Credits

This was a team project developed for **CSC309: Web Development** at the **University of Toronto**.

* 🧑‍💻 Team of 3
* 👨‍🏫 Mentored and evaluated via TA interviews
* ✅ All contributions tracked in GitLab using commits and code ownership
* 🔁 Agile workflow with iterative phases, check-ins, and peer design reviews
