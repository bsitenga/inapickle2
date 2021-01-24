import '../App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import axios from 'axios';

function MatchedPage() {
  let { id } = useParams();
  const [name, setName] = useState("")

  useEffect(() => {
    axios.get("https://radiant-savannah-04373.herokuapp.com/rooms")
      .then(res => {
        let currRoom;
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].roomCode == id) {
            currRoom = res.data[i];
          }
        }
        let creatorSet = new Set();
        for (let i = 0; i < currRoom.creatorPreferences.length; i++) {
          creatorSet.add(currRoom.creatorPreferences[i]);
        }
        for (let i = 0; i < currRoom.joinerPreferences.length; i++) {
          if (creatorSet.has(currRoom.joinerPreferences[i])) {
            setName(currRoom.joinerPreferences[i])
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  })

  return (
    <div className="MatchedPage">
      <h1 id="title" style={{ textAlign: "center" }}>In a Pickle, you chose:</h1>
      <div class="placePreview">
      </div>
      <h2 style={{ textAlign: "center" }}>
        {name}
      </h2>
      <div class="fpbutton">
        <button id="backHome"><Link to="/">Back to Home</Link></button>
      </div>
    </div>
  );
}

export default MatchedPage;
