import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useRef } from "react";

import { connect } from 'react-redux';
import { showAlbums, showPhotos, showPopup, hidePopup, changeInput, addAlbum, addPhoto, loadAlbums, toLogin, toLogout } from '../../actions/action';

import ScrollToBottom from '../ScrollToBottom/ScrollToBottom';
import Albums from '../Albums/Albums';
import Photos from '../Photos/Photos';
import TopLine from '../TopLine/TopLine';
import Modal from '../Modal/Modal';
import Login from '../Login/Login';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

import './Content.css';

function Content(props) {

  console.log(props.type);

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

  function sortAlbums(albums) { console.log(albums);
    let albumsArr = [];
    let currentId = 0;
    let arrSize = albums.length;
    for (let i = 0; i < arrSize; i++) {
        if (currentId !== albums[i].userId) {
          currentId = albums[i].userId;
          albumsArr.push({ id: currentId, userId: currentId, name: `Album #${currentId}`, photos: [albums[i].title] });
        } else {
          albumsArr[currentId - 1].photos.push(albums[i].title);
        }
    }
    props.loadAlbums(albumsArr);
  }

  const previousAlbum = usePrevious(props.currentAlbum);

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

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return (props.albums && ref.current) ? 'previous album #' + ref.current : '';
  }

  function getHeader(user) {
    if (user) return <div className="header"><button className="login-logout" >logout</button></div>;
    return <div className="header"><button className="login-logout" >login</button></div>;
  }

  if (props.type === 'login') return (
    <div className="content border">
      <ErrorBoundary>
        <div className="header-container">{ getHeader(props.user) }</div>
        <Login inputValue={props.inputValue} changeInput={props.changeInput} toLogin={props.toLogin} />
      </ErrorBoundary>
    </div>
  );

  return (
    <div className="content border">
      <ErrorBoundary>
        <div className="header-container">{ getHeader(props.user) }</div>
        <ScrollToBottom />
        <div className="previous">{ previousAlbum }</div>
        <TopLine showAlbums={props.showAlbums} albums={props.albums} />
        <div className = "content-container">
          { getContent(props.albums, props.view) }
          { getAddNew(props.view.length) }
          { showPopUp(props.popup, props.albums) }
        </div>
        <div id="bottomSide"></div>
      </ErrorBoundary>
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
      user : state.userLoginId,
      popup : state.isPopup,
      inputValue : state.inputValue,
      currentAlbum : state.currentAlbum
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
      loadAlbums: (arr) => dispatch(loadAlbums(arr)),
      toLogin: (userId) => dispatch(toLogin(userId)),
      toLogout: () => dispatch(toLogout())
   }
};
export default connect(mapStateToProps, mapDispatchToProps)(Content);