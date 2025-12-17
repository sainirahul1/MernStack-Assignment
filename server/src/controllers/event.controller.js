const Event = require("../models/Event");

// CREATE EVENT (Protected)
exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      dateTime,
      location,
      capacity,
      image
    } = req.body;

    // Basic validation
    if (!title || !description || !dateTime || !location || !capacity) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const event = await Event.create({
      title,
      description,
      dateTime,
      location,
      capacity,
      image,
      createdBy: req.user.id   // ownership
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET ALL EVENTS (Public)
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "name email")
      .sort({ dateTime: 1 });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// UPDATE EVENT (Owner only)
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Ownership check
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this event" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// DELETE EVENT (Owner only)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Ownership check
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this event" });
    }

    await event.deleteOne();

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// RSVP - JOIN EVENT (Protected, concurrency-safe)
exports.joinEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      {
        _id: req.params.id,
        $expr: { $lt: [{ $size: "$attendees" }, "$capacity"] },
        attendees: { $ne: req.user.id }
      },
      {
        $addToSet: { attendees: req.user.id }
      },
      { new: true }
    );

    if (!event) {
      return res.status(400).json({
        message: "Event full or already joined"
      });
    }

    res.json({
      message: "Successfully joined event",
      attendeesCount: event.attendees.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// RSVP - LEAVE EVENT (Protected)
exports.leaveEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $pull: { attendees: req.user.id } },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({
      message: "Successfully left event",
      attendeesCount: event.attendees.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
