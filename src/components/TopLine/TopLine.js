import React from 'react';
import './TopLine.css';

function TopLine(props) {
  return ((props.albums) ? 
    <div className="top-div">Albums:</div> :
    <div className="top-div">Photos:
      <button className="back" onClick = { props.showAlbums }>&#8592; Back to albums</button>
    </div>
  );
}

export default TopLine;