import "./ArtistDetail.css";
import ArtistBoxNav from "./ArtistBoxNav";
import SongCard from "../../UI/SongCard/SongCard";
import AlbumCard from "../../UI/AlbumCard/AlbumCard";

import { useNavigate } from "react-router-dom";

export default function ArtistDetail({
  artistActiveTab,
  artistData,
  setArtistActiveTab,
  setCurrentSong,
}) {
  const navigate = useNavigate();

  const handleArtistSong = async (songOrAlbum) => {
    if (songOrAlbum.videoId || songOrAlbum.id) {
      navigate(`/song/${songOrAlbum.id || songOrAlbum.videoId}`);
    } else if (songOrAlbum.browseId) {
      navigate(`/album/${songOrAlbum.browseId}`);
    }
  };

  return (
    <div className="artist-box-details">
      <ArtistBoxNav
        setArtistActiveTab={setArtistActiveTab}
        artistActiveTab={artistActiveTab}
      />

      <div className="artist-box-details-divider"></div>

      <div className="artist-box-details-container">
        {artistActiveTab === "home" && (
          <div className="artist-box-details-container-home">
            <div className="artist-most-popular">
              <p>Most popular</p>
              <div className="artist-most-popular-box">
                {artistData?.songs.map((song, i) => {
                  return (
                    <div
                      key={`song-${song.id || i}`}
                      className="artist-most-popular-songs"
                      onClick={() => setCurrentSong(song)}
                    >
                      <p className="artist-most-popular-song-index">{i + 1}</p>
                      <div className="artist-most-popular-song-img">
                        <img src={song?.thumbnail} />
                      </div>
                      <div className="artist-most-popular-song-info">
                        <p className="artist-most-popular-song-title">
                          {song?.title}
                        </p>
                        <p className="artist-most-popular-song-artist">
                          {song?.artist}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {artistActiveTab === "albums" && (
          <div className="artist-box-details-container-singles">
            {artistData?.albums.map((album, i) => {
              return (
                <AlbumCard
                  key={album.browseId || i}
                  song={album}
                  setCurrentSong={setCurrentSong}
                />
              );
            })}
          </div>
        )}

        {artistActiveTab === "singles" && (
          <div className="artist-box-details-container-singles">
            {artistData?.singles.map((single, i) => {
              return (
                <AlbumCard
                  key={single.browseId || i}
                  song={single}
                  onClick={() => handleArtistSong(single)}
                />
              );
            })}
          </div>
        )}

        {artistActiveTab === "about" && (
          <div className="artist-box-details-container-about">
            <p className="artist-box-details-container-about-name">
              About {artistData?.name}
            </p>
            <p>{artistData?.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
