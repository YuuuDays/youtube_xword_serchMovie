// src/App.tsx
import React, { useEffect, useState } from "react";
import { fetchYouTubeVideos, VideoItem } from "./api/yotube";

const App: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      const vids = await fetchYouTubeVideos();
      setVideos(vids);
      setLoading(false);
    };
    loadVideos();
  }, []);

  if (loading) return <div>読み込み中...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>新着 YouTube 動画（AND検索）</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id.videoId} style={{ marginBottom: "1rem" }}>
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {video.snippet.title}
            </a>
            <div>{new Date(video.snippet.publishedAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
