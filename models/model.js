const mongoose = require('mongoose')

const url = process.env.MONGODB_URI 

console.log('connecting to', url)  

mongoose.set('useFindAndModify', false)

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const signupSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 3,
    required: true
  },
  lastName: {
    type: String,
    minlength: 3,
    required: true
  },
  voteCount: {
    type: Boolean,
    required: true
  },
  rollNum: {
    type: Number,
    minlength: 3,
    required: true
  },
  email: {
    type: String,
    minlength: 3,
    required: true
  },
  password: {
    type: String,
    minlength: 3,
    required: true
  },
})


const Signup = mongoose.model('Signup', signupSchema)  

module.exports = Signup;