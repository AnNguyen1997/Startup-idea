import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

export default class UserPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      images: []
    }
  }

  componentDidMount = () => {
    fetch('/profile')
    .then(res => res.json())
    .then(res => {
      this.setState({
        username: res.username,
        images: res.image_url
      })
    });
  }

  render(){
    return (
      <div class="profile-container">
        <div class="side-bar">
          <div class="profile-img">
            <img src="../assets/profile-image.jpeg" alt="profile-image" />
          </div>
          <div class="info">
            <p><b>{this.state.username}</b></p>
          </div>
          <button><Link to="/">Create new drawing</Link></button>
        </div>
        <div class="images">
          {this.state.images.map((img, i) => {
            return (
              <img src={img} alt={`image${i}`} key={i} />
            );
          })}
        </div>
      </div>
    )
  }
}
