import React, { Component } from 'react';

export default class DrawingPanelSearchResults extends Component {
  handleClick = (i) => {
    let img = `${this.props.searchTerm}${i+1}`;
    this.props.addImageToPanel(this.refs[img]);
  }

  getDrawings = () => {
    if(this.props.searchTerm === 'butterfly'){
      let imgArr = new Array(4).fill('');
      return imgArr.map((img, i) => {
        return <img
          key={i}
          src={`../../../assets/images/butterfly${i+1}.png`}
          ref={`butterfly${i+1}`}
          onClick={() => {this.handleClick(i)}} />;
      });
    }else{
      return <p>No drawings found!</p>;
    }
  }

  render(){
    return (
      <div className={this.props.searchTerm === '' ? 'search-results hidden' : 'search-results'}>
        {this.getDrawings()}
      </div>
    );
  }
}
