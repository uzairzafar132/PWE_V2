// Route to get all facilities
const router = require("express").Router();
const Facility = require("../models/Map");


router.get("/facilities", async (req, res) => {
  try {
    const facilities = await Facility.find();

    // console.log(facilities);
    res.json(facilities);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching facilities from the database" });
  }
});

module.exports = router
