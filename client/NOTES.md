## Tony & Rhiannon

## Front End Things to Do

[] hook up forms to back end API 

[x] assign current user based on user id

[] enable full CRUD capability for editing classes 

[] implement a filter so when an instructor logs in, they will see only their classes (a conditional filter on classes component) … may require small refactor 

[] implement search by instructor feature within the Search helper function

[] Render response message after login.  May want to take it out of an alert and make it a cookie tag like I was showing you earlier on MAT ui so it persists for just a few seconds After it has moved on to the new view, and it doesn’t require a button click like an alert to clear it - STRETCH GOAL

[] Sign-up Form, Add sign up link / usehistory push to /login on 

##  A command line program that you use from your terminal

> https://linuxize.com/post/curl-post-request/

curl -X POST -F 'name=linuxize' -F 'email=linuxize@example.com' https://example.com/contact.php

curl -X POST -d 'email=th@marvel.org' -d 'password=password'  https://amazing-fitness-app.herokuapp.com/api/login

curl -X POST -d 'email=th@marvel.org&password=password'  https://amazing-fitness-app.herokuapp.com/api/login

curl -X POST -H "Content-Type: application/json" \
    -d '{"password": "password", "email": "th@marvel.org"}' \
    https://amazing-fitness-app.herokuapp.com/api/login


Client # 1
email: th@marvel.org
password: password

Instructor# 2
email: bp@marvel.org
password: password


## My idea to solve the async problem in Login:

  useEffect(() => {
     // check state for instructor... user.isInstructor which gets pulled below from Redux state
     if (props.currentUser && !props.currentUser.id) {
       return;
     }

     if (props.user.isInstructor === true) {
      history.push('/instructors')
    } else if (props.user.isInstructor === false) {
      history.push('./classes')
    }
  }, [props.user] )

  However, the sign-out breaks... but it solves the login client and login instructor views



## Chris

