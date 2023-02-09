import React, { useEffect, useState } from 'react';
import { artistAPI } from './artistAPI';
import ArtistDetail from './ArtistDetail';
import { Artist } from './Artist';
import { useParams } from 'react-router-dom';

function ArtistPage(props: any) {
  const [loading, setLoading] = useState(false);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    setLoading(true);
    artistAPI
      .find(id)
      .then((data) => {
        setArtist(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <>
        <h1>Artist Detail</h1>

        {loading && (
          <div className="center-page">
            <span className="spinner primary"></span>
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="row">
            <div className="card large error">
              <section>
                <p>
                  <span className="icon-alert inverse "></span> {error}
                </p>
              </section>
            </div>
          </div>
        )}

        {artist && <ArtistDetail artist={artist} />}
      </>
    </div>
  );
}

export default ArtistPage;