import React from 'react';
import { useNavigate } from "react-router-dom";
import './Albums.css';

function Album(props) {

  const navigate = useNavigate();

  function handleClick() {
    let url = (props.user && props.type !== 'all albums') ? `/user/${props.user}/albums/${props.albumId}` : `/albums/${props.albumId}`;
    navigate(url);
    props.showPhotos(props.albumId);
  }

  return (
    <div className="album-div" onClick={handleClick}>
        <span>{props.album}</span>
    </div>
  );
}

export default Album;