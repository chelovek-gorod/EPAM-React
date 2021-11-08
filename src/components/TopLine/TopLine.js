import React from 'react';
import { useNavigate } from "react-router-dom";
import './TopLine.css';

function TopLine(props) {

  const navigate = useNavigate();

  function handleClick() {
    let url = (props.user && props.type !== 'all photos') ? `/user/${props.user}` : '/albums';
    navigate(url);
    props.showAlbums();
  }

  return ((props.albums) ? 
    <div className="top-div">Albums:</div> :
    <div className="top-div">Photos:
      <button className="back" onClick = { handleClick }>&#8592; Back to albums</button>
    </div>
  );
}

export default TopLine;