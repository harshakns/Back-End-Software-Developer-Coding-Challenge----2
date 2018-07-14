const express = require('express');

const bodyParser = require('body-parser');
//body parser is a middleware  that is used to parse the body and convert it into json.

const cors =require('cors');
//cors is a middlware used to accept Cross Origin Resource Sharing requests. 

const knex = require('knex');
//knex is a great library for accessing databases

const store = require('./controller/store.js');
const retrieve = require('./controller/retrieve.js');
//store and retrieve are controllers for handling the //operations. As the name suggests, they are used to
//store and retrieve data.

const app = new express();

//this is the most important part. Be sure to enter right
//credentials in the host,user and password fields.
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'h4r5h4',
        password: '12!@',
        database: 'pastureMapBackEnd'
    }
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//The above usage is because the latest version doesn't
//support the use of bodyparser constructor.

app.use(cors());

//individual comments for retrieve and store are mentioned
//in their corresponding libraries.

app.post('/retrieve',(req,res)=>retrieve.handleRetrieve(req,res,db));

app.post('/store',(req,res)=>store.handleStore(req,res,db));

//here the app is designed to listen at 3000, you can change
//as you wish.
app.listen(3000,()=>console.log('i am alive at port 3000'))

