import React, { Component } from 'react';
import './index.css';
import DrawingPanelControls from './DrawingPanelControls';
import DrawingPanelFooter from './DrawingPanelFooter';
import DrawingPanelSearchBar from './DrawingPanelSearchBar';
import DrawingPanelSearchResults from './DrawingPanelSearchResults';

export default class DrawingPanel extends Component {
  constructor(props){
    super(props);
    this.state = {
      isDrawing: false,
      isErasing: false,
      lineJoin: 'miter',
      thickness: 1,
      color: 'black',
      searchTerm: ''
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
  	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  }

  preview = () => {
    const canvas = this.canvas();
  	const dataUrl = canvas.toDataURL("image/png");
    const win=window.open("", '_blank', "width=500, height=500");
    win.document.write("<img src='"+dataUrl+"'/>");
  }

  save = () => {
    console.log('save')
    const canvas = this.canvas();
  	const dataUrl = canvas.toDataURL("image/png");
    fetch('/upload', {
      body: JSON.stringify(dataUrl),
      headers: {
            "Content-Type": "application/json; charset=utf-8",
      },
      method: 'POST'
    }).then(res => { console.log('done'); });
  }

  calculateCanvasHeight = () => {
    let innerHeight = window.innerHeight;
    if(this.state.searchTerm !== ''){
      return innerHeight - 230;
    }
    return innerHeight - 150;
  }

  updateSearchTerm = (term) => {
    this.setState({searchTerm: term});
  }

  addImageToPanel = (img) => {
    const canvas = this.canvas();
    const ctx = this.ctx(canvas);
    let imgWidth = img.clientWidth + 200;
    let imgHeight = imgWidth * (img.clientHeight / img.clientWidth);
    let dx = (canvas.clientWidth - imgWidth)/2;
    let dy = (canvas.clientHeight - imgHeight)/2;
    ctx.globalAlpha = 0.4;
    ctx.drawImage(img, dx, dy, imgWidth, imgHeight);
  }

  render(){
    return (
      <div className="panel-container">
        <DrawingPanelSearchBar updateSearchTerm={this.updateSearchTerm}/>
        <DrawingPanelSearchResults
          searchTerm={this.state.searchTerm}
          addImageToPanel={(img) => this.addImageToPanel(img)}/>
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
            width={window.innerWidth-200}
            height={this.calculateCanvasHeight()}
            onMouseMove={this.handleMouseMove}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}>
          </canvas>
        </div>
        <DrawingPanelFooter
          clearCanvas={this.clearCanvas}
          preview={this.preview}
          save={this.save}
        />
      </div>
    );
  }
}
