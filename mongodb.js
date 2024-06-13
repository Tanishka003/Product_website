const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/Signup'; // Replace 'demo' with your database name if it's different

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

const SignupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const collection = mongoose.model('collection1', SignupSchema);

module.exports = {
  connectDB,
  collection
};


// const mongoose = require('mongoose');

// const mongoURI = 'mongodb://localhost:27017/demo'; // Replace 'demo' with your database name if it's different

// const connectDB = async () => {
//   try {
//     await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     process.exit(1); // Exit process with failure
//   }
// };
// const SignupSchema = new mongoose.Schema({
//   name:{
//     type:String,
//     required:true
//   },
//   email:{
//     type:String,
//     required:true
//   },
//   password:{
//     type:String,
//     required:true
//   },
// });

// const collection = new moongose.model('collection1', SignupSchema)

// module.exports = collection;