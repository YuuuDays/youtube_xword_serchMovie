const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY!;
const SEARCH_QUERY = process.env.REACT_APP_SEARCH_QUERY!;
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

export type VideoItem = {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
  };
};

export const fetchYouTubeVideos = async (): Promise<VideoItem[]> => {
  const url = `${BASE_URL}?part=snippet&type=video&order=date&q=${encodeURIComponent(
    SEARCH_QUERY
  )}&maxResults=50&key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.items) return [];

  const keywords = SEARCH_QUERY.split(" ");
  const filtered = data.items.filter((item: VideoItem) => {
    const text = item.snippet.title + " " + item.snippet.description;
    return keywords.every((kw) => text.includes(kw));
  });

  return filtered;
};