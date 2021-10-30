import React from 'react';
import './Albums.css';

function Album({ album, showPhotos }) {
  return (
    <div className="album-div" onClick={() => showPhotos(album)}>
        <span>Album #{album}</span>
    </div>
  );
}

export default Album;