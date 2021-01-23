import '../App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
const axios = require('axios');

function RoomPage() {
    let { id } = useParams();

    const getRestaurants = (lat, long, cat) => {
        axios.get('https://api.yelp.com/v3/businesses/search?term=restaurants&latitude='+lat+'&longitude='+long+'&categories='+cat)
        .then(response => {
            console.log(response.data.url);
            console.log(response.data.explanation);
          })
          .catch(error => {
            console.log(error);
          });
        }

    return (
        <div className="RoomPage">
            Welcome to le Room {id}
            <button onClick={getRestaurants()}>le Test</button>
        </div>
    );
}

export default RoomPage;
