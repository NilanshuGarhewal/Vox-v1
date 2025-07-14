import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableSong from "./SortableSong"; // new component
import "./Queue.css";

export default function Queue({
  queue,
  setQueue,
  currentIndex,
  setCurrentIndex,
  setCurrentSong,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = queue.findIndex((song) => song.id === active.id);
      const newIndex = queue.findIndex((song) => song.id === over.id);
      const newQueue = arrayMove(queue, oldIndex, newIndex);
      setQueue(newQueue);

      // Also update currentIndex if needed
      if (currentIndex === oldIndex) {
        setCurrentIndex(newIndex);
      } else if (
        currentIndex >= Math.min(oldIndex, newIndex) &&
        currentIndex <= Math.max(oldIndex, newIndex)
      ) {
        // Adjust currentIndex if it shifts due to reordering
        const direction = oldIndex < newIndex ? -1 : 1;
        setCurrentIndex((prev) => prev + direction);
      }
    }
  };

  return (
    <div className="queue">
      <div className="queue-section">
        <div className="queue-heading">
          <p>Queue</p>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={queue.map((song) => song.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="queue-list">
              {queue.map((song, index) => (
                <SortableSong
                  key={song.id}
                  song={song}
                  index={index}
                  isCurrent={index === currentIndex}
                  onClick={() => {
                    setCurrentIndex(index);
                    setCurrentSong(song);
                  }}
                  onRemove={(id) => {
                    const updatedQueue = queue.filter((s) => s.id !== id);
                    setQueue(updatedQueue);

                    // optional: fix currentIndex if needed
                    if (index < currentIndex) setCurrentIndex(currentIndex - 1);
                    if (index === currentIndex) {
                      setCurrentIndex(0);
                      setCurrentSong(updatedQueue[0]);
                    }
                  }}
                  currentIndex={currentIndex}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
