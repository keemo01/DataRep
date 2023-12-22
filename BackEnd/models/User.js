const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
    name : String,
    email: String,
    password: String
})

const FormDataModel = mongoose.model('log_reg_form', UserDataSchema);

module.exports = FormDataModel;