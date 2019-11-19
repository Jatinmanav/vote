const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bodyParser = require("body-parser");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const { Blockchain, Transaction } = require("./blockchain");
const axios = require("axios");

const Signup = require("./models/model.js");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

app.use(bodyParser.json());
const cors = require("cors");

app.use(cors());

const token = new Blockchain();

const newVote = (recieversKey) => {
  const myKey = ec.genKeyPair();
  sendersKey = myKey.getPublic('hex');
  const txn = new Transaction(sendersKey, recieversKey, 1);
  txn.signTransaction(myKey);
  token.addTransaction(txn);
  token.minePendingTransactions(sendersKey);
};

//const myKey = ec.genKeyPair();
//const public = myKey.getPublic('hex');
//newVote(public, 'address1', myKey);
//newVote('address1')
//console.log(token, null, 1)

app.get("/api/result", async(request, response, next) => {
  try {
    let candidateData;
    await axios
      .get('http://localhost:3003/constituencies')
      .then(response => {
          candidateData = response.data;
    })
    const candidateName = [];
    const result = []
    const color = []
    for(let each in candidateData){
      candidateName.push(candidateData[each].name);
    }
    for(let each in candidateName){
      console.log(candidateName[each])
      result.push(token.getBalanceOfAddress(candidateName[each]));
    }
    for(let each in candidateData){
      color.push(candidateData[each].color);
    }
    console.log(result);
    response.json([candidateName, result, color]);
  } catch(err) {
    console.log("err");
  }
});

app.post("/api/castvote", (request, response, next) => {
  const body = request.body;
  recieversKey = body.candidate;
  console.log(body.email);
  Signup.findOne({ email: body.email })
    .then(objects => {
      if(objects.voteCount === true) {
        response.json(false);
      } else {
        newVote(recieversKey);
        Signup.findOneAndUpdate({email: body.email}, {$set: {voteCount: true}}, {upsert: false}, function(err,){
          if(err) {
            console.log("error");
          } else {
            console.log("updated");
          }
        });
        response.json(true);
      }
    })
    .catch(err => {
      response.json(["error", err]);
      console.log(err);
    });
  console.log(token.getBalanceOfAddress('address1'));
  console.log(token.isChainValid());
});

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

app.use(express.static("build"));

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.post("/api/signup", (request, response, next) => {
  const body = request.body;

  hash = bcrypt.hashSync(body.password, salt);

  const signupObject = new Signup({
    firstName: body.firstName,
    lastName: body.lastName,
    voteCount: 0,
    rollNum: body.rollNum,
    email: body.email,
    password: hash
  });

  Signup.findOne({ email: body.email })
    .then(objects => {
      console.log(objects);
      if (objects === null) {
        signupObject
          .save()
          .then(savedNote => savedNote.toJSON())
          .then(savedAndFormattedNote => {
            //response.json(savedAndFormattedNote)
          })
          .catch(error => next(error));
        jwt.sign({ objects }, "secretkey", (err, token) => {
          response.json([true, { token }, signupObject]);
        });
      } else {
        response.json(["name", null]);
      }
    })
    .catch(err => {
      console.log("Error: ", err);
    });
});

const verifyPassword = async (password, hash, response, objects) => {
  try {
    if (objects !== null) {
      const isPasswordValid = await bcrypt.compare(password, hash);
      console.log("async: ", objects);
      if (isPasswordValid) {
        jwt.sign({ objects }, "secretkey", (err, token) => {
          response.json([true, { token }, objects]);
        });
      } else {
        console.log(objects);
        response.json([false, null]);
      }
    } else {
      response.json(["email", null]);
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

app.post("/api/signin", (request, response, next) => {
  const body = request.body;
  Signup.findOne({ email: body.email })
    .then(objects => {
      verifyPassword(body.password, objects.password, response, objects);
    })
    .catch(err => {
      response.json(["name", null]);
    });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError" && error.kind == "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
