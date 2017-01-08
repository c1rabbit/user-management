# user-management

a [Sails](http://sailsjs.org) application

a MVC User Management Application

## Setup

install [node.js](https://nodejs.org/)

install [sails.js](https://www.npmjs.com/package/sails) globally: `npm install sails -g`

install dependencies: `npm install`

create database called: `user_management`

configure db settings in: `config/connections.js`

setup session store with [MongoDB](https://www.mongodb.com/)

configure session store settings in: `config/session.js`

signup [mailgun.js](https://www.mailgun.com/)
update config settings in `config/mailgun.js`

## Default Login

login: admin
pw: admin


## Production Notes

change session 'secret' in `config/session.js`

- persist node.js on server
`npm install forever -g`
`forever app.js --prod`
