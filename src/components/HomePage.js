import '../App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

function HomePage() {
  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");

  const getRoom = () => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleRoomInput = (e) => {
    setRoomCode(e.target.value.toUpperCase())
  }

  const handleNameInput = (e) => {
    setName(e.target.value);
  }

  return (
    <div className="HomePage">
      <h1 id="title">In a Pickle</h1>
      <img src="pickle_logo.png" alt="In a Pickle Logo"></img>
      <input placeholder="Name" type="text" maxLength="20" onChange={handleNameInput} class="enterName" value={name}></input>

      <div class="fpbutton">
        <input placeholder="Enter Room Code" type="text" id="codeinput" value={roomCode} maxLength="4" onChange={handleRoomInput} ></input>
        <button id="joinroombutton"><Link to={roomCode}>Join Room</Link></button>
      </div>

      <div class="fpbutton">
        <button><Link to={getRoom()}>Create Room</Link></button>
      </div>
    </div>
  );
}

export default HomePage;
