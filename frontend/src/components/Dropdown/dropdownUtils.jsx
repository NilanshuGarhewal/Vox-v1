export function highlight(text, matchIndices) {
  if (!matchIndices?.length) return text;

  let result = "";
  let lastIndex = 0;

  for (const [start, end] of matchIndices) {
    result += text.slice(lastIndex, start);
    result += `<mark>${text.slice(start, end + 1)}</mark>`;
    lastIndex = end + 1;
  }
  result += text.slice(lastIndex);
  return result;
}

export function renderItem(result, index, type, onSelect, highlightFn) {
  const { item, matches } = result;

  const nameMatch = matches?.find((m) => m.key === "name" || m.key === "title");
  const artistMatch = matches?.find((m) => m.key === "artist");

  return (
    <div
      key={`${type}-${index}`}
      className="search-result-item"
      onClick={() => onSelect(item, type)}
    >
      <img
        src={item.thumbnail || "./fallback.png"}
        className="result-thumb"
      />
      <div className="result-details">
        <p
          className="result-title"
          dangerouslySetInnerHTML={{
            __html: highlightFn(
              type === "artist" ? item.name : item.title,
              nameMatch?.indices
            ),
          }}
        />
        {type !== "artist" && (
          <p
            className="result-artist"
            dangerouslySetInnerHTML={{
              __html: highlightFn(item.artist, artistMatch?.indices),
            }}
          />
        )}
      </div>
      {type !== "song" && <span className="badge">{type}</span>}
    </div>
  );
}

export function renderArtist(result, index, type, onSelect, highlightFn) {
  const { item, matches } = result;

  const nameMatch = matches?.find((m) => m.key === "name" || m.key === "title");
  const artistMatch = matches?.find((m) => m.key === "artist");

  return (
    <div
      key={`${type}-${index}`}
      className="search-result-item"
      onClick={() => onSelect(item, type)}
    >
      <img
        src={item.thumbnail || "./fallback.png"}
        className="result-artist"
      />
      <div className="result-details">
        <p
          className="result-title"
          dangerouslySetInnerHTML={{
            __html: highlightFn(
              type === "artist" ? item.name : item.title,
              nameMatch?.indices
            ),
          }}
        />
        {type !== "artist" && (
          <p
            className="result-artist"
            dangerouslySetInnerHTML={{
              __html: highlightFn(item.artist, artistMatch?.indices),
            }}
          />
        )}
      </div>
      {type !== "song" && <span className="badge">{type}</span>}
    </div>
  );
}
