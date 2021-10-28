import React from 'react';
import './BottomLine.css';

function getPages(pages) {
  if (pages.last === 1) return <span><b>{'[1]'}</b></span>
  if (pages.current === 1) return <span><b>{'[1]'}</b>...{pages.last}</span>
  if (pages.current === pages.last) return <span>1...<b>{'[' + pages.last + ']'}</b></span>
  return <span>1...<b>{'[' + pages.current + ']'}</b>...{pages.last}</span>
}

function BottomLine(props) {
  return (
    <div className="bottom-div">
        <button className = "left" onClick = { props.previousPage }>&#8592;</button>
        { getPages(props.pages) }
        <button className = "right" onClick = { props.nextPage }>&#8594;</button>
    </div>
  );
}

export default BottomLine;