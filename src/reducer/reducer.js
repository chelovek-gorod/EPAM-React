const initialState = {
   albums : [1, 2, 3],
   photos : [
      { "userId": 1, "id": 1, "title": "quidem molestiae enim" },
      { "userId": 1, "id": 2, "title": "sunt qui excepturi placeat culpa" },
      { "userId": 1, "id": 3, "title": "omnis laborum odio" },
      { "userId": 1, "id": 4, "title": "non esse culpa molestiae omnis sed optio" },
      { "userId": 1, "id": 5, "title": "eaque aut omnis a" },
      { "userId": 1, "id": 6, "title": "natus impedit quibusdam illo est" },
      { "userId": 1, "id": 7, "title": "quibusdam autem aliquid et et quia" },
      { "userId": 1, "id": 8, "title": "qui fuga est a eum" },
      { "userId": 1, "id": 9, "title": "saepe unde necessitatibus rem" },
      { "userId": 1, "id": 10, "title": "distinctio laborum qui" },
      { "userId": 2, "id": 11, "title": "quam nostrum impedit mollitia quod et dolor" },
      { "userId": 2, "id": 12, "title": "consequatur autem doloribus natus consectetur" },
      { "userId": 2, "id": 13, "title": "ab rerum non rerum consequatur ut ea unde" },
      { "userId": 2, "id": 14, "title": "ducimus molestias eos animi atque nihil" },
      { "userId": 2, "id": 15, "title": "ut pariatur rerum ipsum natus repellendus praesentium" },
      { "userId": 2, "id": 16, "title": "voluptatem aut maxime inventore autem magnam atque repellat" },
      { "userId": 2, "id": 17, "title": "aut minima voluptatem ut velit" },
      { "userId": 2, "id": 18, "title": "nesciunt quia et doloremque" },
      { "userId": 2, "id": 19, "title": "velit pariatur quaerat similique libero omnis quia" },
      { "userId": 2, "id": 20, "title": "voluptas rerum iure ut enim" },
      { "userId": 3, "id": 21, "title": "repudiandae voluptatem optio est consequatur rem in temporibus et" },
      { "userId": 3, "id": 22, "title": "et rem non provident vel ut" }
    ],
   pageAlbums: 0,
   pagePhotos: 0,
   albumId: 1,
   loaded : false
};

const maxInPage = 6;

function getLastPhotoPage(photos, user) {
   let userPhotos = photos.filter(obj => obj.userId === user);
   return Math.ceil(userPhotos.length / maxInPage);
}

function getLastAlbumPage(albums) {
   return Math.ceil(albums.length / maxInPage);
}

const reducer = (state = initialState, action) => {

   let obj = Object.assign({}, state);
   switch (action.type) {
      case 'LOADED': 
         console.log(action.date);
         return state;
      case 'ON_ERROR': 
         return state;
      case 'VIEW_ALBUMS': 
         obj.albumId = 0;
         obj.pagePhotos = 0;
         return obj;
      case 'ADD_ALBUM':
         obj.albums.push(obj.albums.length + 1);
         return obj;
      case 'VIEW_PHOTOS': 
         obj.albumId = action.album;
         return obj;
      case 'ADD_PHOTO':
         obj.photos.push({ "userId": obj.albumId, "id": obj.photos.length + 1, "title": "New photo" });
         return obj;
      case 'NEXT_PAGE': 
         if (obj.albumId) {
            obj.pagePhotos = (obj.pagePhotos === getLastPhotoPage(obj.photos, obj.albumId)) ? 0 : obj.pagePhotos + 1 ;
         }
         else {
            obj.pageAlbums = (obj.pageAlbums === getLastAlbumPage(obj.albums)) ? 0 : obj.pageAlbums + 1;
         }
         return obj;
      case 'PREVIOUS_PAGE':
         if (obj.albumId) {
            obj.pagePhotos = (obj.pagePhotos !== 0) ? getLastPhotoPage(obj.photos, obj.albumId) : obj.pagePhotos - 1 ;
         }
         else {
            obj.pageAlbums = (obj.pageAlbums !== 0) ? getLastAlbumPage(obj.albums) : obj.pageAlbums - 1;
         }
         return obj;
      default: return state;
   }
}
export default reducer;