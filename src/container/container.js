import { connect } from 'react-redux'
import contentData from '../components/Viewer/Viewer'
import { loaded, viewAlbums, addAlbum, viewPhotos, addPhoto, nextPage, previousPage } from '../actions/action';

const mapStateToProps = (state) => {
   if (!state.loaded)
      return {
         contentData: {test : false}
      };
   if (state.albumId === 0)
      return {
         contentData: 'ALbums' /*`A: ${state.albums}; P: ${state.photos}`*/
      };
   return {
      contentData: 'Photos' /*`A: ${state.albums}; P: ${state.photos}`*/
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      loaded: () => dispatch(loaded()),
      viewAlbums: () => dispatch(viewAlbums()),
      addAlbum: () => dispatch(addAlbum()),
      viewPhotos: () => dispatch(viewPhotos()),
      addPhoto: () => dispatch(addPhoto()),
      nextPage: () => dispatch(nextPage()),
      previousPage: () => dispatch(previousPage())
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(contentData);