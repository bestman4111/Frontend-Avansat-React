import {Action} from 'redux';
import { ThunkAction } from 'redux-thunk';
import { artistAPI } from '../artistAPI';
import { Artist } from '../Artist';
import {
    LOAD_ARTISTS_REQUEST,
    LOAD_ARTISTS_SUCCESS,
    LOAD_ARTISTS_FAILURE,
    SAVE_ARTIST_REQUEST,
    SAVE_ARTIST_SUCCESS,
    SAVE_ARTIST_FAILURE,
    ArtistState
} from './artistTypes';

//action creators
export function loadArtists(
    page: number
): ThunkAction<void, ArtistState, null, Action<string>> {
    return (dispatch: any) => {
        dispatch({type: LOAD_ARTISTS_REQUEST});
        return artistAPI
            .get(page)
            .then((data) => {
                dispatch({
                    type: LOAD_ARTISTS_SUCCESS,
                    payload: {artists: data, page},
                });
            })
            .catch((error) => {
                dispatch({type: LOAD_ARTISTS_FAILURE, payload: error});
            });
    };
}

export function saveArtist (
    artist: Artist
): ThunkAction<void, ArtistState, null, Action<string>> {
    return (dispatch: any) => {
        dispatch({type: SAVE_ARTIST_REQUEST});
        return artistAPI
            .put(artist)
            .then((data) => {
                dispatch({type: SAVE_ARTIST_SUCCESS, payload: data});
            })
            .catch((error) => {
                dispatch({type: SAVE_ARTIST_FAILURE, payload: error});
            });
    };
}