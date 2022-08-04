import { Link } from "react-router-dom";

export const LandingPage = () => {
  const linkStyle = { margin: 10 };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link style={linkStyle} to="/logs">
        View Logs
      </Link>
      <Link style={linkStyle} to="/network">
        View Network Performance
      </Link>
    </div>
  );
};
