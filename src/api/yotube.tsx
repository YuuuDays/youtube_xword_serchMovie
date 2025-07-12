const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY!;
const SEARCH_QUERY = process.env.REACT_APP_SEARCH_QUERY!;
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const searchNumber = 70;

export type VideoItem = {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
  };
};

export const fetchYouTubeVideos = async (): Promise<VideoItem[]> => {
  // 環境変数の確認
  if (!API_KEY) {
    console.error("REACT_APP_YOUTUBE_API_KEY が設定されていません");
    throw new Error("YouTube API キーが設定されていません");
  }
  
  if (!SEARCH_QUERY) {
    console.error("REACT_APP_SEARCH_QUERY が設定されていません");
    throw new Error("検索クエリが設定されていません");
  }

  console.log("検索クエリ:", SEARCH_QUERY);
  console.log("API キー:", API_KEY ? "設定済み" : "未設定");

  const url = `${BASE_URL}?part=snippet&type=video&order=date&q=${encodeURIComponent(
    SEARCH_QUERY
  )}&maxResults=${searchNumber}&key=${API_KEY}`;

  console.log("API URL:", url);

  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error("API エラー:", res.status, errorText);
      throw new Error(`YouTube API エラー: ${res.status} - ${errorText}`);
    }
    
    const data = await res.json();
    console.log("API レスポンス:", data);

    if (!data.items) {
      console.log("検索結果がありません");
      return [];
    }

    console.log(`検索結果: ${data.items.length}件`);
    // ここでフィルタせず、そのまま返す
    return data.items;
  } catch (error) {
    console.error("YouTube API 呼び出しエラー:", error);
    throw error;
  }
};