const mongoose = require("mongoose");


// connection creation and creating a new DB
mongoose.connect("mongodb://localhost:27017/college",
    { useNewUrlParser: true ,
    useUnifiedTopology: true }
    )
    .then(() => console.log("connection successful..."))
    .catch((err) => console.log(err));


// Schema
// a mongoose schema defines the struture of the document, default values, validators etc.
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: String,
  active: Boolean,
  marks: Number,
  date: {
    type: Date,
    default: Date.now()
  }
})

// Model
// a mongoose model provides an interface to the database for the database for creating, querying, updating, deleting records etc.

// Collection creation
const Student = new mongoose.model("Student", studentSchema);

// creating and inserting a document
const createDocument = async () => {
  try{
    const student1 = new Student({
      name: "rahul",
      marks: 33,
      address: "lucknow",
      active: true,
    })
    const student2 = new Student({
      name: "kabir",
      marks: 85,
      address: "delhi",
      active: true,
    })
    const student3 = new Student({
      name: "roy",
      marks: 99,
      address: "trivendrum",
      active: true,
    })
    const student4 = new Student({
      name: "vikram",
      marks: 100,
      address: "banglore",
      active: true,
    })
    const student5 = new Student({
      name: "k",
      marks: 88,
      address: "kochi",
      active: true,
    })

    const result = await Student.insertMany([student1,student2,student3, student4, student5])
    console.log(result)
    console.log("successfully inserted...")
  }
  catch(err){
    console.log(err)
  }
}

// createDocument();


// reading the documents or collection

// const readDocuments = async () => {
//   try{
//     const result = await Student.find({name:"rahul"})
//     .select({name: 1, _id: 0})
//     console.log(result)
//   }catch(err){
//     console.log(err)
//   }
// }

// readDocuments();


// COMPARISON QUERY OPERATORS
// ------------------------------
// $eq - equal to
// $gt - greater than
// $gte - greater than or equal to
// $lt - less than
// $lte - less than or equal to
// $ne - not equal to
// $in - matches any of the values specified in an Array
// $nin - matches nont of the values specified in an Array


// const readDocuments = async() => {
//   try{
//     const result = await Student
//     .find({marks: {$gte: 80}})
//     .select({name:1})
//     console.log(result)
//   }catch(err){
//     console.log(err)
//   }
// }
// readDocuments();

// const readDocuments = async () => {
//   try{
//     const result = await Student
//     .find({address: {$in: ["lucknow","delhi"]}})
//     .select({name: 1})
//     console.log(result);
//   }catch(err){
//     console.log(err)
//   }
// }
// readDocuments();



// LOGICAL QUERY OPERATORS
// ---------------------------
// $and
// $or
// $not
// $nor

// const readDocuments = async () => {
//   try{
//     const result = await Student
//     .find({$or : [{name:"rahul"},{address:"delhi"}]})
//     console.log(result)
//   }
//   catch(err){
//     console.log(err)
//   }
// }
// readDocuments()


//COUNT QUERY
// const readDocuments = async () => {
//   try{
//     const result = await Student
//     .find({$or : [{name:"rahul"},{address:"delhi"}]})
//     .countDocuments()
//     console.log(result)
//   }
//   catch(err){
//     console.log(err)
//   }
// }
// readDocuments()


// SORTING QUERY
const readDocuments = async () => {
  try{
    const result = await Student
    .find({$or : [{name:"rahul"},{address:"delhi"}]})
    .sort({name: 1})
    console.log(result)
  }
  catch(err){
    console.log(err)
  }
}
readDocuments()


// UPDATE THE DOCUMENTS
const updateDocument = async (_id) => {
  try{
    const result = await Student.updateOne(
      {_id}, {$set: {name: "Rahul s"}}
    )
    console.log(result)
  }catch(err){
    console.log(err)
  }
}

updateDocument("601f7c418dcc331bb8c592ec")


// DELETE THE DOCUMENTS
// const deleteDocument = async (_id) => {
//   try{
//     const result = await Student.deleteOne({_id})
//     console.log(result)
//   }catch(err){
//     console.log(err)
//   }
// }

// deleteDocument("601f7c418dcc331bb8c592ec")


// FINDBYIDANDDELETE()
const deleteDocument = async (_id) => {
  try{
    const result = await Student.findByIdAndDelete({_id})
    console.log(result)
  }catch(err){
    console.log(err)
  }
}

deleteDocument("601f7c418dcc331bb8c592ed")