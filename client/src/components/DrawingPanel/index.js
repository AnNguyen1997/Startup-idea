import React, { Component } from 'react';
import './index.css';

export default class DrawingPanel extends Component {
  constructor(props){
    super(props);
    this.state = {
      isDrawing: false,
      isErasing: false,
      lineJoin: 'miter',
      thickness: 1,
      color: 'black'
    }
  }

  offset = obj => {
		var curleft = 0,
				curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while ((obj = obj.offsetParent));
			return { x: curleft, y: curtop };
		}
		return undefined;
	};

  canvas = () => {
    return this.refs.canvas;
  }

  ctx = canvas => {
    return canvas.getContext('2d');
  }

  handleMouseMove = e => {
    const canvas = this.canvas();
    const ctx = this.ctx(canvas);
    if (this.state.isDrawing === false) {
      return;
    }
    let x = e.pageX - this.offset(canvas).x;
    let y = e.pageY - this.offset(canvas).y;
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  handleMouseDown = e => {
    const canvas = this.canvas();
    const ctx = this.ctx(canvas);
    this.setState({isDrawing: true});
    let x = e.pageX - this.offset(canvas).x;
    let y = e.pageY - this.offset(canvas).y;
    ctx.fillStyle = this.state.isErasing ? 'white' : this.state.color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineJoin = this.state.lineJoin;
    ctx.lineWidth = this.state.isErasing ? 20 : this.state.thickness;
    ctx.strokeStyle = this.state.isErasing ? 'white' : this.state.color;
  }

  handleMouseUp = () => {
    this.setState({isDrawing: false});
  }

  onColorChange = e => {
    let newColor = e.target.value;
    this.setState({color: newColor});
  }

  onThicknessChange = e => {
    let newThickness = e.target.value;
    this.setState({thickness: newThickness});
  }

  onLineJoinChange = e => {
    let newLineJoin = e.target.value;
    this.setState({lineJoin: newLineJoin});
  }

  usePencil = () => {
    this.setState({isErasing: false})
  }

  useEraser = () => {
    this.setState({isErasing: true});
  }

  clearCanvas = () => {
    const canvas = this.canvas();
    const ctx = this.ctx(canvas);
  	ctx.clearRect(0, 0, 1000, 600);
  }

  preview = () => {
    const canvas = this.canvas();
  	let dataUrl = canvas.toDataURL();
  	window.open(dataUrl, "", "width=880, height=300");
  }

  render(){
    return (
      <div className="container">
        <div className="main">
          <div className="controls">
            <div className="control">
              <img
                className={this.state.isErasing ? '' : 'chosen'}
                src="https://png.icons8.com/dusk/50/8E44AD/edit.png"
                alt="pencil icon"
                onClick={this.usePencil} />
            </div>
            <div className="control">
              <img
                className={this.state.isErasing ? 'chosen' : ''}
                src="https://png.icons8.com/dusk/50/8E44AD/eraser.png"
                alt="eraser icon"
                onClick={this.useEraser} />
            </div>
            <div className="control">
              <input type="color" id="color" onChange={this.onColorChange} />
            </div>
            <div className="control">
              <div>
                <input
                  type="radio"
                  className="radio_item"
                  value="miter"
                  name="item"
                  id="radio1"
                  onClick={this.onLineJoinChange}
                  defaultChecked="true"/>
                <label className="label_item" htmlFor="radio1">
                  <img src="../../assets/icons/miter.png" alt="miter icon"/>
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radio_item"
                  value="round"
                  name="item"
                  id="radio2"
                  onClick={this.onLineJoinChange} />
                <label className="label_item" htmlFor="radio2">
                  <img src="../../assets/icons/round.png" alt="round icon"/>
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radio_item"
                  value="bevel"
                  name="item"
                  id="radio3"
                  onClick={this.onLineJoinChange} />
                <label className="label_item" htmlFor="radio3">
                  <img src="../../assets/icons/bevel.png" alt="bevel icon"/>
                </label>
              </div>
            </div>
            <div className="control">
              <input type="range" value={this.state.thickness} step="1" min="1" max="100" onChange={this.onThicknessChange} />
            </div>
          </div>
          <canvas
            ref="canvas"
            className={this.state.isErasing ? 'eraser' : ''}
            width={window.innerWidth-150}
            height={window.innerHeight-100}
            onMouseMove={this.handleMouseMove}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}>
          </canvas>
        </div>
        <div className="footer">
          <button onClick={this.clearCanvas}>Clear Canvas</button>
          <button onClick={this.preview}>Preview</button>
          <button>Save</button>
        </div>
      </div>
    );
  }
}
