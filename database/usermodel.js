const mongoose = require('mongoose')
const {Schema} = mongoose
const userSchema = new Schema({
  username: { type: String, required: true, unique: true , trim : true , lowercase: true },
  email: { type: String, required: true, unique: true , trim : true , select : false},
  password: { type: String, required: true , trim : true ,select : false},
  fullName: String,
  bio: String,
  profilePicture: String,
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  isPrivate: { type: Boolean, default: false }
} ,{ timestamps: true ,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.email;
        delete ret.__v;
        return ret;
      }
    },
    toObject: {
    transform(doc, ret) {
      delete ret.password;
      delete ret.email;
      delete ret.__v;
      return ret;
    }
  }
});

module.exports = mongoose.model("user", userSchema);