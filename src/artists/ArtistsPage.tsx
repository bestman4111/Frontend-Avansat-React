import React, {Fragment, useEffect} from "react";
import ArtistList from "./ArtistList"; 
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../state";
import { ThunkDispatch } from "redux-thunk";
import { ArtistState } from "./state/artistTypes";
import { AnyAction } from "redux";
import { loadArtists } from "./state/artistActions";

function ArtistsPage() {
    const loading = useSelector(
        (appState: AppState) => appState.artistState.loading
    );
    const artists = useSelector(
        (appState: AppState) => appState.artistState.artists
    );
    const error = useSelector(
        (appState: AppState) => appState.artistState.error
    );
    const currentPage = useSelector(
        (appState: AppState) => appState.artistState.page
    );
    const dispatch = useDispatch<ThunkDispatch<ArtistState, any, AnyAction>>();

    const handleMoreClick = () => {
        dispatch(loadArtists(currentPage + 1));
    };

    useEffect(() => {
        dispatch(loadArtists(1));
    }, [dispatch]);

    return (
        <Fragment>
            <h1>Artists</h1>
            {error && (
                <div className="row">
                    <div className="card large error">
                        <section>
                            <p>
                                <span className="icon-alert inverse"></span>
                                {error}
                            </p>
                        </section>
                    </div>
                </div>
            )}
            <ArtistList artists={artists} />
            {!loading && !error && (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="button-group fluid">
                            <button className="button default" onClick={handleMoreClick}>
                                More...
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {loading && (
                <div className="center-page">
                    <span className="spinner primary"></span>
                    <p>Loading...</p>
                </div>
            )}
        </Fragment>
    );
}

export default ArtistsPage;