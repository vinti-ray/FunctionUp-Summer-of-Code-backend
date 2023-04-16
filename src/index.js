const express= require("express")

const app =express(); 
const mongoose=require('mongoose')
const route=require("./routes/route")
const cors=require("cors")
const multer=require("multer")

app.use(express.json())
app.use(express. urlencoded({ extended: true }))
 app.use(cors()) 
 app.use(multer().any())
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://vintiray:7091201680@cluster0.ahtxrqr.mongodb.net/user", {
    useNewUrlParser: true
})

.then( () => console.log("MongoDb is connected")) 
.catch ( err => console.log(err) )



app.use('/',route) 

 


app.listen(3001 , function(){
    console.log('Express app running on port ' +(3001))
}
)