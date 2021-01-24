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
  const getRoom = () => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");
  const [creatorCode, setCreatorCode] = useState(getRoom());


  const handleRoomInput = (e) => {
    setRoomCode(e.target.value.toUpperCase())
  }

  const handleNameInput = (e) => {
    setName(e.target.value);
  }

  const createRoom = () => {
    axios.post("https://radiant-savannah-04373.herokuapp.com/roomcreator", {
      roomCode: creatorCode,
      creator: name
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  return (
    <div className="MatchedPage">
      <h1 id="title">In a Pickle, you and ___ chose:</h1>

    </div>
  );
}

export default HomePage;
