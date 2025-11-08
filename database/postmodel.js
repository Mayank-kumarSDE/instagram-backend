const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    imageurl : {type :String , required : true},
    caption :{type : String},
    author :{type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: "user"}]
},{ timestamps: true })
module.exports = mongoose.model("Post", postSchema);
