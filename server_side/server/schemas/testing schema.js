const mongoose = require('mongoose');

const reqtsring = {
    type:String,
    required: true
}

const userSchema = mongoose.Schema( {
    name: reqtsring,
    password: reqtsring
})

const uploadSchema = new mongoose.Schema({
    filename : {
        type : String,
        required: true
    },
    contentType : {
        type: String,
        required : true
    },
    imageBase64 : {
        type : String,
        required: true
    }
})

module.exports = UploadModel = mongoose.model('uploads', uploadSchema);
module.exports = mongoose.model('users', userSchema);
