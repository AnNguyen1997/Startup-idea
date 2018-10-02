import React, { Component } from 'react';

export default class DrawingPanelSearchBar extends Component {
  constructor(props){
    super(props);
    this.state={
      term: ''
    }
  }

  onChange = (e) => {
    this.setState({term: e.target.value});
  }

  onKeyDown = (e) => {
    if(e.keyCode === 13){
      this.props.updateSearchTerm(this.state.term);
    }
  }

  render(){
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Type what you want to draw"
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}/>
        <button onClick={() => this.props.updateSearchTerm(this.state.term)}>Search</button>
      </div>
    );
  }
}
