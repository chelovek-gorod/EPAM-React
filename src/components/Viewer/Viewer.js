import React from 'react';

/*
fetch("https://jsonplaceholder.typicode.com/albums")
      .then(res => res.json())
      .then(
         (result) => {
         let albums = result.filter(e => {
            if (e.userId <= albumsToLoad) return e;
          })
          setItems(albums);
        })
        .catch((error) => {
          setIsLoaded(true);
          setError(error);
        })
  }, []);
*/

function Viewer(props) {

   if (props.contentData.test)
      return (
         <div className = "wrapper">
            Good
         </div>
      );
   
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