# ANYWHERE FITNESS APP 📱

Anywhere Fitness is a React web application that allows fitness classes to be held anywhere - a park 🌳, an unfinished basement or a garage 🏠 - not just your traditional gym 💪🏽.

https://anywhere-fitness-club.vercel.app/

## Software Developers

- backend: Jayaram Nair
- frontend: Chris Lau, Tony Miller, Rhiannon Stanford

### *[Link to Product Vision Statement 📝](https://docs.google.com/document/d/17laY8Irc5cRqvpqdT3f6nNUofOl09Lr0IAZZsVlr7JE/edit?usp=sharing)

  - *[LinkedIn](https://www.linkedin.com/in/rhiannon-stanford-35144973/)*

https://docs.google.com/document/d/17laY8Irc5cRqvpqdT3f6nNUofOl09Lr0IAZZsVlr7JE/edit?usp=sharing

### Link to Code on GitHub 💻

https://github.com/Build-Week-Anytime-Fitness

## FRONT END

## App Organization & Structure Notes

    - Home / video element
    - sign-up
      (checkbox for instructor)
    - log-in
      (checkbox for instructor, conditional render)
      password? / instructor code?
      User Object
      isInstructor: boolean;
    - log-out

    Client (protectedRoute) /classes
      - classes page

    Instructor (protectedRoute) /instructors
      - classes page for instructors (that has edit form component on top enabling full CRUD operations)

## Components

[] Home.js
[] Header.js
[] Footer.js
[] Nav.js

[] Classes.js
[] Class.js
[] Instructors.js

[] SignUpForm.js
[] LogInForm.js
[] Logout.js
[] ClassForm.js

## NOTE: Front-end work shared by all front-end devs. Regular pair programming. Shared contribution.

[x] Create React App
[x] Install Dependencies
[x] Set Up File Architecture (component pages, views, utils, etc.)

[x] Create Router System (5 routes so far)

[x] Create ProtectedRoute component (for client & instructor pages after successful login)
[x] Other Routes are:

        - home
        - sign-up
        - log-in
        - client classes - protected /classes
        - instructor classes - protected /instructors

[x] Create Header.js
[x] Create Footer.js
[x] Create Server.js - faux server to test login, until backend is ready.

- username: lambda
- password: school

[x] Create video element for home
[x] Bootstrap styling

[x] Refactor to redux, create actions and reducers
[x] Add Media Queries to App.css

[x] Create & Maintain README.md
[x] Set Up File Architecture for state (actions / reducers)
[x] Enable ProtectedRoutes / congruent with Nav links

[x] Add search feature to classes, integrated into Redux
[x] Create Classes.js component(protectedRoute)
[x] Create Class.js component(protected) - use Mat UI styling
[x] Create Instructors.js component(protectedRoute)
[x] Conditional Rendering of views /classes (client) & /instructors (instructor)
[x] Create InstructorClasses.js (protectedRoute)

[x] Refactor to redux, create actions and reducers
[x] Add Media Queries App.css

[x] Create Forms:

[x] SignUpForm.js - new users sign-up
[x] LogInForm.js - checkbox for ------> isTeacher: boolean
[x] ClassForm.js (CRUD: add, update, delete a class)
[x] Form styling

[x] Conditional Rendering of Errors - save as error object
[x] Form Validation - Yup
[x] Cypress Tests

[x] Debugging work on Redux async issues / useEffect
[x] Testing of components and feedback to group

[x] Implement Stripe - Stripe components, cart, payment, and redux

## SAMPLE LOGINS

> Link to backend Github https://github.com/Build-Week-Anytime-Fitness/back-end/blob/main/README.md

Client # 1
email: th@marvel.org
password: password

Instructor# 2
email: bp@marvel.org
password: password

## Dependencies Installed

React Dom
[x] npm install react react-dom

Axios
[x] npm install axios
import axios from 'axios';

Yup
[x] npm install -S yup
import \* as yup from 'yup';

React Router
[x] npm install --save react-router
import { Router, Route, Switch } from "react-router";

Material UI
[x] npm install @material-ui/core
[x] npm install @material-ui/icons

Bootstrap
[x] npm install react-bootstrap bootstrap@4.6.0

{/_ The following line can be included in your src/index.js or App.js file_/}

import 'bootstrap/dist/css/bootstrap.min.css';

GSAP
[x] npm install gsap
import { gsap } from "gsap";

## Dev Dependencies Installed

Cypress
[x] npm install cypress --save-dev
npx cypress open
add to cypress.json folder

ADD:

{
"viewportWidth": 600,
"viewportHeight": 600,
"baseUrl": "http://localhost:5000",
"integrationFolder": "cypress/integration"
}

React Testing Library
[x] npm install --save-dev @testing-library/react

## Tools

Tiny JPEG https://tinyjpg.com/

- to compress images to optimize performance

## Data Structures

> User Data Structure:

{ "id": "1", "personName": "Pete", "email": "petel@email.com", "isOverEighteen": true, "password": abc123, "isInstructor": false }

> Class Data Structure:

{ "id": "1", "className": "oldie but goodie", "classType": "jazzersize", "classDate": "Monday", "startTime": 9:00am, "duration": 1, "intensity": "high", "location": "anywhere", "numberOfStudents": 10, "maxClassSize": 10 }

## Responsiveness Media Queries

<!-- mobile -->

@media only screen and (min-width: 480px) {
}

<!-- tablet -->

@media only screen and (min-width: 768px) {
}

<!-- desktop -->

@media only screen and (min-width: 992px) {
}

<!-- wide-screen -->

@media only screen and (min-width: 1280px) {
}
