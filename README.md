# Video App Project

## About

A full stack video management application where we can create an account, upload and manage videos, play videos, and post comments.

## Technologies

- `JS/NodeJS`
- `Express`
- `MySQL`
- `CSS/HTML/Handlebars`

## Project specifications

- Create an account
- Sign in
- Retrieve a list of posts
- Make a post
- Upload a video
- Create a comment
- Delete a comment
- Delete a video
- Retrieve posts created by other users
- Search for posts

## Set up the development environment

1. Clone the repository

```
git clone https://github.com/spushkin/Video_App.git
```

2. Download and install [NodeJs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
3. Download and install [MySQL Server](https://dev.mysql.com/downloads/installer)

## Available scripts

### Build Instructions

1. `cd ./Video-App/application/`
2. `npm install`

3. `npm run builddb`

### Run Instructions

- `Run npm start`

### Build and run:

- `npm run startddb`
- Run locally on [localhost:3000](http://localhost:3000)

## Routes

| Description                 | API Endpoint                                                               |
| :-------------------------- | :------------------------------------------------------------------------- |
| Get a home page             | `GET '/'`                                                                  |
| Get a user's profile page   | `GET '/profile'`                                                           |
| GET a signin page           | `GET '/login'`                                                             |
| GET a signup page           | `GET '/registration'`                                                      |
| GET a postVideo page        | `GET '/postVideo'`                                                         |
| GET all posts page          | `GET '/post'`                                                              |
| GET an individual post page | `GET '/post/:id'`                                                          |
| GET a list of users         | `GET '/users/'`                                                            |
| Register a user             | `POST '/users/register'` <br><em>Body {username, email, password}</em>     |
| Sign in a user              | `POST '/users/login'` <br><em>Body {username, password}</em>               |
| Create a post               | `POST '/posts/createPost'` <br><em>Body {title, desc, file, dest, id}</em> |
| Get a post                  | `GET '/posts/search'`                                                      |
| Create a comment            | `POST '/posts/create'` <br><em>Body {postId, comment}</em>                 |
| Delete a post               | `POST '/delete/post/:id'`                                                  |

## Dependencies

```
── application
    ├── @mapbox/node-pre-gyp@1.0.7
    ├── bcrypt@5.0.1
    ├── colors@1.4.0
    ├── cookie-parser@1.4.5
    ├── debug@2.6.9
    ├── express-flash@0.0.2
    ├── express-handlebars@5.3.2
    ├── express-mysql-session@2.1.7
    ├── express-session@1.17.2
    ├── express@4.18.2
    ├── http-errors@1.6.3
    ├── moment@2.29.4
    ├── morgan@1.9.1
    ├── multer@1.4.4
    ├── mysql2@2.3.2
    ├── node-pre-gyp@0.17.0
    ├── nodemon@2.0.22
    ├── serve-favicon@2.5.0
    └── sharp@0.32.1
```

## Screenshots

<img width="auto" alt="picture" src="https://github.com/spushkin/Video_App/assets/42389366/e1bb5b8d-5750-4298-89b1-e09136054892">

<img width="auto" alt="get me an in-n-out" src="https://github.com/spushkin/Video_App/assets/42389366/b4ddeb94-6d81-4f15-904c-f1d12853da21">
