
import '../App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function MatchingPage() {
    let { id } = useParams();
    const [restaurants, setRestaurants] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // try {
        //     setInterval(() => {
        axios.get("https://radiant-savannah-04373.herokuapp.com/rooms")
            .then(res => {
                console.log("res", res);
                let currRoom;
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].roomCode == id) {
                        currRoom = res.data[i];
                    }
                }
                console.log("Current", currRoom);
                setRestaurants(currRoom.restaurants);
            })
            .catch(function (error) {
                console.log(error);
            })
        //     }, 3000);
        // } catch (e) {
        //     console.log(e);
        // }
    })

    const handleLike = () => {
        axios.post("https://radiant-savannah-04373.herokuapp.com/preferences", {
            roomCode: id,
            restaurantName: restaurants[index].name,
            userType: localStorage.getItem("userType")
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
        setIndex(index + 1);
    }

    const handleDislike = () => {
        setIndex(index + 1);
    }

    return (
        <div className="MatchingPage">
            {console.log("RESTAURANTS", restaurants)}
            {restaurants.length > 0 ? <div><div className="card">
                <h3>{restaurants[index].name}</h3>
                <img src={restaurants[index].img} />
                <h5>Distance: {restaurants[index].distance} miles</h5>
            </div>
                <button onClick={() => handleDislike()}>Dislike</button>
                <button onClick={() => handleLike()}>Like</button>
            </div> :
                <div>Loading...</div>}
        </div>
    );
}

export default MatchingPage;
