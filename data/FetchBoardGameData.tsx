import { parseStringPromise } from 'xml2js';

interface NameEntry {
  _: string;
  $: {
    primary?: string;
  };
}

export default async function fetchBoardGameData(gameId: string) {
    const res = await fetch(`https://boardgamegeek.com/xmlapi/boardgame/${gameId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch the board game');
    }

    const xmlData = await res.text();
    const jsonData = await parseStringPromise(xmlData);
    const gameDetails = jsonData.boardgames.boardgame[0];
    //console.log(gameDetails);

    const primaryNameEntry = gameDetails.name.find((name: NameEntry) => name.$ && name.$.primary === 'true');
    const primaryName = primaryNameEntry ? primaryNameEntry._ : 'Name not found';

    const game = {
      id: gameDetails.$.objectid,
      name: primaryName,
      image: gameDetails.image[0],
      thumbnail: gameDetails.thumbnail[0],
      yearPublished: gameDetails.yearpublished[0],
      minPlayers: gameDetails.minplayers[0],
      maxPlayers: gameDetails.maxplayers[0],
      playingTime: gameDetails.playingtime[0],
      minPlayTime: gameDetails.minplaytime[0],
      maxPlayTime: gameDetails.maxplaytime[0],
      age: gameDetails.age[0],
      description: gameDetails.description[0],
  };
  
    
    return game;
}
