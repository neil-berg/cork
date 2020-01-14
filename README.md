# Cork

A progressive web app for sharing wines written in JavaScript (Node.js, Express.js, React.js).

### [View the app](https://cork.herokuapp.com/)

### [Read blog post](https://neilberg.dev/blog/2019-10-21-cork)

## Table of Contents

- [Motivation](#motivation)
- [Backend](#backend)
- [Frontend](#frontend)
- [Hosting](#hosting)
- [Issues](#issues)
- [Author](#issues)

## Motivation

I'm a big fan of [natural wines](https://en.wikipedia.org/wiki/Natural_wine), particularly [orange wines](https://en.wikipedia.org/wiki/Orange_wine). I'm lucky to be surrounded by many wine shops and bars that serve these delicious wines, but there is one problem: I can never remember the bottle!

Enter Cork, a progressive web app that I developed to upload pictures and metadata of wines that users are drinking. Sip on, my friends, and let Cork remember the details. 

## Backend

* RESTful API for users and wines developed using Node.js, Express.js, MongoDB, and Mongoose.
* Authentication powered by JSON Web Tokens with bcrypt password hashing
* Image uploading and processing by multer and sharp

## Frontend

* CRA-bootstraped React app
* React-Context for global state (user/authentication)
* Styled-components and react-spring for CSS + animations

## Hosting

* Heroku for hosting and continous deployment 

## Issues

Spot any issues or have ideas for improving Cork? I'd love to hear them! Please file an issue and/or open a PR.

## Author

Neil Berg. Email any questions/comments to: neil@neilberg.dev
