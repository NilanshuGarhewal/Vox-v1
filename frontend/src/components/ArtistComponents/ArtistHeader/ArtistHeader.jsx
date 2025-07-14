import "./ArtistHeader.css";

export default function ArtistHeader({ artistData, PlayIcon }) {
  return (
    <div className="artist-box-header">
      <div className="artist-box-img">
        <img
          src={
            artistData?.thumbnails?.[artistData?.thumbnails?.length - 1]?.url
          }
          alt=""
        />
      </div>
      <div className="artist-box-header-details">
        <div className="artist-box-side-a">
          <p className="artist-box-side-a-name">{artistData?.name}</p>
          <p className="artist-box-side-a-views">{artistData?.views}</p>
        </div>
        <div className="artist-box-side-b">
          <span className="artist-box-side-b-span">
            <button className="artist-box-side-b-span-icon">
              <PlayIcon weight="fill" size={16} />
            </button>
            <button className="artist-box-side-b-span-follow">Follow</button>
          </span>
        </div>
      </div>
    </div>
  );
}
