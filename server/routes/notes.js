const router = require("express").Router();
let Notes = require('../models/doctornotes.model');





router.route('/findalldocnotes/:email/:date').get((req,res)=>{

   
    Notes.find({email:req.params.email,date:req.params.date})
.then(User=>{

  res.json(User);

})
.catch(err => res.status(400).json('Error:'+err));
});

router.route('/notesrange/:email/:datestart/:dateend').get((req,res)=>{

   
  Notes.find({email:req.params.email,date:{$gte:req.params.datestart,$lte:req.params.dateend}})
.then(User=>{

res.json(User);

})
.catch(err => res.status(400).json('Error:'+err));
});



router.route('/all').get((req,res)=>{
    Notes.find()
.then(per=> res.json(per))
.catch(err => res.status(400).json('Error:'+err));
});


router.route('/update/:email/:date').post((req,res)=>{
   
console.log(req.params.date);
  
console.log(req.params.email);
  Notes.find({date: req.params.date,email: req.params.email})
.then(NotesList=> {
 console.log("found")
 console.log(NotesList);

 if(NotesList.length>0){
  Notes.findById(NotesList[0]._id)
  .then(not=> {


    console.log("if")
           

    not.date=req.body.date;
    not.notes = req.body.notes;
    not.email = req.body.email;
 
          
    not.save()
           .then(()=> res.json("Update Successfully"))
           .catch(err => {
          res.status(400).json('Error:'+err)
           });
})
 }else{
  console.log("else")
  const notes = req.body.notes;
  const email = req.body.email;
  const date = req.body.date;


const newEmailadd = new Notes({notes,email,date});

newEmailadd.save()
.then(()=> res.json("Update Successfully"))
.catch(err => {
res.status(400).json('Error:'+err)

});


 }
 })



.catch(err => res.status(400).json('Error:'+err));
})




router.route('/add').post((req,res)=>{
  
   


  const notes=req.body.notes;
  const email= req.body.email;
  const date= req.body.date;

  const UserNew = new Notes({notes,email,date});

  UserNew.save()
  .then(()=> res.json(UserNew))
  .catch(err => res.status(400).json('Error:'+err));

});

router.route('/:id').delete((req,res)=>{

    Notes.findByIdAndDelete(req.params.id)
.then(Device=>{

  res.json('Notes Deleted')

})
.catch(err => res.status(400).json('Error:'+err));
});

module.exports = router;