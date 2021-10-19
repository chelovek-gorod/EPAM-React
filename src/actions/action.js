export function loaded() {
   return {
      type: 'LOADED'
   }
}
export function viewAlbums() {
   return {
      type: 'VIEW_ALBUMS'
   }
}
export function addAlbum() {
   return {
      type: 'ADD_ALBUM'
   }
}
export function viewPhotos(album) {
   return {
      type: 'VIEW_PHOTOS',
      album: album
   }
}
export function addPhoto() {
   return {
      type: 'ADD_PHOTO'
   }
}
export function nextPage() {
   return {
      type: 'NEXT_PAGE'
   }
}
export function previousPage() {
   return {
      type: 'PREVIOUS_PAGE'
   }
}