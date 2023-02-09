import {Artist} from './Artist';
import {Link} from 'react-router-dom';

function formatDescription (description: string): string {
    return description.substring(0, 60) + '...';
}

interface ArtistCardProps {
    artist: Artist;
    onEdit: (artist: Artist) => void;
}

function ArtistCard(props: ArtistCardProps) {
    const {artist, onEdit} = props;
    const handleEditClick = (artistBeingEdited: Artist) => {
        onEdit(artistBeingEdited);
    };
    return (
        <div className='card'>
            <img src={artist.imageUrl} alt={artist.name} />
            <section className='section dark'>
                <Link to={'/artists/' + artist.id}>
                    <h5 className='strong'>
                        <strong>{artist.name}</strong>
                    </h5>
                </Link>
                <p>{formatDescription(artist.description)}</p>
                <p>Albums released: {artist.albums.toLocaleString()}</p>
                <button className='bordered'
                    onClick = {() => {
                        handleEditClick(artist);
                    }}
                >
                    <span className='icon-edit'></span>
                    Edit
                </button>
            </section>
        </div>
    )
}

export default ArtistCard;