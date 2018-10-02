import React, { Component } from 'react';

export default class DrawingPanelSearchResults extends Component {
  getDrawings = () => {
    if(this.props.searchTerm === 'butterfly'){
      let imgArr = new Array(4).fill('');
      return imgArr.map((img, i) => {
        console.log(i);
        return <img key={i} src={`../../../assets/images/butterfly${i+1}.png`} />;
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
