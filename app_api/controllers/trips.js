const mongoose = require("mongoose");
const Trip = require("../models/travlr");
const Model = mongoose.model("trips");

const tripsList = async (req, res) => {
  const q = await Model.find({}).exec();

  if (!q) {
    return res.status(404).json({ message: "Trips not found" });
  } else {
    return res.status(200).json(q);
  }
};

const tripsFindByCode = async (req, res) => {
  const q = await Model.find({ code: req.params.tripCode }).exec();

  if (!q) {
    return res.status(404).json({ message: "Trip not found" });
  } else {
    return res.status(200).json(q);
  }
};

const tripsUpdateTrip = async (req, res) => {
  try {
    const q = await Model.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
      }
    ).exec();

    if (!q) {
      return res.status(404).json({ message: "Trip not found" });
    } else {
      // Broadcast the update
      req.app.get('broadcast')({ type: 'tripUpdated', tripCode: req.params.tripCode });
      return res.status(200).json(q);
    }
  } catch (error) {
    console.error("Error updating trip:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const tripsAddTrip = async (req, res) => {
  const newtrip = new Trip({
    code: req.body.code,
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
    resort: req.body.resort,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description,
  });

  const q = await newtrip.save();

  if (!q) {
    return res.status(400).json({ message: "Error adding trip" });
  } else {
    // Broadcast the new trip
    req.app.get('broadcast')({ type: 'tripAdded', trip: q });
    return res.status(201).json(q);
  }
};

const tripsDeleteTrip = async (req, res) => {
  try {
    const tripId = req.params.tripId;
    console.log("Trip ID received by backend:", tripId); 

    const deletedTrip = await Model.findByIdAndDelete(tripId).exec();

    if (!deletedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    } else {
      // Broadcast the deletion
      req.app.get('broadcast')({ type: 'tripDeleted', tripId: req.params.tripId });
      return res.status(200).json({ message: "Trip deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting trip:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip,
};