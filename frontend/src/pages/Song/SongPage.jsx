import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SongPage.css";
import SongBoxOne from "../../components/SongComponents/SongBoxOne/SongBoxOne";
import SongBoxTwo from "../../components/SongComponents/SongBoxTwo/SongBoxTwo";
import ErrorSection from "../../components/ErrorPage/Error";

export default function SongPage({ setCurrentSong, currentSong }) {
  const [songData, setSongData] = useState(null);
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("lyrics");

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3001/getSongFromSearch?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.error) {
          console.warn("Song fetch failed or not found");
          return;
        }

        setSongData(data);
      });
  }, [id]);

  if (!songData || songData.title == "Unknown Title")
    return <ErrorSection currentSong={currentSong} />;

  return (
    <div className={`song-page ${currentSong ? "mini" : ""}`}>
      {/* Blurred Background */}
      <div className="blurred-parent">
        <div
          className="blurred-bg"
          style={{
            backgroundImage: `url(${songData?.thumbnail})`,
          }}
        />
      </div>

      <div className="song-container">
        <SongBoxOne songData={songData} setCurrentSong={setCurrentSong} />
        <SongBoxTwo
          songData={songData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
}
