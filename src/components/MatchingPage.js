
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
        axios.get("https://radiant-savannah-04373.herokuapp.com/rooms")
            .then(res => {
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
    }, [])

    return (
        <div className="MatchingPage">
            <div className="card">
                <h3>{restaurants[index].name}</h3>
                <img src={restaurants[index].img} />
            </div>
        </div>
    );
}

export default MatchingPage;
