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

function HomePage() {
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

  const joinRoom = () => {
    console.log("test");
    axios.post("https://radiant-savannah-04373.herokuapp.com/roomjoiner", {
      roomCode: roomCode,
      joiner: name
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    })
    console.log("test");
  }

  return (
    <div className="HomePage">
      <h1 id="title">In a Pickle</h1>
      <img src="inapickle.png" alt="In a Pickle Logo"></img>
      <input placeholder="Name" type="text" maxLength="20" onChange={handleNameInput} class="enterName" value={name}></input>

      <div class="fpbutton">
        <input placeholder="Enter Room Code" type="text" id="codeinput" value={roomCode} maxLength="4" onChange={handleRoomInput} ></input>
        <button id="joinroombutton" onClick={() => joinRoom()}><Link to={roomCode}>Join Room</Link></button>
      </div>

      <div class="fpbutton">
        <button onClick={() => createRoom()}><Link to={creatorCode}>Create Room</Link></button>
      </div>
    </div>
  );
}

export default HomePage;
