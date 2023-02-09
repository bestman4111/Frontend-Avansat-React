import {
    ArtistActionTypes,
    LOAD_ARTISTS_REQUEST,
    LOAD_ARTISTS_SUCCESS,
    LOAD_ARTISTS_FAILURE,
    DELETE_ARTIST_REQUEST,
    DELETE_ARTIST_SUCCESS,
    DELETE_ARTIST_FAILURE,
    SAVE_ARTIST_REQUEST,
    SAVE_ARTIST_SUCCESS,
    SAVE_ARTIST_FAILURE,
    ArtistState,
} from './artistTypes';
import { Artist } from '../Artist';
import { act } from 'react-dom/test-utils';

export const initialArtistState: ArtistState = {
    artists: [],
    loading: false,
    error: undefined,
    page: 1
};

export function artistReducer(
    state = initialArtistState,
    action: ArtistActionTypes
) {
    switch (action.type) {
        case LOAD_ARTISTS_REQUEST:
            return {...state, loading: true, error: ''};
        case LOAD_ARTISTS_SUCCESS:
            let artists: Artist[];
            const {page} = action.payload;
            if(page === 1) {
                artists = action.payload.artists;
            } else {
                artists = [...state.artists, ...action.payload.artists];
            }
            return {
                ...state,
                loading: false,
                page,
                artists,
                error: ''
            };
        case LOAD_ARTISTS_FAILURE:
            return {...state, loading: false, error: action.payload.message};
        case SAVE_ARTIST_REQUEST:
            return {...state};
        case SAVE_ARTIST_SUCCESS:
            if (action.payload.isNew) {
                return {
                    ...state,
                    artists: [...state.artists, action.payload]
                };
            } else {
                return {
                    ...state,
                    artists: state.artists.map((artist: Artist) => {
                        return artist.id === action.payload.id
                        ? Object.assign({}, artist, action.payload)
                        : artist;
                    })
                };
            }
        case SAVE_ARTIST_FAILURE:
            return {...state, error: action.payload.message};
        case DELETE_ARTIST_REQUEST:
            return {...state};
        case DELETE_ARTIST_SUCCESS:
            return {
                ...state,
                artists: state.artists.filter(
                    (artist: Artist) => artist.id !== action.payload.id
                )
            };
        case DELETE_ARTIST_FAILURE:
            return {...state, error: action.payload.message};
        default:
            return state;
    }
}