// -------------------------------NPM VALIDATOR----------------------------------

// REQUARING PACKAGES
const mongoose = require ("mongoose");
const validator = require("validator");


// CREATING CONNECTION AND A DATABASE
mongoose.connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then( () => console.log("connection successful..."))
.catch( (err) => console.log(err))


// DEFINING SCHEMA
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [4, "minimum length should be 5"],
      maxlenght: [20, "maxlenght should be 20"]
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("please Enter correct email !!")
        }
      }
    }
    // password: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   validate(value){
    //     if(!validator.isStrongPassword(value)){
    //       throw new Error("please Enter a strong password with { minLength: 8,        minLowercase:  1, minUppercase: 1, minNumbers: 1, minSymbols: 1}")
    //     }
    //   }
    // }
})


// MODEL
// COLLECTION CREATION
const User = new mongoose.model("user", userSchema)


// CREATING AND INSERTING DOCUMENTS
const createDocument = async () => {
  try{
    const user1 = new User({
      name: "Rahul",
      email: "rahul@gmail.com",
      // password: "RRahul@12345@"
    })
    const result = await User.insertMany([user1])
    console.log(result)
    console.log("successfully inserted...")
  }catch(err){
    console.log(err)
  }
}

createDocument();