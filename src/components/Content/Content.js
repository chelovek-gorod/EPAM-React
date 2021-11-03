import React from 'react';

import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { showAlbums, showPhotos, showPopup, hidePopup, changeInput, addAlbum, addPhoto, loadAlbums } from '../../actions/action';

import ScrollToBottom from '../ScrollToBottom/ScrollToBottom';
import Albums from '../Albums/Albums';
import Photos from '../Photos/Photos';
import TopLine from '../TopLine/TopLine';
import Modal from '../Modal/Modal';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

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
          albumsArr.push({ id: currentId, name: `Album #${currentId}`, photos: [albums[i].title]});
        } else {
          albumsArr[currentId - 1].photos.push(albums[i].title);
        }
    }
    setTimeout(props.loadAlbums, 1000, albumsArr);
  }

  let key = 0;
  function getKey() {
    return key++;
  }

  function getContent(albums, arr) {
    if (albums) return arr.map(album => <Albums key={album.id} albumId={album.id} showPhotos={props.showPhotos} album={album.name} />);
    return arr.map(photo => <Photos key={getKey()} photo={photo} />);
  }

  function getAddNew(size) {
    if (props.albums) return <div className="album-div add-album" key={size + 1} onClick = { props.showPopup }><span>add album</span></div>
    return <div className="photo-div add-photo" key={size + 1} onClick = { props.showPopup }><span>add photo</span></div>
  }

  if (props.loading) {
    getAlbums();
    return (<div className="content border"><div className="top-bottom-box top"><span className="title">Loading...</span></div></div>);
  }

  function showPopUp(popup, albums) {
    if (popup) return ReactDOM.createPortal (
      (albums) ? <Modal albums={props.albums} hidePopup={props.hidePopup} inputValue={props.inputValue} changeInput={props.changeInput} add={props.addAlbum} /> :
      <Modal albums={props.albums} hidePopup={props.hidePopup} inputValue={props.inputValue} changeInput={props.changeInput} add={props.addPhoto} /> ,
      document.body
    );
  }

  return (
    <div className="content border">
      <ScrollToBottom />
      <TopLine showAlbums={props.showAlbums} albums={props.albums} />
      <div className = "content-container">
        <ErrorBoundary>
          { getContent(props.albums, props.view) }
          { getAddNew(props.view.length) }
          { showPopUp(props.popup, props.albums) }
        </ErrorBoundary>
      </div>
      <div id="bottomSide"></div>
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = (state) => {

   if (state.albumsArr.length === 0) return {loading : true};

   let toOutput = (state.showAlbums) ?
    state.albumsArr.map(album => { return {id: album.id, name: album.name};}) :
    state.albumsArr[state.currentAlbum].photos.map(photo => photo);
   return {
      albums : state.showAlbums,
      view : toOutput,
      popup : state.isPopup,
      inputValue : state.inputValue
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      showAlbums: () => dispatch(showAlbums()),
      showPhotos: (id) => dispatch(showPhotos(id)),
      showPopup: () => dispatch(showPopup()),
      hidePopup: () => dispatch(hidePopup()),
      changeInput: (value) => dispatch(changeInput(value)),
      addAlbum: (name) => dispatch(addAlbum(name)),
      addPhoto: (name) => dispatch(addPhoto(name)),
      loadAlbums: (arr) => dispatch(loadAlbums(arr))
   }
};
export default connect(mapStateToProps, mapDispatchToProps)(Content);