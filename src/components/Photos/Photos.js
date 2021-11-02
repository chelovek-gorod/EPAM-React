import React from 'react';
import './Photos.css';

function Photos(props) {
  return (
    <div className="photo-div">
        <span>{props.photo}</span>
    </div>
  );
}

export default Photos;