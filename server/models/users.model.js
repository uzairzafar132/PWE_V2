const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const zipdataSchema=new Schema(
{
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
   
    },
    phone: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
   
    },

    timeZone: {
        type: String,
        trim: true,
   
    },
    hourlyrate: {
        type: String,
        trim: true,
    },
    perpatientrate: {
        type: String,
        trim: true,
    },
    paidtype: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        trim: true,
   
    },


    
},{
    timestamps: true,
});

const Users = mongoose.model('users',zipdataSchema);
module.exports=Users;