from flask import Flask, request, jsonify
from ytmusicapi import YTMusic
from flask_cors import CORS, cross_origin
from yt_dlp import YoutubeDL
import random

app = Flask(__name__)
CORS(app)

ytmusic = YTMusic()


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response


@app.route("/searchSongs", methods=["GET"])
@cross_origin()
def search_songs():
    query = request.args.get("query")
    if not query:
        return jsonify([])

    results = ytmusic.search(query, filter="songs")[:6]

    songs = [
        {
            "title": item.get("title", "Unknown Title"),
            "artist": ", ".join([a.get("name", "") for a in item.get("artists", [])]),
            "thumbnail": item.get("thumbnails", [{}])[-1].get("url", ""),
            "url": f"https://music.youtube.com/watch?v={item.get('videoId', '')}",
            "album": item.get("album", {}).get("name", "Unknown Album"),
            "views": item.get("views", "0"),
            "id": item.get("videoId", ""),
        }
        for item in results
    ]

    return jsonify(songs)


@app.route("/getAudio", methods=["GET"])
@cross_origin()
def get_audio():
    url = request.args.get("url")
    if not url:
        return jsonify({"error": "Missing URL"}), 400

    ydl_opts = {
        "format": "bestaudio/best",
        "quiet": True,
        "skip_download": True,
        "forceurl": True,
        "extract_flat": True,
    }

    with YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
        audio_url = info.get("url")

    return jsonify({"audioUrl": audio_url})


def get_hd_thumbnail(thumbnails):
    if not thumbnails:
        return ""
    url = thumbnails[-1].get("url", "")
    if "=w" in url or "=s" in url:
        url = url.split("=")[0]  # strip size
    return url


@app.route("/randomSongs", methods=["GET"])
@cross_origin()
def random_songs():
    results = ytmusic.search("new bollywood song", filter="songs")
    random.shuffle(results)
    top_results = results[:10]

    songs = [
        {
            "title": item["title"],
            "artist": ", ".join([a["name"] for a in item["artists"]]),
            "thumbnail": get_hd_thumbnail(item.get("thumbnails", [])),
            "url": f"https://music.youtube.com/watch?v={item['videoId']}",
            "id": item.get("videoId", ""),
        }
        for item in top_results
    ]

    return jsonify(songs)


@app.route("/newReleases", methods=["GET"])
@cross_origin()
def new_releases():
    results = ytmusic.search("bollywood hit songs", filter="songs")[:10]
    songs = [
        {
            "title": item["title"],
            "artist": ", ".join([a["name"] for a in item["artists"]]),
            "thumbnail": get_hd_thumbnail(item.get("thumbnails", [])),
            "url": f"https://music.youtube.com/watch?v={item['videoId']}",
            "id": item.get("videoId", ""),
        }
        for item in results
    ]
    return jsonify(songs)


@app.route("/globalTrending", methods=["GET"])
@cross_origin()
def global_trending():
    results = ytmusic.search("trending punjabi songs", filter="songs")[:10]
    songs = [
        {
            "title": item["title"],
            "artist": ", ".join([a["name"] for a in item["artists"]]),
            "thumbnail": get_hd_thumbnail(item.get("thumbnails", [])),
            "url": f"https://music.youtube.com/watch?v={item['videoId']}",
            "id": item.get("videoId", ""),
        }
        for item in results
    ]
    return jsonify(songs)


@app.route("/searchAlbums", methods=["GET"])
@cross_origin()
def search_albums():
    query = request.args.get("query")
    if not query:
        return jsonify([])

    results = ytmusic.search(query, filter="albums")[:5]
    albums = [
        {
            "title": item["title"],
            "artist": ", ".join([a["name"] for a in item["artists"]]),
            "thumbnail": item.get("thumbnails", [{}])[-1].get("url", ""),
            "browseId": item["browseId"],
            "resultType": "album",
        }
        for item in results
    ]
    return jsonify(albums)


@app.route("/getAlbumSongs", methods=["GET"])
@cross_origin()
def get_album_songs():
    browse_id = request.args.get("browseId")

    if not browse_id:
        return jsonify({"error": "Missing browseId"}), 400

    album = ytmusic.get_album(browse_id)

    if album is None:
        return jsonify({"error": "Album not found for the given browseId"}), 404

    songs = []

    for track in album.get("tracks", []):
        thumbs = track.get("thumbnails") or [{}]
        songs.append(
            {
                "title": track.get("title", "Unknown"),
                "artist": ", ".join(
                    [a.get("name", "") for a in track.get("artists", [])]
                ),
                "thumbnail": thumbs[-1].get("url", ""),
                "url": (
                    f"https://music.youtube.com/watch?v={track['videoId']}"
                    if track.get("videoId")
                    else None
                ),
                "duration": track.get("duration", "0:00"),
                "views": track.get("views", "N/A"),
                "artistId": album.get("artists", [{}])[0].get("id", "Unknown Artist"),
                "id": track.get("videoId", ""),
            }
        )

    # Defensive fallback for thumbnails and artists
    artists = album.get("artists") or [{}]
    thumbnails = album.get("thumbnails") or [{}]

    # Final response
    return jsonify(
        {
            "title": album.get("title", "Unknown Album"),
            "artist": artists[0].get("name", "Unknown Artist"),
            "thumbnail": thumbnails[-1].get("url", ""),
            "songs": songs,
            "type": album.get("type", "Unknown"),
            "year": album.get("year", "Unknown"),
            "duration": album.get("duration", "0:00"),
            "trackCount": album.get("trackCount", len(songs)),
            "id": album.get("videoId", ""),
            # "description": album.get("description", ""),
            # "isExplicit": album.get("isExplicit", False),
        }
    )


