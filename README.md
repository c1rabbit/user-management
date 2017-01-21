# user-management

a [Sails](http://sailsjs.org) application

a MVC User Management Application

## Setup

install [node.js](https://nodejs.org/)

install [sails.js](https://www.npmjs.com/package/sails) globally: `npm install sails -g`

install dependencies: `npm install`

### mysql setup (optional)
create database called: `user_management`

configure db settings in: `config/connections.js`

### mongo setup (required for all)
setup session store with [MongoDB](https://www.mongodb.com/)

configure session store settings in: `config/session.js`

### to send email
signup [mailgun.js](https://www.mailgun.com/)
update config settings in `config/mailgun.js`

### start development server
`sails lift`


## Default Login

login: admin

pw: admin



## Production Notes

change session 'secret' in `config/session.js`

- persist node.js on server
`npm install forever -g`
`forever app.js --prod`
