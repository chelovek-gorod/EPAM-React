import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useRef } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

import { connect } from 'react-redux';
import { showAlbums, showPhotos, showPopup, hidePopup, changeInput, addAlbum, addPhoto, loadAlbums, toLogin, toLogout } from '../../actions/action';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import UserDetails from '../UserDetails/UserDetails';
import ScrollToBottom from '../ScrollToBottom/ScrollToBottom';
import Albums from '../Albums/Albums';
import Photos from '../Photos/Photos';
import TopLine from '../TopLine/TopLine';
import Modal from '../Modal/Modal';
import Login from '../Login/Login';


import './Content.css';

function Content(props) {

  const previousAlbum = usePrevious(props.currentAlbum);
  const navigate = useNavigate();
  const location = useLocation();

  let { userId, albumId } = useParams(); userId = +userId; albumId= +albumId;

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
          albumsArr.push({ id: currentId, userId: currentId, name: `Album #${currentId}`, photos: [albums[i].title] });
        } else {
          albumsArr[currentId - 1].photos.push(albums[i].title);
        }
    }
    props.loadAlbums(albumsArr);
  }

  if (props.type === 'login') {
    if (props.user) {
      if (location.pathname !== `/user/${props.user}`) navigate(`/user/${props.user}`);
    } 
    else {
      if (location.pathname !== '/login') navigate('/login');
    }
  }

  // READ URL 
  if (userId && userId !== props.user) {
    (props.user) ? navigate(`/albums`) : navigate(`/login`);
  }
  
  if (albumId) {
    if (Number.isInteger(albumId) && albumId > 0 && albumId <= props.albumsSize) {
      if (props.albums) props.showPhotos(albumId);
    } else {
      if (!props.albums) navigate(`/albums`);
    }
  }

  let key = 0;
  function getKey() {
    return key++;
  }

  function outputAlbums() { // props.view, props.user
    if (props.type === 'all albums') {
      return props.view.map(album => <Albums key={album.id} albumId={album.id} showPhotos={props.showPhotos} album={album.name} user={props.user} type={props.type} />);
    } else {
      let userAlbums = props.view.filter(album => album.user === props.user);
      return userAlbums.map(album => <Albums key={album.id} albumId={album.id} showPhotos={props.showPhotos} album={album.name} user={props.user} type={props.type} />);
    }
  }

  function outputPhotos() {
    return props.view.map(photo => <Photos key={getKey()} photo={photo} />);
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

  function clickLogout () {
    localStorage.clear();
    props.toLogin(0);
  }

  function getHeaderLogin(user) {
    if (user) return <Link className="login-logout" onClick={ clickLogout } to={ (props.type === "all albums") ? "/albums" : "/login" }>logout</Link>;
    return <Link className="login-logout" to="/login">login</Link>;
  }

  return (
    <ErrorBoundary>

      <div className="header-container">
        <div className="header">
          <div className="linksLine">
            <Link className="link" to="/login" >HOME PAGE</Link>
            <Link className="link" to="/albums" onClick={ props.showAlbums } >ALL ALBUMS</Link>
          </div>
          { getHeaderLogin(props.user) }
        </div>
      </div>

      { (props.user && ( props.type === 'user albums' || props.type === 'user photos')) ? <UserDetails /> : null}

      <div className="content border">

        { (props.type === 'login') ? (<Login inputValue={props.inputValue} changeInput={props.changeInput} toLogin={props.toLogin} />) : (
          <>
            <ScrollToBottom />
            <div className="previous">{ previousAlbum }</div>
            <TopLine showAlbums={props.showAlbums} albums={props.albums} user={props.user} type={props.type} />
            <div className = "content-container">
              { (props.albums) ? outputAlbums() : outputPhotos() }
              { (props.user && (userId === props.user) ) ? getAddNew(props.view.length) : null }
              { showPopUp(props.popup, props.albums) }
            </div>
            <div id="bottomSide"></div>
          </>
        ) }

      </div>
    </ErrorBoundary>
  );

}

////////////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = (state) => {

   if (state.albumsArr.length === 0) return {loading : true};

   let toOutput = (state.showAlbums) ?
    state.albumsArr.map(album => { return {id: album.id, user: album.userId, name: album.name};}) :
    state.albumsArr[state.currentAlbum].photos.map(photo => photo);
   return {
      albums : state.showAlbums,
      albumsSize : state.albumsArr.length,
      view : toOutput,
      user : state.userLoginId,
      popup : state.isPopup,
      inputValue : state.inputValue,
      currentAlbum : state.currentAlbum,
      albumId : (state.currentAlbum) ? state.albumsArr[state.currentAlbum].id : 0
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