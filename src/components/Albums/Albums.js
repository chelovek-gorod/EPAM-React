import React from 'react';
import './Albums.css';

function Album(props) {
  console.log('key =',props.album);
  return (
    <div className="album-div" key={props.album} onClick={() => props.showPhotos(props.album)}>
        <span>Album #{props.album}</span>
    </div>
  );
}

export default Album;