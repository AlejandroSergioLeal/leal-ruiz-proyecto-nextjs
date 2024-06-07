import axios from 'axios';
//import { LastFmAlbumInfo } from './lib/definitions';

const apiKey = '0a657854db69e551c97d541ca9ebcef4';
const url = 'http://ws.audioscrobbler.com/2.0/';

// Función para obtener la información del álbum
export async function getAlbumInfo(artist: string, album: string) {
    try {
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
            throw new Error('No se encontró la información del álbum');
        }
    } catch (error) {
        throw new Error(`Error al obtener la información del álbum: ${error}`);
    }
}

/* Ejemplo de uso

const artist = 'Coldplay';
const album = 'Parachutes';

getAlbumInfo(artist, album)
    .then(albumInfo => {
        console.log(`Nombre del álbum: ${albumInfo.album.name}`);
        console.log(`Artista: ${albumInfo.album.artist}`);
        console.log(`Oyentes: ${albumInfo.album.listeners}`);
        console.log(`Reproducciones: ${albumInfo.album.playcount}`);
        console.log(`Tracks:`);
        albumInfo.album.tracks.track.forEach(track => {
            console.log(`- ${track.name} (${track.duration} s)`);
        });
    })
    .catch(error => {
        console.error(`Error: ${error.message}`);
    });
*/