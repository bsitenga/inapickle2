import '../App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import axios from 'axios';

function MatchedPage() {


  return (
    <div className="MatchedPage">
      <h1 id="title" style={{textAlign: "center"}}>In a Pickle, you chose:</h1>
      <div class="placePreview">
      </div>
      <h2 style={{textAlign: "center"}}>
        Bello
      </h2>
      <div class="fpbutton">
        <button id="backHome"><Link to="/">Back to Home</Link></button>
      </div>
    </div>
  );
}

export default MatchedPage;
