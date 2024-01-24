import { parseStringPromise } from 'xml2js';

export default async function FetchBoardGameData(gameId: string) {
    const res = await fetch(`https://boardgamegeek.com/xmlapi/boardgame/${gameId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch the board game');
    }

    const xmlData = await res.text();
    const jsonData = await parseStringPromise(xmlData);
    const gameDetails = jsonData.boardgames.boardgame[0];

    const game = {
        id: gameDetails.$.objectid,
        name: gameDetails.name[0]._,
        image: gameDetails.image[0],
        thumbnail: gameDetails.thumbnail[0],
    };
    
    return game;
}