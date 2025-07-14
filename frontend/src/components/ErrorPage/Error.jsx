import "./Error.css";

export default function ErrorSection({ message, currentSong }) {
  return (
    <div className={`error-section ${currentSong ? "mini" : ""}`}>
      <div className="error-box">
        <p className="err-logo">VOX</p>
        <p className="err-message">{message}</p>
      </div>
    </div>
  );
}
