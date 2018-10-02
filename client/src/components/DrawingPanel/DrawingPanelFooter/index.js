import React from 'react';

export default function(props){
  return (
    <div className="footer">
      <button onClick={props.clearCanvas}>Clear Canvas</button>
      <button onClick={props.preview}>Preview</button>
      <button>Save</button>
    </div>
  )
}
