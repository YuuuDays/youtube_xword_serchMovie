// src/App.tsx
import React, { useEffect, useState } from "react";
import { fetchYouTubeVideos, VideoItem } from "./api/yotube";

const App: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setError(null);
        const vids = await fetchYouTubeVideos();
        setVideos(vids);
      } catch (err) {
        console.error("動画読み込みエラー:", err);
        setError(err instanceof Error ? err.message : "動画の読み込みに失敗しました");
      } finally {
        setLoading(false);
      }
    };
    loadVideos();
  }, []);

  if (loading) return <div>読み込み中...</div>;

  if (error) {
    return (
      <div style={{ padding: 20 }}>
        <h1>エラー</h1>
        <div style={{ color: 'red', marginBottom: 20 }}>
          {error}
        </div>
        <div>
          <h3>設定方法:</h3>
          <ol>
            <li>プロジェクトのルートディレクトリに <code>.env</code> ファイルを作成</li>
            <li>以下の内容を追加:</li>
            <pre style={{ background: '#f5f5f5', padding: 10, borderRadius: 5 }}>
{`REACT_APP_YOUTUBE_API_KEY=あなたのYouTube_APIキー
REACT_APP_SEARCH_QUERY=検索したいキーワード`}
            </pre>
            <li>アプリを再起動</li>
          </ol>
        </div>
      </div>
    );
  }

  console.log(videos);
  return (
    <div style={{ padding: 20 }}>
      <h1>新着 YouTube 動画（AND検索）</h1>
      {videos.length === 0 ? (
        <div>検索結果が見つかりませんでした。</div>
      ) : (
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
      )}
    </div>
  );
};

export default App;
