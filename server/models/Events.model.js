const mongoose = require("mongoose");

const EventsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  ends: {
    type: String,
  },
  repeats: {
    type: Number,
  },
});

const Events = mongoose.model("events", EventsSchema);

module.exports = Events;
