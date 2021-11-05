export function showAlbums() {
   return {
      type: 'SHOW_ALBUMS'
   }
}
export function showPhotos(albumId) {
   return {
      type: 'SHOW_PHOTOS', albumId
   }
}
export function showPopup() {
   return {
      type: 'SHOW_POPUP'
   }
}
export function hidePopup() {
   return {
      type: 'HIDE_POPUP'
   }
}
export function changeInput({id, value}) {
   return {
      type: 'CHANGE_INPUT', id, value
   }
}
export function addAlbum(name) {
   return {
      type: 'ADD_ALBUM', name
   }
}
export function addPhoto(name) {
   return {
      type: 'ADD_PHOTO', name
   }
}
export function loadAlbums(arr) {
   return {
      type: 'LOAD_ALBUMS', arr
   }
}

export function toLogin(userId) {
   return {
      type: 'TO_LOGIN', userId
   }
}
export function toLogout() {
   return {
      type: 'TO_LOGOUT'
   }
}