import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--bg-surface)",
        borderTop: "1px solid var(--border-subtle)",
      }}
      className="py-3 mt-auto"
    >
      <div className="container text-center">
        <small className="text-muted">
          © CIT02 Camille & Olga - 2025
        </small>
      </div>
    </footer>
  );
}
