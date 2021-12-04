const mongoose = require('mongoose');
const Schema = mongoose.Schema

const blogSchema = new Schema({
    resim: {
        type: String,
        require: true
    },
    
    baslik: {
        type: String,
        require: true
    },

    yazi:{
        type: String,
        require: true
    },
    goruntulenme: {
        type: Number,
        require: true
    },

    blog_date: {
        type:String,
        require: true
    },

    yorumlar: [{name:String, message:String, tarih:String}]



});

const blog = mongoose.model('blog',blogSchema);
module.exports = blog;

