export function showAlbums() {
   return {
      type: 'SHOW_ALBUMS'
   }
}
export function showPhotos(albumId) {
   return {
      type: 'SHOW_PHOTOS',
      albumId : albumId
   }
}
export function addAlbum() {
   return {
      type: 'ADD_ALBUM'
   }
}
export function addPhoto() {
   return {
      type: 'ADD_PHOTO',
   }
}
export function loadAlbums(arr) {
   return {
      type: 'LOAD_ALBUMS',
      arr : arr
   }
}