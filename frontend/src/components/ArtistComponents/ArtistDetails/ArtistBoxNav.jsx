export default function ArtistBoxNav({ artistActiveTab, setArtistActiveTab }) {
  return (
    <div className="artist-box-details-nav">
      <div
        onClick={() => setArtistActiveTab("home")}
        className={`artist-box-details-nav-same ${
          artistActiveTab === "home" ? "artist-tab-active" : ""
        }`}
      >
        Home
      </div>

      <div
        onClick={() => setArtistActiveTab("albums")}
        className={`artist-box-details-nav-same ${
          artistActiveTab === "albums" ? "artist-tab-active" : ""
        }`}
      >
        Albums
      </div>

      <div
        onClick={() => setArtistActiveTab("singles")}
        className={`artist-box-details-nav-same ${
          artistActiveTab === "singles" ? "artist-tab-active" : ""
        }`}
      >
        Singles & EPs
      </div>

      <div
        onClick={() => setArtistActiveTab("about")}
        className={`artist-box-details-nav-same ${
          artistActiveTab === "about" ? "artist-tab-active" : ""
        }`}
      >
        About
      </div>
    </div>
  );
}
