import React from 'react';
import './ScrollToBottom.css';

function ScrollToBottom() {

  function toBottom() {
    const bottomSide = document.getElementById('bottomSide');
    const elementPosition = bottomSide.getBoundingClientRect().top;
        
    window.scrollBy({
        top: elementPosition,
        behavior: 'smooth'
    });
  }
  
  return (<div className="to-bottom" onClick={ toBottom } >&#9660;</div>);
}

export default ScrollToBottom;