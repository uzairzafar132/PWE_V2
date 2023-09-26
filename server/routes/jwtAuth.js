
const router = require("express").Router();
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/authorization");
let User = require('../models/users.model');


//login route
router.post("/login",validInfo,async (req,res)=>{
    try{

      console.log(req.body.email);
      console.log(req.body.password);

        User.find({email:req.body.email,password:req.body.password}).then(user=>{
          console.log(user);
          if(user.length>0){
          const token = jwtGenerator(user[0]._id);
          console.log("token");
          console.log(token);
          res.json({ token });
          }else{
            res.json("User Not Found");
          }
        });

       

    }catch(err){
        console.log(err.message);
        res.status(500).send("server error");

    }

});



router.post("/changestate", async(req, res) => {
    try {

      console.log(req.body);
      
        const {user_state,user_id}=req.body;

   
        console.log(user_state);

      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


router.post("/verify", authorize, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

module.exports = router;