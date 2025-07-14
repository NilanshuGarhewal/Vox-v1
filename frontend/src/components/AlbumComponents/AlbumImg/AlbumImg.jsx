import "./AlbumImg.css";

export default function AlbumImg({ album }) {
  return (
    <div className="album-img">
      <div className="album-image">
        <img src={album.thumbnail} alt={album.title} />
      </div>

      <div className="album-artist">
        <div className="abc">
          <img src={album.thumbnail} alt="artist" />
          <p>{album.artist}</p>
        </div>
      </div>
    </div>
  );
}
