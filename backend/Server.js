const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = express()
const userModel = require('./models/Users')

const PORT = process.env.PORT || 5000


//To convert the data correctly
app.use(express.json())

//To connect the database with react without errors
app.use(cors())

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URI,() => {
    console.log("Connected to MongoDB")
})
   


app.get('/users', async (req,res) => {

    const users = await userModel.find()
    res.send(users) 
})

app.post('/save', async (req,res) => {

    const user  = req.body

   const newUser = new userModel(user)
    await newUser.save()
    console.log("Added Successfully...")
    res.json(user)
    console.log(user)
   
  
   

})


app.listen(PORT, () => {
    console.log(`Server started, listening to port: ${PORT}`);
})