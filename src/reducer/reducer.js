const initialState = {
   albumsArr : [],
   showAlbums : true,
   currentAlbum : 0,
   isPopup : false
};

const reducer = (state = initialState, action) => {

   let obj = Object.assign({}, state);
   switch (action.type) {
      case 'SHOW_ALBUMS':
         obj.showAlbums = true;
         return obj;
      case 'SHOW_PHOTOS':
         obj.showAlbums = false;
         obj.currentAlbum = action.albumId - 1;
         return obj;
      case 'SHOW_POPUP':
         obj.isPopup = true;
         return obj;
      case 'HIDE_POPUP':
         obj.isPopup = false;
         return obj;
      case 'ADD_ALBUM':
         obj.albumsArr.push({id: obj.albumsArr.length + 1,  photos: []});
         return obj;
      case 'ADD_PHOTO':
         obj.albumsArr[obj.currentAlbum].photos.push('added # ' + obj.albumsArr[obj.currentAlbum].photos.length);
         return obj;

      case 'LOAD_ALBUMS':
         obj.albumsArr = [...action.arr];
         return obj;
      default: return state;
   }
}
export default reducer;