const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    dateTime: {
      type: Date,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    capacity: {
      type: Number,
      required: true,
      min: 1
    },
    image: {
      type: String, // image URL (Cloudinary / local)
       default:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
