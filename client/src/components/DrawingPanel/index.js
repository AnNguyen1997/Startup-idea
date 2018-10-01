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
      <div>
        <canvas
          ref="canvas"
          className={this.state.isErasing ? 'eraser' : ''}
          height={600}
          width={1000}
          onMouseMove={this.handleMouseMove}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}></canvas>
        <br />
        <div className="holder">
            <span>Colors:</span>
            <input id="color" type="color" onChange={this.onColorChange}></input>
            <br />
        </div>
        <div className="holder">
            <span>Thickness:</span>
            <input min="1" max="100" type="number" onChange={this.onThicknessChange}></input><br /></div>
        <div className="holder">
            <span>Line Join Type:</span>
            <select id="lineJoin" onChange={this.onLineJoinChange}>
              <option value="miter">Sharp</option>
              <option value="round">Round</option>
              <option value="bevel">Bevel</option>
            </select>
        </div>
        <div className="holder">
            <span>Other:</span>
            <button onClick={this.usePencil}>Pencil</button>
            <button
              onClick={this.useEraser}>
              Eraser
            </button>
            <button onClick={this.clearCanvas}>Clear Canvas</button>
            <button onClick={this.preview}>Preview</button>
            <button>Save</button>
        </div>
      </div>
    );
  }
}
