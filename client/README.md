## ANYWHERE FITNESS APP 📱

Anywhere Fitness is a React web application that allows fitness classes to be held anywhere - a park, an unfinished basement or a garage - not just your traditional gym.

## Software Developers

backend: Jayaram Nair
frontend: Tony Miller, Chris Lau, Rhiannon Stanford

## Link to Product Vision Statement 📝

https://docs.google.com/document/d/17laY8Irc5cRqvpqdT3f6nNUofOl09Lr0IAZZsVlr7JE/edit?usp=sharing

## FRONT END

## App Organization & Structure Notes

    - Home / splash / video
    - sign-up
      (checkbox for instructor)
    - log-in
      (checkbox for instructor, conditional render)
      password? / instructor code?
      User Object
      isInstructor: boolean;
    - log-out

    Client (protectedRoute)
      - classes page

    Instructor (protectedRoute)
      - classes page for instructors (that has edit form component on top)

## Components

[] LandingPage.js
[] Header.js
[] Footer.js

[] SearchClasses.js
[] ClientClasses.js
[] InstructorClasses.js
[] ClientClass.js
[] InstructorClass.js

[] SignUpForm.js
[] LogInForm.js
[] ClassForm.js

> Tony

[] Create React App
[] Install Dependencies
[] Set Up File Architecture (component pages, views, utils, etc.)

[] Create Router System (5 routes so far)

    [] Create ProtectedRoute component (for client & instructor pages after successful login)
    [] Other Routes are:

        - landing page
        - sign-up
        - log-in
        - client classes - protected
        - instructor classes - protected

[] Create Header.js
[] Create Footer.js
[] Create Server.js - faux server to test login, until backend is ready.  
      username: lambda
      password: school

STRETCH:

[] Create Landing.js - video splash page for landing page

> Rhiannon

[] Create & Maintain README.md

[] Create SearchClasses.js
[] Create ClientClasses.js (protectedRoute)
[] Create ClientClass.js
[] Create InstructorClasses.js (protectedRoute)
[] Create InstructorClass.js

> Tony & Rhiannon

Redux - pair-program (GOAL: start by Thursday)

Mid next week - Testing (Cypress, RTL)

Media Queries - BONUS

> Chris

[] Create Forms:

    [] SignUpForm.js - new users sign-up
    [] LogInForm.js - checkbox for ------>   isTeacher: boolean
    [] ClassForm.js (CRUD:  add, update, delete a class)

[] Conditional Rendering of Errors - save as error object
[] Form Validation - Yup

STRETCH:

[] Material UI

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
