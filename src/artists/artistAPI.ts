import { Artist } from './Artist';
const baseUrl = 'http://localhost:4000';
const url = `${baseUrl}/artists`;

function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return 'Please login again.';
    case 403:
      return 'You do not have permission to view the artist(s).';
    default:
      return 'There was an error retrieving the artist(s). Please try again.';
  }
}

function checkStatus(response: any) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response: Response) {
  return response.json();
}

// eslint-disable-next-line
function delay(ms: number) {
  return function (x: any): Promise<any> {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

function convertToProjectModels(data: any[]): Artist[] {
  let artists: Artist[] = data.map(convertToArtistModel);
  return artists;
}

function convertToArtistModel(item: any): Artist {
  return new Artist(item);
}

const artistAPI = {
  get(page = 1, limit = 15) {
    return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToProjectModels)
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error retrieving the artists. Please try again.'
        );
      });
  },

  put(artist: Artist) {
    return fetch(`${url}/${artist.id}`, {
        method: 'PUT',
        body: JSON.stringify(artist),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(checkStatus)
    .then(parseJSON)
    .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error('There was an error updating the artist. Please try again.');
    });
  },

  find(id: number) {
    return fetch(`${url}/${id}`)
        .then(checkStatus)
        .then(parseJSON)
        .then(convertToArtistModel);
  },
};

export { artistAPI };