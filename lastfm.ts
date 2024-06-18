import axios from 'axios';
const apiKey = '0a657854db69e551c97d541ca9ebcef4';
const url = 'http://ws.audioscrobbler.com/2.0/';

// Función para obtener la información del álbum
export async function getAlbumInfo(artist: string, album: string) {
    const response = await axios.get(url, {
        params: {
            method: 'album.getinfo',
            api_key: apiKey,
            artist,
            album,
            format: 'json'
        }
    });

    // Verifica si la respuesta tiene datos del álbum
    if (response.data && response.data.album) {
        return response.data;
    } else {
        return null;
    }
}
