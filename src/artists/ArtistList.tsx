import React, {useState} from "react";
import { Artist } from "./Artist";
import ArtistCard from "./ArtistCard";
import ArtistForm from "./ArtistForm";

interface ArtistListProps {
    artists: Artist[];
}

function ArtistList({artists}: ArtistListProps) {
    const [artistBeingEdited, setArtistBeingEdited] = useState({});
    const handleEdit = (artist: Artist) => {
        setArtistBeingEdited(artist);
    };

    const cancelEditing = () => {
        setArtistBeingEdited({});
    }

    return (
        <div className="row">
            {artists.map((artist) => (
                <div key={artist.id} className="cols-sm">
                    {artist === artistBeingEdited ? (
                        <ArtistForm 
                            artist={artist}
                            onCancel={cancelEditing}
                        />
                    ) : (
                        <ArtistCard artist={artist} onEdit={handleEdit} />
                    )}
                </div>
            ))}
        </div>
    );
}

export default ArtistList;