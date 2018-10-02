import React, { Component } from 'react';
import './index.css';
import DrawingPanelControls from './DrawingPanelControls';
import DrawingPanelFooter from './DrawingPanelFooter';

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
          <DrawingPanelControls
            isErasing={this.state.isErasing}
            thickness={this.state.thickness}
            onPencilClick={this.usePencil}
            onEraserClick={this.useEraser}
            onColorChange={this.onColorChange}
            onLineJoinChange={this.onLineJoinChange}
            onThicknessChange={this.onThicknessChange}
          />
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
        <DrawingPanelFooter
          clearCanvas={this.clearCanvas}
          preview={this.preview}
        />
      </div>
    );
  }
}
