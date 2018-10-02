import React from 'react';

export default function(props){
  return (
    <div className="controls">
      <div className="control">
        <img
          className={props.isErasing ? '' : 'chosen'}
          src="https://png.icons8.com/dusk/50/8E44AD/edit.png"
          alt="pencil icon"
          onClick={props.onPencilClick} />
      </div>
      <div className="control">
        <img
          className={props.isErasing ? 'chosen' : ''}
          src="https://png.icons8.com/dusk/50/8E44AD/eraser.png"
          alt="eraser icon"
          onClick={props.onEraserClick} />
      </div>
      <div className="control">
        <input type="color" id="color" onChange={props.onColorChange} />
      </div>
      <div className="control">
        <div>
          <input
            type="radio"
            className="radio_item"
            value="miter"
            name="item"
            id="radio1"
            onClick={props.onLineJoinChange}
            defaultChecked="true"/>
          <label className="label_item" htmlFor="radio1">
            <img src="../../../assets/icons/miter.png" alt="miter icon"/>
          </label>
        </div>
        <div>
          <input
            type="radio"
            className="radio_item"
            value="round"
            name="item"
            id="radio2"
            onClick={props.onLineJoinChange} />
          <label className="label_item" htmlFor="radio2">
            <img src="../../../assets/icons/round.png" alt="round icon"/>
          </label>
        </div>
        <div>
          <input
            type="radio"
            className="radio_item"
            value="bevel"
            name="item"
            id="radio3"
            onClick={props.onLineJoinChange} />
          <label className="label_item" htmlFor="radio3">
            <img src="../../../assets/icons/bevel.png" alt="bevel icon"/>
          </label>
        </div>
      </div>
      <div className="control">
        <input type="range" value={props.thickness} step="1" min="1" max="100" onChange={props.onThicknessChange} />
      </div>
    </div>
  );
}
