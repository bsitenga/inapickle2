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
            Welcome to le Room {id}
        </div>
    );
}

export default RoomPage;
