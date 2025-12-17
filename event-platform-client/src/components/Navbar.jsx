import { Link } from "react-router-dom";

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    marginRight: "16px",
  };

  return (
    <nav
      style={{
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#020617",
        color: "white",
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: 600 }}>
        Event Platform
      </Link>

      <div>
        {!isAuthenticated ? (
          <>
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
            <Link to="/register" style={{ ...linkStyle, marginRight: 0 }}>
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/create" style={linkStyle}>
              Create Event
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: "#ef4444",
                border: "none",
                padding: "6px 12px",
                color: "white",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
