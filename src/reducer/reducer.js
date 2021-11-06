const initialState = {
   albumsArr : [],
   showAlbums : true,
   currentAlbum : 0,
   isPopup : false,
   userLoginId : (localStorage.getItem('userId')) ? localStorage.getItem('userId') : 0,
   inputValue : {id : '', value: ''}
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
         obj.inputValue = '';
         return obj;
      case 'ADD_ALBUM':
         obj.albumsArr.push({id: obj.albumsArr.length + 1, userId: obj.userLoginId , name: action.name, photos: []});
         return obj;
      case 'CHANGE_INPUT':
         obj.inputValue = {id : action.id, value: action.value};
         return obj;
      case 'ADD_PHOTO':
         obj.albumsArr[obj.currentAlbum].photos.push(action.name);
         return obj;

      case 'LOAD_ALBUMS':
         obj.albumsArr = [...action.arr];
         return obj;
      default: return state;

      case 'TO_LOGIN':
         obj.userLoginId = action.userId;
         obj.showAlbums = true;
         return obj;
      case 'TO_LOGOUT':
         obj.userLoginId = 0;
         return obj;
   }
}
export default reducer;