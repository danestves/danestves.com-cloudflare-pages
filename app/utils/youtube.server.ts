// Internals
import type { Videos } from '~/types';

const GOOGLE_API = 'https://www.googleapis.com/youtube/v3';
const PLAYLIST_ID = 'UU6YYVDKZC3mu1iB8IOCFqcw';

/**
 * Build the API Request URL for the YouTube API
 *
 * @param {string} source The source of the request
 */
const getYouTubeAPIURL = (source: string): string => {
  return `${GOOGLE_API}${source}&key=${'YOUTUBE_API_KEY'}`;
};

export type GetVideosProps = {
  /**
   * The **limit** parameter specifies the maximum number of items
   * that should be returned in the result set.
   *
   * Acceptable values are **0** to **50**, inclusive. The default value is **4**.
   */
  limit?: number;
};

/**
 * Get the videos from the YouTube API
 *
 * @param {GetVideosProps} props
 */
export async function getVideos(props?: GetVideosProps): Promise<Videos> {
  const limit = props?.limit || 4;
  const latestVideos = await fetch(
    getYouTubeAPIURL(
      `/playlistItems?part=contentDetails&playlistId=${PLAYLIST_ID}&maxResults=${limit}`
    )
  ).then((res) => res.json() as any);

  if (latestVideos.error) {
    return [] as any;
  }

  const ids: string[] = latestVideos?.items?.map((video: any) => {
    return video?.contentDetails?.videoId;
  });
  const result: Videos = await fetch(
    getYouTubeAPIURL(`/videos?part=snippet,statistics&id=${ids.join(',')}`)
  ).then((response) => response.json());

  return result;
}
