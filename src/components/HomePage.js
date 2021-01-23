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

  return (
    <div className="HomePage">
      In a pickle
      <div><button><Link to={getRoom()}>Create Room</Link></button></div>
      <div>
        <input placeholder="Enter Room Code" type="text" value={roomCode} maxLength="4" onChange={handleRoomInput} ></input>
        <button><Link to={roomCode}>Join Room</Link></button>
      </div>

    </div>
  );
}

export default HomePage;