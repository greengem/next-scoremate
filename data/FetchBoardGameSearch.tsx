import { json } from 'stream/consumers';
import { parseStringPromise } from 'xml2js';

interface SearchResult {
  id: string;
  name: string;
  thumbnail: string;
}

export default async function fetchBoardGameSearchResults(query: string): Promise<SearchResult[]> {
  const res = await fetch(`https://boardgamegeek.com/xmlapi2/search?query=${encodeURIComponent(query)}&type=boardgame`);

  if (!res.ok) {
      throw new Error('Failed to fetch search results');
  }

  const xmlData = await res.text();
  const jsonData = await parseStringPromise(xmlData);

  //console.log(jsonData.items.item)

  // Check if there are no search results
  if (!jsonData.items.item || jsonData.items.item.length === 0) {
      return []; // Return an empty array if no results
  }

  // Extract search results and map them to SearchResult objects
  const searchResults: SearchResult[] = jsonData.items.item.map((item: any) => ({
      id: item.$.id,
      name: (Array.isArray(item.name) ? item.name[0].$.value : item.name.$.value), // Handle both single and multiple names
      thumbnail: item.$.thumbnail,
  }));

  return searchResults;
}

