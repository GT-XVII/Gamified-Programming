import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404 - Page Not Found</h1>
      <p style={styles.text}>Oops! The page you are looking for doesn't exist.</p>
      <Link to="/" style={styles.button}>
        Back to Home
      </Link>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: "center",
    padding: "3rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: "3rem",
    color: "#007bff", 
    marginBottom: "1rem",
  },
  text: {
    fontSize: "1.25rem",
    color: "#555",
    marginBottom: "2rem",
  },
  button: {
    padding: "0.75rem 2rem",
    backgroundColor: "#007bff", 
    color: "#fff",
    textDecoration: "none",
    borderRadius: "0.25rem",
    fontSize: "1rem",
  },
};

export default NotFound;
