import React, { useState, useEffect } from 'react';

import './Albums.css';

function Albums() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  let [albom, setAlbom] = useState(0);

  const albomsToLoad = 6;
  const albomsArr = [];
  for (let i = 1; i <= albomsToLoad; i++) albomsArr.push(i);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          let alboms = result.filter(e => {
            if (e.userId <= albomsToLoad) return e;
          })
          setItems(alboms);
        })
        .catch((error) => {
          setIsLoaded(true);
          setError(error);
        })
  }, []);

  function getAlbom() {
    return items.filter(e => e.userId === albom)
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (albom === 0){
    return (
        <div className="alboms">
            { albomsArr.map(e => <div className="albom-div" key={e} onClick={() => setAlbom(albom = e)}><span>Albom #{e}</span></div>) }
        </div>
    );
  } else {
    return (
        <div className="photos">
        <div><button onClick={() => setAlbom(albom = 0)}>Back to alboms</button></div>
        {getAlbom().map(e => <div className="photo" key={e.id}>{e.title}</div>)}
        </div>
    );
  }
}

export default Albums;