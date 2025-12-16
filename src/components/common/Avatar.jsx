import { API_ORIGIN } from "../../config/api";

export default function Avatar({ src, size = 120 }) {
  const url = src ? `${API_ORIGIN}${src}` : `${API_ORIGIN}/uploads/avatars/default.png`;

  return (
    <img
      src={url}
      alt="Profile"
      className="rounded-circle"
      style={{ width: size, height: size, objectFit: "cover" }}
      onError={(e) => {
        e.currentTarget.src = `${API_ORIGIN}/uploads/avatars/default.png`;
      }}
    />
  );
}
