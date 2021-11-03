import React from 'react';

import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { showAlbums, showPhotos, showPopup, hidePopup, addAlbum, addPhoto, loadAlbums } from '../../actions/action';
import Albums from '../Albums/Albums';
import Photos from '../Photos/Photos';
import TopLine from '../TopLine/TopLine';
import Modal from '../Modal/Modal';

import './Content.css';

function Content(props) {

  function getAlbums() {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then(res => res.json())
      .then((result) => {
          sortAlbums(result);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function sortAlbums(albums) {
    let albumsArr = [];
    let currentId = 0;
    let arrSize = albums.length;
    for (let i = 0; i < arrSize; i++) {
        if (currentId !== albums[i].userId) {
          currentId = albums[i].userId;
          albumsArr.push({ id: currentId, photos: [albums[i].title]});
        } else {
          albumsArr[currentId - 1].photos.push(albums[i].title);
        }
    }
    setTimeout(props.loadAlbums, 1000, albumsArr);
  }

  function getContent(albums, arr) {
    if (albums) return arr.map(album => <Albums key={album}  showPhotos={props.showPhotos} album={album} />);
    return arr.map(photo => <Photos key={photo} photo={photo} />);
  }

  function getAddNew(size) {
    if (props.albums) return <div className="album-div add-album" key={size + 1} onClick = { props.showPopup }><span>add album</span></div>
    //if (props.albums) return <div className="album-div add-album" key={size + 1} onClick = { props.addAlbum }><span>add album</span></div>
    return <div className="photo-div add-photo" key={size + 1} onClick = { props.addPhoto }><span>add photo</span></div>
  }

  if (props.loading) {
    getAlbums();
    return (<div className="content border"><div className="top-bottom-box top"><span className="title">Loading...</span></div></div>);
  }

  function showPopUp(popup) {
    if (popup) return ReactDOM.createPortal (
      <Modal albums={props.albums} hidePopup={props.hidePopup} />, document.body,
    );
  }

  return (
    <div className="content border">
      <TopLine showAlbums={props.showAlbums} albums={props.albums} />
      <div className = "content-container">
        { getContent(props.albums, props.view) }
        { getAddNew(props.view.length) }
        { showPopUp(props.popup) }
      </div>
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = (state) => { console.log(state);

   if (state.albumsArr.length === 0) return {loading : true};

   let toOutput = (state.showAlbums) ?
    state.albumsArr.map(album => album.id) :
    state.albumsArr[state.currentAlbum].photos.map(photo => photo);
   return {
      albums : state.showAlbums,
      view : toOutput,
      popup : state.isPopup
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      showAlbums: () => dispatch(showAlbums()),
      showPhotos: (id) => dispatch(showPhotos(id)),
      showPopup: () => dispatch(showPopup()),
      hidePopup: () => dispatch(hidePopup()),
      addAlbum: () => dispatch(addAlbum()),
      addPhoto: () => dispatch(addPhoto()),
      loadAlbums: (arr) => dispatch(loadAlbums(arr))
   }
};
export default connect(mapStateToProps, mapDispatchToProps)(Content);