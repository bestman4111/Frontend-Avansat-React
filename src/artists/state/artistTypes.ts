import { Artist } from "../Artist";

//action types
export const LOAD_ARTISTS_REQUEST = 'LOAD_ARTISTS_REQUEST';
export const LOAD_ARTISTS_SUCCESS = 'LOAD_ARTISTS_SUCCESS';
export const LOAD_ARTISTS_FAILURE = 'LOAD_ARTISTS_FAILURE';
export const SAVE_ARTIST_REQUEST = 'SAVE_ARTIST_REQUEST';
export const SAVE_ARTIST_SUCCESS = 'SAVE_ARTIST_SUCCESS';
export const SAVE_ARTIST_FAILURE = 'SAVE_ARTIST_FAILURE';
export const DELETE_ARTIST_REQUEST = 'DELETE_ARTIST_REQUEST';
export const DELETE_ARTIST_SUCCESS = 'DELETE_ARTIST_SUCCESS';
export const DELETE_ARTIST_FAILURE = 'DELETE_ARTIST_FAILURE';

interface LoadArtistsRequest {
    type: typeof LOAD_ARTISTS_REQUEST;
}

interface LoadArtistsSuccess {
    type: typeof LOAD_ARTISTS_SUCCESS;
    payload: {artists: Artist[]; page: number};
}

interface LoadArtistsFailure {
    type: typeof LOAD_ARTISTS_FAILURE;
    payload: {message: string};
}

interface SaveArtistRequest {
    type: typeof SAVE_ARTIST_REQUEST;
}

interface SaveArtistSuccess {
    type: typeof SAVE_ARTIST_SUCCESS;
    payload: Artist;
}

interface SaveArtistFailure {
    type: typeof SAVE_ARTIST_FAILURE;
    payload: {message: string};
}

interface DeleteArtistRequest {
    type: typeof DELETE_ARTIST_REQUEST;
}

interface DeleteArtistSuccess {
    type: typeof DELETE_ARTIST_SUCCESS;
    payload: Artist;
}

interface DeleteArtistFailure {
    type: typeof DELETE_ARTIST_FAILURE;
    payload: {message: string};
}

export type ArtistActionTypes = 
    | LoadArtistsRequest
    | LoadArtistsSuccess
    | LoadArtistsFailure
    | SaveArtistRequest
    | SaveArtistSuccess
    | SaveArtistFailure
    | DeleteArtistRequest
    | DeleteArtistSuccess
    | DeleteArtistFailure

export interface ArtistState {
    loading: boolean;
    artists: Artist[];
    error: string | undefined;
    page: number;
}