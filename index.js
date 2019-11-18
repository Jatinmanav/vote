const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bodyParser = require('body-parser')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const { Blockchain, Transaction } = require('./blockchain');

const Signup = require('./models/model.js')

const bcrypt = require('bcrypt')
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

app.use(bodyParser.json())
const cors = require('cors')

app.use(cors())

const token = new Blockchain();

const newVote =()=> {
  const txn = new Transaction(myWalletAddress, 'address2', 1);
}

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.use(express.static('build'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})



app.post('/api/signup', (request, response, next) => {
  const body = request.body
  const key = ec.genKeyPair();
  const publicKey = key.getPublic('hex');
  const privateKey = key.getPrivate('hex');

  hash = bcrypt.hashSync(body.password, salt);

  const signupObject = new Signup({
    firstName: body.firstName, 
    lastName: body.lastName,
    publicKey: publicKey,
    privateKey: privateKey,
    publicKey: publicKey,
    rollNum: body.rollNum,
    email: body.email,
    password: hash
  })


  Signup.findOne({ email: body.email }).then(objects=>{
    console.log(objects);
    if(objects===null){
      signupObject
        .save()
        .then(savedNote => savedNote.toJSON())
        .then(savedAndFormattedNote => {
          //response.json(savedAndFormattedNote)
        })
        .catch(error => next(error))
      jwt.sign({objects}, 'secretkey', (err, token) => {
        response.json([true, { token }, signupObject]);
      });
    } else {
      response.json(['name', null])
    }
  }).catch(err =>{
    console.log("Error: ", err);
  })
  
}) 

const verifyPassword = async (password, hash, response, objects)=> {
  try {
    if(objects!==null){
      const isPasswordValid = await bcrypt.compare(password, hash);
      console.log("async: ", objects);
      if(isPasswordValid){
        jwt.sign({objects}, 'secretkey', (err, token) => {
          response.json([true, { token }, objects]);
        });
      }
      else {
        console.log(objects);
        response.json([false, null]);
      }
    }
    else {
      response.json(['email', null]);
    }
  }
  catch(err) {
    console.log("Error: ", err)
  }
}

app.post('/api/signin', (request, response, next) => {
  const body = request.body
  Signup.findOne({ email: body.email }).then(objects=>{
    verifyPassword(body.password, objects.password, response, objects);
  }).catch(err =>{
    response.json(['name',null]);
  })
}) 

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})