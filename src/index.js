// ------------------------MONGOOSE BUILT-IN VALIDATION-------------------------

// REQUARING MONGOOSE
const mongoose = require ("mongoose");


// CREATING CONNECTION AND A database
mongoose.connect("mongodb://localhost:27017/udemy",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then( () => console.log("connection successful..."))
  .catch( (err) => console.log(err));


// DEFINING SCHEMA
// -----------VALIDATION----------------
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: [4, "minimum length should be 5"],
    maxlenght: [20, "maxlenght should be 20"]
  },
  courseType: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["frontend", "backend", "database", "UIUX"]
  },
  videos: {
    type: Number,
    // Custom validator
    validate(value){
      if(value < 0) {
        throw new Error("value can't be a negative number")
      }
    }
    // validate: {
    //   validator: function (value){
    //     return value.lenght < 0
    //   },
    //   message: "value can't be negative"
    // }
  },
  author: String,
  active: Boolean,
  date: {
    type: Date,
    default: Date.now()
  }
})


// MODEL
// COLLECTION CREATION
const Course = new mongoose.model("Course", courseSchema)


// CREATING AND INSERTING DOCUMENTS
const createDocument = async () => {
  try{
    const course4 = new Course({
      name: "React.Js",
      courseType: "frontend",
      videos: 77,
      author: "Codevolution",
      active: true,
    })
    const result = await Course.insertMany([course4])
    console.log(result)
    console.log("successfully inserted...")
  }catch(err){
    console.log(err)
  }
}

// CALLING THE CREATE DOCUMENTS FUNCTION
createDocument();