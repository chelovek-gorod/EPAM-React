import React from 'react';

function getAlbums(props) {
   fetch("https://jsonplaceholder.typicode.com/albums")
   .then(res => res.json())
   .then(
      (result) => {
      console.log(result);
      props.loaded(result);
     })
     .catch((error) => {
      props.onError(error);
     })
}

function Viewer(props) {

   if (props.contentData.view === 'Loading...') {
      getAlbums(props);
      
      return (
         <div className = "wrapper">
            props.contentData.view
         </div>
      );
   }
   
   return (
      <div className = "wrapper">
         <div>{props.contentData.test}</div>

         <button onClick = {props.viewAlbums}>VIEW ALBUMS</button>
         <button onClick = {props.addAlbum}>ADD ALBUM</button>
         <button onClick = {() => props.viewPhotos(1)}>VIEW PHOTOS</button>
         <button onClick = {props.addPhoto}>ADD PHOTO</button>
         <button onClick = {props.nextPage}>NEXT PAGE</button>
         <button onClick = {props.previousPage}>PREVIOUS_PAGE</button>
      </div>
   );
}
export default Viewer;