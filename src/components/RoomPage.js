import '../App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

function RoomPage() {
    let { id } = useParams();

    return (
        <div className="RoomPage">
            <h1>Your Room</h1>
            <h2>code: {id}</h2>
            
        </div>
    );
}

export default RoomPage;
