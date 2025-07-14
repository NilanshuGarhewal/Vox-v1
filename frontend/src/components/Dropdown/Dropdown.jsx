import "./Dropdown.css";
import { highlight, renderItem, renderArtist } from "./dropdownUtils";

export default function Dropdown({
  filteredSongs = [],
  filteredAlbums = [],
  filteredArtists = [],
  onSelect,
}) {
  const hasResults =
    filteredSongs.length || filteredAlbums.length || filteredArtists.length;

  return (
    <div className={`search-result ${hasResults ? "show" : ""}`}>
      <span className="search-res-box">
        {filteredSongs.length > 0 && (
          <>
            <p className="result-section-heading">Songs</p>
            {filteredSongs.map((song, i) =>
              renderItem(song, i, "song", onSelect, highlight)
            )}
          </>
        )}
      </span>

      <span className="search-res-box">
        {filteredAlbums.length > 0 && (
          <>
            <p className="result-section-heading">Albums</p>
            {filteredAlbums.map((album, i) =>
              renderItem(album, i, "album", onSelect, highlight)
            )}
          </>
        )}

        {filteredArtists.length > 0 && (
          <>
            <p className="result-section-heading">Artists</p>
            {filteredArtists.map((artist, i) =>
              renderArtist(artist, i, "artist", onSelect, highlight)
            )}
          </>
        )}
      </span>

      {!hasResults && (
        <div className="search-result-item">No results found</div>
      )}
    </div>
  );
}
