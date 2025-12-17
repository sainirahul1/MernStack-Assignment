const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");

// Public: View all events
router.get("/", getAllEvents);

// Protected: Create event
router.post("/", authMiddleware, createEvent);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

const { joinEvent } = require("../controllers/event.controller");

router.post("/:id/rsvp", authMiddleware, joinEvent);

const { leaveEvent } = require("../controllers/event.controller");

router.post("/:id/leave", authMiddleware, leaveEvent);

module.exports = router;
