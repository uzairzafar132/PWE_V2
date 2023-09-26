const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const doctornotes=new Schema(
{
    notes: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    date: {
        type: String,
        trim: true,
    }
    
    
},{
    timestamps: true,
});

const Notes = mongoose.model('doctornotes',doctornotes);
module.exports=Notes;