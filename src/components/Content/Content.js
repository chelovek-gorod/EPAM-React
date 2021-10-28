import React from 'react';
import { connect } from 'react-redux';
import { nextPage, previousPage, showAlbums, showPhotos, addAlbum, addPhoto, loadAlbums } from '../../actions/action';
import Albums from '../Albums/Albums';
import Photos from '../Photos/Photos';
import TopLine from '../TopLine/TopLine';
import BottomLine from '../BottomLine/BottomLine';

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
    if (albums) return arr.map(album => <Albums showPhotos={props.showPhotos} album={album} />);
    return arr.map(photo => <Photos photo={photo} />);
  }

  function getAddNew(size) {
    if (size < props.maxOnPage) {
        if (props.albums) return <div className="album-div add-album" key={size + 1} onClick = { props.addAlbum }><span>add album</span></div>
        return <div className="photo-div add-photo" key={size + 1} onClick = { props.addPhoto }><span>add photo</span></div>
    }
  }

  if (props.loading) {
    getAlbums();
    return (<div className="content border"><div className="top-bottom-box top"><span className="title">Loading...</span></div></div>);
  }

  return (
    <div className="content border">
      <TopLine showAlbums={props.showAlbums} albums={props.albums} />
      <div className = "content-container">
        { getContent(props.albums, props.view) }
        { getAddNew(props.view.length) }
      </div>
      <BottomLine previousPage={props.previousPage} nextPage={props.nextPage} pages={props.pages} />
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////////////

function outputItems(arr, startPoint, lastPoint, isAlbums) {
   let outputArr = [];
   for (let i = startPoint; i < lastPoint; i++ ) {
      if (arr[i]) (isAlbums) ? outputArr.push(arr[i].id) : outputArr.push(arr[i]);
      else break;
   }
   return outputArr;
}

const mapStateToProps = (state) => { console.log(state);

   if (state.albumsArr.length === 0) return {loading : true};

   let startPoint = (state.showAlbums) ? state.pageAlbums * state.elementsOnPage : state.pagePhotos * state.elementsOnPage;
   let lastPoint = startPoint + state.elementsOnPage;
   let pages = {
      current : (state.showAlbums) ? state.pageAlbums + 1 : state.pagePhotos + 1,
      last : (state.showAlbums) ?
         Math.floor(state.albumsArr.length / state.elementsOnPage) + 1 :
         Math.floor(state.albumsArr[state.currentAlbum].photos.length / state.elementsOnPage) + 1
   }
   let toOutput = (state.showAlbums) ? state.albumsArr : state.albumsArr[state.currentAlbum].photos;
   return {
      albums : state.showAlbums,
      maxOnPage : state.elementsOnPage,
      pages: pages,
      view : outputItems(toOutput, startPoint, lastPoint, state.showAlbums)
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      nextPage: () => dispatch(nextPage()),
      previousPage: () => dispatch(previousPage()),
      showAlbums: () => dispatch(showAlbums()),
      showPhotos: (id) => dispatch(showPhotos(id)),
      addAlbum: () => dispatch(addAlbum()),
      addPhoto: () => dispatch(addPhoto()),
      loadAlbums: (arr) => dispatch(loadAlbums(arr))
   }
};
export default connect(mapStateToProps, mapDispatchToProps)(Content);