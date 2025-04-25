const { default: mongoose } = require("mongoose")
const moongose = require("mongoose")


const connection = mongoose.connect("mongodb://127.0.0.1:27017/blogData")

module.exports=connection