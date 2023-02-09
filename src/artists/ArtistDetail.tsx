import React from 'react';
import { Artist } from './Artist';

interface ArtistDetailProps {
  artist: Artist;
}
export default function ArtistDetail({ artist }: ArtistDetailProps) {
  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="card large">
          <img
            className="rounded"
            src={artist.imageUrl}
            alt={artist.name}
          />
          <section className="section dark">
            <h3 className="strong">
              <strong>{artist.name}</strong>
            </h3>
            <p>{artist.description}</p>
            <p>Albums released : {artist.albums}</p>

            <p>Contract signed on {artist.contractSignedOn.toLocaleDateString()}</p>
          </section>
        </div>
      </div>
    </div>
  );
}