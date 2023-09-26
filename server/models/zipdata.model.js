const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const zipdataSchema=new Schema(
{
    zipcode: {
        type: String,
        unique: true,
    },
    location: {
        type: String,
        trim: true,
   
    },
    county: {
        type: String,
        trim: true,
   
    },
    state: {
        type: String,
        trim: true,
   
    },
    city: {
        type: String,
        trim: true,
   
    },


    
},{
    timestamps: true,
});

const Zipdata = mongoose.model('zipdata',zipdataSchema);
module.exports=Zipdata;