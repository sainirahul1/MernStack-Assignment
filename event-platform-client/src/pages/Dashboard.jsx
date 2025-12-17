import { useEffect, useState } from "react";
import api from "../api/api";
import "./Dashboard.css";
import { toast } from "react-toastify";

const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  } catch {
    return null;
  }
};

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = getUserIdFromToken();

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleJoin = async (id) => {
    try {
      await api.post(`/events/${id}/rsvp`);
      toast.success("Successfully joined event");
      fetchEvents();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to join event");
    }
  };

  const handleLeave = async (id) => {
    try {
      await api.post(`/events/${id}/leave`);
      toast.info("You left the event");
      fetchEvents();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to leave event");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await api.delete(`/events/${id}`);
      toast.success("Event deleted successfully");
      fetchEvents();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return <p style={{ padding: 24 }}>Loading events...</p>;
  }

  return (
    <div className="dashboard">
      <h1 className="page-title">Upcoming Events</h1>

      <div className="event-grid">
        {events.map((event) => {
          const isCreator = event.createdBy?._id === userId;
          const isJoined = event.attendees.includes(userId);
          const isFull = event.attendees.length >= event.capacity;

          return (
            <div className="event-card" key={event._id}>
              <img
                src={event.image || "https://via.placeholder.com/400x200"}
                alt={event.title}
                className="event-image"
              />

              <div className="event-content">
                <h3>{event.title}</h3>
                <p>{event.description}</p>

                <p>
                  👥 {event.attendees.length} / {event.capacity}
                </p>

                <div className="event-footer">
                  <span>📍 {event.location}</span>

                  {userId && !isCreator && (
                    <>
                      {!isJoined ? (
                        <button
                          disabled={isFull}
                          onClick={() => handleJoin(event._id)}
                        >
                          {isFull ? "Full" : "Join"}
                        </button>
                      ) : (
                        <button onClick={() => handleLeave(event._id)}>
                          Leave
                        </button>
                      )}
                    </>
                  )}

                  {isCreator && (
                    <button onClick={() => handleDelete(event._id)}>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
