# School Project - EasyChef
This was a team project developed for **CSC309: Web Development** at the **University of Toronto**

## 🔧 Full-Stack / General Project Highlights

* Developed a full-stack recipe-sharing web application with secure authentication, dynamic ingredient scaling, and interactive social features
* Delivered a complete three-phase system: static UI mockup (HTML/CSS), Django REST API backend, and integrated React frontend SPA
* Managed full development lifecycle using GitLab, including structured commits, team collaboration, and phase-based versioning
* Coordinated in a 3-person Agile team, incorporating TA feedback, iterative improvements, and live demo evaluations

---

## ⚛️ Front-End (React) Contributions

* Built a single-page application using **React** and **React Router**, with protected routes and token-based authentication
* Designed multi-step forms for recipe creation using modular React components and dynamic form state management
* Integrated React with backend APIs for real-time recipe creation, user authentication, and comment/rating functionality
* Implemented conditional routing and navigation flows (e.g., redirect after login, creation success pages)
* Developed frontend validation, error handling, and asynchronous state updates for smooth user experience
* Used custom React hooks to manage authentication tokens and persist session state via `localStorage`

---

## 🔙 Back-End (Django REST Framework) Contributions

* Engineered RESTful APIs using **Django REST Framework**, covering recipes, users, ingredients, steps, comments, ratings, and favorites
* Designed a **custom Django user model** with fields for avatar, phone number, and profile info, integrated with token authentication
* Implemented secure token-based authentication and role-based access control for protected endpoints
* Serialized nested data models using custom DRF serializers with both write-optimized and read-optimized structures
* Built endpoints for rating, marking favorites, dynamic serving size adjustment, and shopping list aggregation
* Developed and documented API collection using **Postman**, including pre-filled payloads, headers, and token-based testing flows
* Configured pagination, autocomplete, and advanced filtering on list endpoints to support scalable UI queries

---

## 🛠️ Backend Logic & Features

* Built logic for scaling ingredient quantities dynamically based on serving size changes, using string parsing and ratio math
* Created endpoints to duplicate existing recipes and their relationships (ingredients, steps) for rapid reuse
* Used session storage to implement a user shopping cart that aggregates ingredient quantities across multiple recipes
* Integrated business logic for personalized views: user’s recipes, favorites, and interaction history
* Applied validation and access checks (e.g., ownership enforcement on edit/delete) to ensure data integrity and security

---

## 🧪 DevOps / Setup / Tooling

* Wrote **cross-platform automation scripts** (`startup.sh`, `run.sh`) to provision Python environments, install dependencies, run migrations, and start servers
* Configured consistent runtime environment targeting **Ubuntu 20.04**, supporting compatibility across TA and local testing setups
* Structured frontend/backend integration through environment-driven configuration (`global.config`), enabling clean separation and future deploy readiness
* Created seed database content for visual demo (20+ realistic recipes with diet, cuisine, media, steps) to showcase system functionality

---

## 🧠 Design & Architecture Thinking

* Modeled application state and user workflows from stakeholder/user stories using Agile-style iteration planning
* Applied modular design to both front-end components and backend serializers/views for long-term maintainability
* Leveraged DRY principles in DRF views by combining `ListCreateAPIView`, `RetrieveAPIView`, and `UpdateAPIView` for reuse and consistency
* Ensured RESTful API contract discipline by separating concerns (e.g., `create_step`, `save_ingredient`, `update_recipe`)

---

## 💬 Communication & Soft Skills

* Collaborated in weekly check-ins and mentor sessions to validate technical decisions, handle blockers, and ensure team alignment
* Presented final project in a simulated business-owner-style interview with TA, emphasizing product usability and polish
* Acted as full-stack liaison across frontend/backend integration, ensuring all user flows were testable and shippable

---

## 📌 Select Achievements / Impact-Oriented Bullets

* Delivered a **fully functional MVP** with authentication, user content creation, social interactions in <12 weeks
* Achieved 100% endpoint coverage with real-time integration testing via Postman and React components
* Successfully created a full-stack web app that passed all interview checkpoints and received top-tier evaluation
