import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";
import { ArtistState } from "./artists/state/artistTypes";
import { initialArtistState } from "./artists/state/artistReducer";
import { artistReducer } from "./artists/state/artistReducer";

const reducer = combineReducers({
    artistState: artistReducer
});

export default function configureStore(preloadedState: any) {
  const middlewares = [ReduxThunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  //Thunk is middleware
  //DevTools is an enhancer (actually changes Redux)
  //applyMiddleware wraps middleware and returns an enhancer

  // to use only thunk middleware
  // const enhancer = compose(middlewareEnhancer);

  //to use thunk & devTools
  const enhancer = composeWithDevTools(middlewareEnhancer);

  const store = createStore(reducer, preloadedState, enhancer);
  return store;
}

export interface AppState {
    artistState: ArtistState;
}

export const initialAppState: AppState = {
    artistState: initialArtistState
};

export const store = configureStore(initialAppState);