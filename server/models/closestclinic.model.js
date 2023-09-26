const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const closestclinic=new Schema(
{

    clinic: {
        type: String,
        trim: true,
        unique: true,
    }
    
},{
    timestamps: true,
});

const ClosestClinic = mongoose.model('closestclinic',closestclinic);
module.exports=ClosestClinic;