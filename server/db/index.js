//when this file is required, knex sets up a connection with the databse and creates the tables if they do not exist

//++++++++FOR LOCAL TESTING++++++++
// var knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     //do not push these to git
//     host: 'localhost',
//     user: 'root',
//     password: 'a',//your local password for root user
//     database: 'users'
//   }
// });
//deployed db connection
var knex = require('knex')({
  client: 'mysql',
  connection: {
    //do not push these to git
    host: 'giraffe.cdt7ljmioe25.us-west-2.rds.amazonaws.com',
    user: '',//ask jake for these
    password: '',
    port: '3306',
    database: 'giraffes',
    debug: true
  },
  pool: { min: 0, max:10 }
});
//create users table
knex.schema.hasTable('users').then((exists) => {
  console.log(exists)
  if(!exists) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary()
      table.integer('userid').defaultTo(1)
      table.string('username', 40)
      table.string('firstName', 40).defaultTo('test')
      table.string('lastName', 40).defaultTo('test')
      table.string('dob', 20).defaultTo('test')
      table.string('bloodType', 20).defaultTo('test')
      table.string('season', 30).defaultTo('test')
      table.string('trained', 30).defaultTo('test')
      table.text('hobbies').defaultTo('test')
      table.string('species', 100).defaultTo('test')
      table.text('quote').defaultTo('test')
      table.text('image').defaultTo('test')

      console.log('USERS TABLE CREATED');
    })
    .catch((error) => {
      throw error;
    })
  }
})
//create friends table
knex.schema.hasTable('friends').then((exists) => {
  if(!exists) {
    return knex.schema.createTable('friends', (table) => {
      table.integer('user1_id').unsigned()
      table.integer('user2_id').unsigned()
      table.foreign('user1_id').references('id').inTable('users')
      table.foreign('user2_id').references('id').inTable('users')

      console.log('FRIENDS TABLE CREATED');
    })
    .catch((error) => {
      throw error;
    })
  }
})

module.exports = knex;
