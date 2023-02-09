import React, {SyntheticEvent, useState} from "react";
import { Artist } from "./Artist";
import { useDispatch } from "react-redux";
import { saveArtist } from "./state/artistActions";
import { ThunkDispatch } from "redux-thunk";
import { ArtistState } from "./state/artistTypes";
import { AnyAction } from "redux";

interface ArtistFormProps {
    artist: Artist;
    onCancel: () => void;
}

function ArtistForm({artist: initialArtist, onCancel}: ArtistFormProps) {
    const [artist, setArtist] = useState(initialArtist);
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        albums: '',
    });

    const dispatch = useDispatch<ThunkDispatch<ArtistState, any, AnyAction>>();
    
    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if(!isValid()) return;
        dispatch(saveArtist(artist));
    };

    const handleChange = (event: any) => {
        const { type, name, value, checked } = event.target;
        // if input type is checkbox use checked
        // otherwise it's type is text, number etc. so use value
        let updatedValue = type === 'checkbox' ? checked : value;
        
        //if input type is number convert the updatedValue string to a +number
        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }
        const change = {
            [name]: updatedValue,
        };
        let updatedArtist: Artist;
        // need to do functional update b/c
        // the new artist state is based on the previous artist state
        // so we can keep the artist properties that aren't being edited +like artist.id
        // the spread operator (...) is used to
        // spread the previous artist properties and the new change
        setArtist((p) => {
            updatedArtist = new Artist({ ...p, ...change });
            return updatedArtist;
        });
        setErrors(() => validate(updatedArtist));
    };

    function validate(artist: Artist) {
        let errors: any = {name: '', description: '', albums: ''};
        if (artist.name.length === 0){
            errors.name = 'Name is required';
        }
        if(artist.name.length > 0 && artist.name.length < 3) {
            errors.name = 'Name needs to be at least 3 characters.';
        }
        if(artist.description.length === 0) {
            errors.description = 'Description is required.';
        }
        if(artist.albums === 0) {
            errors.albums = 'Number of released albums must be more than 0.';
        }
        return errors;
    }

    function isValid() {
        return (
            errors.name.length === 0 &&
            errors.description.length === 0 &&
            errors.albums.length === 0
        );
    }

    return (
        <form className="input-group vertical" onSubmit={handleSubmit}>
            <label htmlFor="name">Artist Name</label>
            <input type="text" name="name" placeholder="enter name" value={artist.name} onChange={handleChange} />
            {errors.name.length > 0 && (
                <div className="card error">
                    <p>{errors.name}</p>
                </div>
            )}
            <label htmlFor="description">Artist Description</label>
            <textarea name="description" placeholder="enter description" value={artist.description} onChange={handleChange} />
            {errors.description.length > 0 && (
                <div className="card error">
                    <p>{errors.description}</p>
                </div>
            )}
            <label htmlFor="budget">Artist Budget</label>
            <input type="number" name="albums" placeholder="enter number of released albums" value={artist.albums} onChange={handleChange}/>
            {errors.albums.length > 0 && (
                <div className="card error">
                    <p>{errors.albums}</p>
                </div>
            )}
            <div className="input-group">
                <button className="primary bordered medium">Save</button>
                <span />
                <button type="button" className="bordered medium"
                onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default ArtistForm;