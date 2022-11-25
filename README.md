# Consolidated-U3-Notes

The primary scope of this repo is to serve as a hub/consolidation of lessons from unit 3 but not necessarily as an exhaustive resource for the technology featured.

The consolidation includes content pulled directly from previous repos, elaborations from primary documentation, and rewording for my own benefit and understanding. It excludes follow-along excersizes but links to the original lessons and external documentation.

## Database Design

From [u3_lesson_database_design](https://github.com/SEIR-1003/u3_lesson_database_design)

Database design is one of the most important steps in building a robust backend service. How you store and associate data plays a big part in how well your application scales. With relational databases it's better to have more tables than not enough. Relational databases operate on a column/row approach, sort of like a spreadsheet. We associate different records utilizing a foreign key, which can be any kind of unique identifier; typically an id.

### Types of relationships

From [u3_lesson_ERD](https://github.com/SEIR-1003/u3_lesson_ERD)

In the world of databases, there are many ways to relate data. The following is a list you might employ often:

- one-to-one
- one-to-many
- many-to-many 

## Express

[Go to expressjs.com](https://expressjs.com/) to read Official technical documentation for Express.js.

### Express Intro

From [u3_lesson_express_intro](https://github.com/SEIR-1003/u3_lesson_express_intro)

#### What is Express.js?

Express is a JS library to set up your own server, which listens for different kinds of HTTP requests, and serves the right response.

In our case, we're using it solely as a JSON API server.

#### HTTP

HTTP is the structure of messages that all information travels in over the web. When you visit a webpage you are making an HTTP request.

The HTTP request and response cycle is at the heart of the web.


#### Getting Started

##### Installation

Install express at the root level of your backend project through your terminal with `npm install express`.

##### Boilerplate

To use express, we need to set up a server filer in the root directory of our backend project and include the following boilder plate code. I've added comments from the Express technical documentation to elaborate peices of code and their function.

```
const express = require('express')
const PORT = process.env.PORT || 3001

// The app object conventionally denotes the Express application. Create it by calling the top-level express() function exported by the Express module:
const app = express()


//Starts a UNIX socket and listens for connections on the given path. This method is identical to Node’s http.Server.listen().
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})
```

In short, we require the package in our file, declare our app object and assign it to the imported express function, and select a port to "listen" to for HTTP requests.

##### Installing and using nodemon

You could run your server with the command `node [serverFileName].js`. This would spin up your server once but the downside is that you'll have to stop and restart your server after every change while you're developing.

The package `nodemon` enables you to make changes live so that you don't have to stop and restart the server after every change you make. This needs to be installed on a project-to-project basis with the command `npm install nodemon --save-dev`.

You may have to manually update the "scripts" attribute in your package.json folder to add a start script and dev script. Add these properties to your json as they're written below.

```
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"  
}
```

You can start your live server with the `npm run dev` command in your terminal.


### Express Routes

From [u3_lesson_express_routing](https://github.com/SEIR-1003/u3_lesson_express_routing)

In Express.js, routes are paths the user makes an HTTP for, such as GET `/` GET `/news` and so on. Upon making a request to a particular path, a handler function takes care of that particular request to create, update, read, or destroy information on a database.

#### Building Routes and Handlers/Controllers

Each HTTP request function (`get`, `post`, `put`, `delete`, etc) require two arguments. The first is a string representing the `url` or `endpoint` that we want to make the request to. The second argument is a function that provides a way to handle the specific request.

This second argument, the handler function, works with two parameters: `req` and `res`.

The `req` parameter conventionally represents the request being made and any information sent alongside the request. [Read about req](https://expressjs.com/en/api.html#req) in the Expressjs documentation.

The `res` variable respresents the HTTP response from the server. [Read about res](https://expressjs.com/en/api.html#res) in the Expressjs documentation.

#### Dynamic Endpoints

The `request` object enables you to declare dynamic endpoints using parameters and queries.

##### req.params

Dynamic parameters can be appended to paths with a colon. These parameters can be named however you'd like but its worth considering semantic conventions.

```
app.get('/message/:id', (request, response) => {
  console.log(`Getting a message with the id of ${request.params.id}`)
  response.send({ msg: `Message with an id of ${request.params.id} found` })
})
```

##### req.query

Similarly, queries can be appended to the path with a question mark. Multiple queries are separated by ampersands. Example below:

```
localhost:3001/find?myName=Bob&myAge=23
```

Our path and handler function might look like this:

```
app.get('/find', (request, response) => {
  console.log(
    `Finding someone with a name of ${request.query.myName} and an age of ${request.query.myAge}`
  )
  response.send({
    msg: `${request.query.myName} is ${request.query.myAge} years old.`
  })
})
```

Query's function in different way from `params` because we dont set any placeholders ahead of time. Instead this information is given when constructing the request.

### Express Middleware

From [u3_lesson_express_middleware](https://github.com/SEIR-1003/u3_lesson_express_middleware)

#### What is Middleware?

Middleware can be described as a function that run's in the middle of a request or before. From the Express documentation:

> Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

> Middleware functions can perform the following tasks:

> - Execute any code.
> - Make changes to the request and the response objects.
> - End the request-response cycle.
> - Call the next middleware function in the stack.

#### CORS

The [CORS](https://www.npmjs.com/package/cors) package enables cross origin resource sharing. It effectively enables you to determine how you handle requests that come from a different origin than where your data is stored. With CORS you can restrict access to information on a server from unpermitted origins or restrict actions like making delete requests.

It works by passing headers in the response to a request that gives the browser information regarding what information or actions are permissible from the origin the request is made. 

You can install CORS using `npm install cors`.

After installing `cors` you need to require it in your app and have your app use it.

```
const express = require('express')
// require cors middleware (this variable can be named anything)
const corsMiddleware = require('cors')

const app = express()
//use cors
app.use(cors())

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`)
})
```

When we `use(cors())` without passing any parameters we're effectively allowing cross origin resource sharing regardless of the origin. This isn't necessarilly best practice but we are probably safe to use this for development. If you want to be more precise with configuring cors then you might consider passing acceptable origins.

```
app.use(cors({
  origin: 'http://localhost:3000/',
  optionsSuccessStatus: 200
}))
```

[Refer to the CORS documentation](https://www.npmjs.com/package/cors) for detailed information on configuring cross origin resource sharing!

#### next()

`next()` is a function you can pass to middleware to tell it to move on to the next function in the middleware stack. Its worth noting that `next()` is not necessarily the same as `return` or `break` and any code following next will be executed after the following functions execute.

Consider the following:

```
const demonstrator = (req, res, next) => {
  console.log(1);
  next();
  console.log(3);
}

app.get('/count', demonstrator,(req, res) => {
  console.log('2');
})
```

In this example we have a `get` route set up on the path `/count`. When a request hits this endpoint, the functions passed into the route as parameters fire in order. First `demonstrator` fires and logs `1` before calling `next()`. Next an anonymous function runs and logs `2`. Finally, demonstrator finishes executing and logs `3`.

In short, the function `demonstrator` is doing the following:

1. Do something: `console.log(1)`
2. Do the next thing: execute the body of an anonymous function that reads `console.log(2)`
3. Do something after that: `console.log(3)`


### Express Controllers

From [u3_lesson_express_controllers](https://github.com/SEIR-1003/u3_lesson_express_controllers)

#### What is a controller?

Controllers are methods that we create to handle how our server behaves during a request. They are in charge of sending back the requested information for a specific endpoint. We typically group them based on the actions that they perform and for the router that handles an endpoint or route. For example, if we have a router that handles all requests for a user ie. log in, register, profile etc.. We would create a controller to handle all of these endpoints. Our controller is a group of functions that will then handle the behavior for a specific endpoint.

## Sequelize

[Go to sequelize.org](https://sequelize.org/docs/v6/getting-started/) to read official technical documentation for sequelize.

### Introduction to Sequelize

From [u3_lesson_sequelize_intro](https://github.com/SEIR-1003/u3_lesson_sequelize_intro)

#### What is Sequelize

Sequelize is a JavaScript Object Relational Mapping tool! Its an abstraction layer for raw SQL. Instead of raw SQL we can use JavaScript to interact with our database.

From the article [What is an ORM and Why You Should Use it](https://blog.bitsrc.io/what-is-an-orm-and-why-you-should-use-it-b2b6f75f5e2a):

> Object-relational-mapping is the idea of being able to write queries like the one above, as well as much more complicated ones, using the object-oriented paradigm of your preferred programming language.

#### Getting Started

##### Installation

To install sequelize in your project you need to follow the following commands.

```
npm init -y
npm install sequelize pg
npm install -g sequelize-cli <--// You don't need to do this every time and everyone in this cohort has already done this. It installs sequelize CLI globally
```

##### Initialization

Initialize a sequelize project
```
sequelize init
```

After executing this command in your project you should see a few folders a files generated for you:

```
- config
- models
- seeders
```

##### Configuration

The config folder stores a `config.json` file where you can set your database name, username and password, and dialect. We're going to update this dialect to postgres. Example below:

```
{
  "development": {
    "username": "<your postgres username>",
    "password": "<your postgres password>",
    "database": "<your database name>_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "<your postgres username>",
    "password": "<your postgres password>",
    "database": "<your database name>_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "<your database name>_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

NOTE: If you include sensitive information here then try to be mindful of how you handle commiting and pushing to github.

#### Initializing a Database

Instead of going into the postgres shell, you can initialize your databate through your terminal with the `sequelize db:create` command. This will create a database that matches the name of the database in your config file.

### Models

From [sequelize.org](https://sequelize.org/docs/v6/core-concepts/model-basics/):

> Models are the essence of Sequelize. A model is an abstraction that represents a table in your database. In Sequelize, it is a class that extends Model.

> The model tells Sequelize several things about the entity it represents, such as the name of the table in the database and which columns it has (and their data types).

> A model in Sequelize has a name. This name does not have to be the same name of the table it represents in the database. Usually, models have singular names (such as User) while tables have pluralized names (such as Users), although this is fully configurable.

#### Generating Models

You can generate models from the terminal using the following command.

```
sequelize model:generate --name <ModelName> --attributes <someKey>:<datatype>,<anotherKey>:<anotherDatatype>
```

Conventionally, your models should be `PascalCased` since they represent JavaScript classes and your attributes should be `camelCased` since they represent properties of that class.

The command above will create two files. One file in the migrations folder and one file in the models folder.

Here's an example model called `User`

```
'use strict'
// require Model class from sequalize
const { Model } = require('sequelize')

// export a function that declares a class called "User" that extends
//Model class and add association methods and columns as necessary
// return User from this function after initialization
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  // initialize model with these {columns},{table configuration}
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'User',
      // by default sequelize pluralizes the model name. 
      // If you want a table called "users" instead of "Users" then you
      // need to make it explicit below at time of initialization (and
      // update the migration file before migrating changes)
      tableName: 'users'
    }
  )
  return User
}

```

### Migrations

From [u3_lesson_sequelize_migrations](https://github.com/SEIR-1003/u3_lesson_sequelize_migrations)

Migrations help us by keeping track of every change we performed to our database so that we can maintain data integrity and easy onboarding for other contributors.

From [sequelize.org](https://sequelize.org/docs/v6/other-topics/migrations/):

> You will need the Sequelize Command-Line Interface (CLI). The CLI ships support for migrations and project bootstrapping.

> A Migration in Sequelize is a javascript file which exports two functions, up and down, that dictates how to perform the migration and undo it. You define those functions manually, but you don't call them manually; they will be called automatically by the CLI. In these functions, you should simply perform whatever queries you need, with the help of sequelize.query and whichever other methods Sequelize provides to you. There is no extra magic beyond that.

#### Using Migrations As Records

Each migration file contains functions that determine what change occured during that migration. It could represent the creation or renaming of a table or column, updating associations and datatypes, or any other changes you might make to your tables.

You can create a new migration file by running the following command:

```
sequelize migration:generate --name <semantic name of file that briefly describes change>

ex:

sequelize migration:generate --name add-username-to-users
```

A new file will generate in your migrations folder upon execution of this command. This file will match your specified file name with a date stamp prepended to it automatically.

This file includes an `up` function representing the change you intend to make to the target table or column in addition to a `down` function that is effectively its inverse. Inside these functions we can update tables and columns utilitizing methods sequelize provides through the `queryInterface`.

After writing your changes in these functions you need to migrate your changes to your database through the CLI with the command `sequelize db:migrate`. You will not see any changes in your table until you migrate.

NOTE: This command will also create a table called `SequelizeMeta` in your database and populate it with a log of migrations.

#### Query Interface

From [sequelize.org](https://sequelize.org/docs/v6/other-topics/query-interface/):

> An instance of Sequelize uses something called Query Interface to communicate to the database in a dialect-agnostic way. Most of the methods you've learned in this manual are implemented with the help of several methods from the query interface.

The methods from the query interface enable users to add columns, bulk delete records, bulk insert records, change columns, and more. [Reference the sequelize docs](https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface) for an exhaustive list of `queryInterface` methods.

### Associations

From [u3_lesson_sequelize_associations](https://github.com/SEIR-1003/u3_lesson_sequelize_associations)

Associations are the relationships that we define between different data entries accross different tables. For example:

- A user can `have many` pets
- Pets `belong to` one user

Relational databases rely on associations in order to join data that we need in a an organized manner. It also helps reduce database load. Databases can become overwhelmed when being queried repeatedly in a short amount of time. By joining data, we can load all of the data we need with one query.

#### Sequelize Association Methods

Sequelize supports one-to-one, one-to-many, and many-to-many relationships. Sequelize models have built in methods to handle these associations: `hasOne`, `hasMany`, `BelongsTo`, and `BelongsToMany`. You can add these within the `static associate` brackets of your model. For example:

```
class User extends Model {
  static associate(models) {
    User.hasMany(models.User, { foreignKey: 'userId' })
  }
}
```

If one user can have many tasks we simply associate them within this section by called the `hasMany` method and passing an object detailing how to associate them. The foreignKey we'll use to associate them is a column we'll call userId.

Each association method works this exact way. The first parameter is the Model you want to associate and the second parameter is an options object representing details regarding the association.

If each task is assigned to only one user then we can say it belong to that particular user using the `belongsTo` method on the Task model. Then we'll add our association as a column on the model initialization in addition to the migration file.

```
class Task extends Model {
  static associate(models) {
    Task.belongTo(models.User, { foreignKey: 'userId' })
  }
}
Task.init(
  {
    title: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks'
  }
)
```

#### Associations options

From [sequelize.org](https://sequelize.org/docs/v6/core-concepts/assocs/#options)

As we saw in the last example, various options can be passed through the options object in the second parameter of the association call. We passed one property in our association options object: a `foreignKey`. After that we added more column options to the initialization and migration manually (`onDelete`, `type`, `references`, etc.)

### Sequelize Queries

From [u3_lesson_sequelize_queries-1](https://github.com/SEIR-1003/u3_lesson_sequelize_queries-1).

When we define our Sequelize models, you'll notice that the model defined inherites from the `Model` class provided by Sequelize. This model class has methods and attributes built in to query or manipulate any model that we create. When we invoke these functions, Sequelize executes some SQL query to retrieve the desired information from our database. The queries return a promise by default which means we must wait for them to finish by either using `async/await` or `.then().catch()`.

Note: Not all queries return the result formatted as you'd expect, make sure to check how the result is formatted!

Read the sequelize docs for [basic queries](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/) and [querying associated models](https://sequelize.org/docs/v6/core-concepts/assocs/#basics-of-queries-involving-associations)

#### Raw Queries

From [sequelize.org](https://sequelize.org/docs/v6/core-concepts/raw-queries/):

> As there are often use cases in which it is just easier to execute raw / already prepared SQL queries, you can use the sequelize.query method.

> By default the function will return two arguments - a results array, and an object containing metadata (such as amount of affected rows, etc). Note that since this is a raw query, the metadata are dialect specific. Some dialects return the metadata "within" the results object (as properties on an array). However, two arguments will always be returned, but for MSSQL and MySQL it will be two references to the same object.

Example:

```
const [results, metadata] = await sequelize.query("UPDATE users SET y = 42 WHERE x = 12");
// Results will be an empty array and metadata will contain the number of affected rows.
```
