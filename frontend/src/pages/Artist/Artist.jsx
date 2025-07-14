import "./Artist.css";
import { useEffect, useState } from "react";
import { PlayIcon } from "@phosphor-icons/react";
import ArtistHeader from "../../components/ArtistComponents/ArtistHeader/ArtistHeader";
import ArtistDetail from "../../components/ArtistComponents/ArtistDetails/ArtistDetail";
import ErrorSection from "../../components/ErrorPage/Error";
import { useParams } from "react-router-dom";

export default function Artist({ setCurrentSong, currentSong }) {
  const [artistData, setArtistData] = useState(null);
  const [artistActiveTab, setArtistActiveTab] = useState("home");
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    setArtistData(null);
    fetch(`http://localhost:3001/artist?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArtistData(data);
      });
  }, [id]);

  if (
    !artistData ||
    artistData == undefined ||
    artistData.error ==
      "Server returned HTTP 400: Bad Request.\nRequest contains an invalid argument."
  )
    return <ErrorSection currentSong={currentSong} />;

  return (
    <div className={`artist ${currentSong ? "mini" : ""}`}>
      <div className="artist-box">
        <ArtistHeader artistData={artistData} PlayIcon={PlayIcon} />
        <ArtistDetail
          artistActiveTab={artistActiveTab}
          artistData={artistData}
          setArtistActiveTab={setArtistActiveTab}
          setCurrentSong={setCurrentSong}
        />
      </div>
    </div>
  );
}
