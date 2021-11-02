import React from 'react';
import './Albums.css';

function Album(props) {
  return (
    <div className="album-div" onClick={() => props.showPhotos(props.album)}>
        <span>Album #{props.album}</span>
    </div>
  );
}

export default Album;