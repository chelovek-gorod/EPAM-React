import React from 'react';
import './Photos.css';

function Photos({photo}) {
  return (
    <div className="photo-div">
        <span>{photo}</span>
    </div>
  );
}

export default Photos;