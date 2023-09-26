const router = require("express").Router();
let User = require('../models/users.model');




router.route('/findbyemail/:id').post((req,res)=>{

   
  User.find({email:req.params.id})
  .then(per=> res.json(per))
.catch(err => res.status(400).json('Error:'+err));
});


router.route('/findalldoc').get((req,res)=>{

   
  User.find({role:"Doctor"})
.then(User=>{

  res.json(User);

})
.catch(err => res.status(400).json('Error:'+err));
});



router.route('/all').get((req,res)=>{
  User.find()
.then(per=> res.json(per))
.catch(err => res.status(400).json('Error:'+err));
});


router.route('/update/:id').post((req,res)=>{
   

console.log(req.body)
  User.findById(req.params.id)
  .then(User=> {
   
    User.hourlyrate=req.body.hourlyrate;
    User.perpatientrate=req.body.perpatientrate;
    User.paidtype=req.body.paidtype;
    User.name=req.body.name;
    User.timeZone=req.body.timeZone;
    User.email = req.body.email;
    User.phone=req.body.phone;
    User.password = req.body.password;
    User.role = req.body.role;
    User.save()
  .then(Site=> res.json('User Data Updated'))
  .catch(err => res.status(400).json('Error:'+err));

  })


});





router.route('/add').post((req,res)=>{
  
   
console.log(req.body)
const hourlyrate =req.body.hourlyrate;
const perpatientrate =req.body.perpatientrate;
const paidtype =req.body.paidtype;
  const name=req.body.name;
  const timeZone= req.body.timeZone;
  const email = req.body.email;
  const phone=req.body.phone;
  const password = req.body.password;
  const role = req.body.role;

  const UserNew = new User({hourlyrate,perpatientrate,paidtype,timeZone,name,email,phone,password,role});

  UserNew.save()
  .then(()=> res.json(UserNew))
  .catch(err => res.status(400).json('Error:'+err));

});

router.route('/:id').delete((req,res)=>{

  User.findByIdAndDelete(req.params.id)
.then(Device=>{

  res.json('User Deleted')

})
.catch(err => res.status(400).json('Error:'+err));
});

module.exports = router;