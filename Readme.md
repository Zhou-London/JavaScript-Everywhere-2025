# Modern Version of JavaScript Everywhere

Ref: _Javascript Everywhere_, Adam D. Scott (Not that _Severance_ guy).

Written by Zhouzhou.

# Guideline

This is a <span style="color: darkOrchid; font-weight: bold;"> modern version </span> of _Javascript Everywhere_. The original version was published on **2020**, however, in a world that technology is fast changing, almost all the frameworks used in this book have been through several updates and **the syntax has changed a lot**. It is not so much possible to install the old version, which means you are not likely to run the website if you just copy and paste the code in the book...Hence I **am now trying** to refine the whole project to let it be more modern.

## Key Refination

- **Apollo server 3.0** => **Apollo server@4.0**
- **MongoDB 3.0** => **MongoDB@8.0**
- That stupid **package.json** has been deleted!

## Apollo Server@4.0

Apollo Server is a server for **GraphQL**. It is really a good choice to use Apollo as the GraphQL Server for Express.js. The modern version is 4.0 and a lot of syntax has been updated! Forget that 2020 book and follow this guide in 2025

### Install And Connection

When you try to install Apollo Server using **npm**. The keyword is different. It is now called "@apollo/server@4.11.3"

    npm install @apollo/server@4.11.3

In your **index.js**, to initilise the Apollo Server, firstly define two variables, **ApolloServer** and **Middleware**.

    const { ApolloServer } = require('@apollo/server');
    const { expressMiddleware } = require('@apollo/server/express4');

However, in 4.0 version you need two more variable. **bodyParser** and **cors**! You have to pass them as parameter when using the Middleware function.

    const bodyParser = require('body-parser');
    const cors = require('cors');

When you write the query, or may say, the **typedef**, don't you any longer need any function, just simply write "``"

    const typeDefs = `
        type Query {
            hello: String!
        },
    `;

Now that we have done the query, we should write a **reslover** for this query. The syntax is quite simple.

    const resolvers = {
        Query: {
            hello: () => 'Hello world!',
        },
    };

We have query and we have resloved it. So now we can start the sever, and this is where everything starts being different...

To start the sever, we should first define a async function. This is generally called

    const startServer = async() => { //... };

And then we call Express.js

    const app = express();

Then start the sever using typeDefs and resolvers. Notice that we have to let the server wait before started.

    const server = new ApolloServer({ typedefs, resolvers })
    await sever.start();

Configure the routing, applying the middleware, using cors and bodyParser.

    app.use(
        '/api', // Set GraphQL endpoint to /api
        cors(),
        bodyParser.json(),
        expressMiddleware(server),
    );

And Finally we can start the server.

    app.listen(port, () => {
        console.log(`🚀 GraphQL Server running at http://localhost:${port}/api`);
    });

To run the server, call this function

    startServer();

## MongoDB 8.0

MongoDB has been updated to 8.0, rather than 3.0 in the book. It is still a good choice of databse. Notice that MongoDB is not a relational databse which is different from SQLite, MySQL, or something like that.

### Install

Using brew. Don't forget the "-community"!

    brew install mongodb-community

Start running MongoDB

    brew services mongodb-community

Use this command to check whether mongodb is running

    brew services ls

Just in case, use this command to check the packages you installed by brew

    brew ls

And this command to check the packages you installed by npm

    npm ls

### Run MongoDB Shell

Open your shell, and type this command. Then you will get into the MongoDB shell. Here you can easily do some CRUD.

    mongosh

Many commands in the book have been deprecated. To insert a data, use **insertOne**.

    db.myDataBase.insertOne({ name: "Alice", age: 30 })

As well as **insertMany**.

    db.myDataBase.insertOne([
        { name: "Alice", age: 30 },
        { name: "Bob", age: 30 },
        ])
