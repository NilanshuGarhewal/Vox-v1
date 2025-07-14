import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./Queue.css";

import { ListIcon, TrashIcon } from "@phosphor-icons/react";

export default function SortableSong({
  song,
  index,
  isCurrent,
  onClick,
  currentIndex,
  onRemove,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: song.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={`queue-song ${index === currentIndex ? "current" : ""}`}
      ref={setNodeRef}
      style={style}
      onClick={onClick} // now click works!
    >
      <span className="queue-box">
        <div className="queue-index">{index + 1}</div>

        <img
          className="queue-song-img"
          src={song.albumThumbnail || song.thumbnail}
        />

        <div className="queue-song-info">
          <p className="queue-song-title">{song.title}</p>
          <p className="queue-song-artist">{song.artist}</p>
        </div>
      </span>

      <p className="queue-song-duration">{song.duration}</p>

      {/* ✅ Only drag handle gets listeners */}
      <span
        className="queue-song-list-icon"
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
      >
        <ListIcon weight="bold" size={20} />
      </span>
      <span
        className="queue-song-remove"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(song.id);
        }}
      >
        <TrashIcon weight="bold" size="20" />
      </span>
    </div>
  );
}