@app.route("/getSimilarSongs", methods=["GET"])
def get_similar_songs():
    song_id = request.args.get("songId")
    if not song_id:
        return jsonify({"error": "songId is required"}), 400

    try:
        song = ytmusic.get_song(song_id)
        artist = song["videoDetails"]["author"]

        similar_raw = ytmusic.search(artist, filter="songs")[:25]

        similar_songs = []
        for item in similar_raw:
            similar_songs.append(
                {
                    "title": item.get("title", "Unknown Title"),
                    "artist": ", ".join(
                        [a.get("name", "") for a in item.get("artists", [])]
                    ),
                    "thumbnail": item.get("thumbnails", [{}])[-1].get("url", ""),
                    "url": f"https://music.youtube.com/watch?v={item.get('videoId', '')}",
                    "duration": item.get("duration", "0:00"),
                    "views": item.get("views", "0"),
                    "id": item.get("videoId", ""),
                }
            )

        return jsonify(similar_songs)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/getSongFromSearch", methods=["GET"])
def get_song_from_search():
    song_id = request.args.get("id")
    if not song_id:
        return jsonify({"error": "Missing song ID"}), 400

    try:
        song = ytmusic.get_song(song_id)
        details = song.get("videoDetails", {})

        return jsonify(
            {
                "title": details.get("title", "Unknown Title"),
                "videoId": details.get("videoId", song_id),
                "views": details.get("viewCount", "0"),
                "duration": details.get("lengthSeconds", "0"),
                "duration_readable": song.get("microformat", {}).get(
                    "lengthSeconds", "0:00"
                ),
                "thumbnail": details.get("thumbnail", {})
                .get("thumbnails", [{}])[-1]
                .get("url", ""),
                "album": {"name": song.get("album", {}).get("name", "Unknown Album")},
                "artists": [{"name": details.get("author", "Unknown Artist")}],
                "category": details.get("category", ""),
            }
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# File: app.py (Flask backend - Add this route)


@app.route("/artist", methods=["GET"])
@cross_origin()
def get_artist():
    artist_id = request.args.get("id")
    if not artist_id:
        return jsonify({"error": "Missing artist ID"}), 400

    try:
        data = ytmusic.get_artist(artist_id)

        # Extract top songs (aka "songs")
        top_songs = []
        for song in data.get("songs", {}).get("results", [])[:20]:
            top_songs.append(
                {
                    "title": song.get("title", "Unknown Title"),
                    "id": song.get("videoId", ""),
                    "artist": ", ".join(
                        [a.get("name", "") for a in song.get("artists", [])]
                    ),
                    "thumbnail": song.get("thumbnails", [{}])[-1].get("url", ""),
                    "album": song.get("album", {}).get("name", "Unknown Album"),
                    "url": f"https://music.youtube.com/watch?v={song.get('videoId')}",
                }
            )

        # Extract albums
        albums = []
        for album in data.get("albums", {}).get("results", [])[:20]:
            albums.append(
                {
                    "title": album.get("title", "Unknown Album"),
                    "browseId": album.get("browseId", ""),
                    "year": album.get("year", ""),
                    "thumbnail": album.get("thumbnails", [{}])[-1].get("url", ""),
                }
            )

        # Extract albums
        singles = []
        for single in data.get("singles", {}).get("results", [])[:20]:
            singles.append(
                {
                    "title": single.get("title", "Unknown single"),
                    "browseId": single.get("browseId", ""),
                    "year": single.get("year", ""),
                    "thumbnail": single.get("thumbnails", [{}])[-1].get("url", ""),
                }
            )

        # Artist info
        artist_info = {
            "name": data.get("name", "Unknown Artist"),
            "description": data.get("description", ""),
            "thumbnails": data.get("thumbnails", []),
            "songs": top_songs,
            "albums": albums,
            "singles": singles,
            "views": data.get("views", ""),
            "followers": data.get("subscribers", ""),
        }

        return jsonify(artist_info)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/searchArtists", methods=["GET"])
@cross_origin()
def search_artists():
    query = request.args.get("query")
    if not query:
        return jsonify([])

    results = ytmusic.search(query, filter="artists")[:5]
    artists = [
        {
            "name": item.get("artist", item.get("title", "Unknown Artist")),
            "id": item.get("browseId", ""),
            "thumbnail": item.get("thumbnails", [{}])[-1].get("url", ""),
            "resultType": "artist",
        }
        for item in results
    ]
    return jsonify(artists)


if __name__ == "__main__":
    app.run(debug=True, port=3001)
