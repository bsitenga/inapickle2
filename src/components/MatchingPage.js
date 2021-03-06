
import '../App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect
} from "react-router-dom";
import axios from 'axios';
import MatchedPage from './MatchedPage'
import React, { useState, useEffect } from 'react';

function MatchingPage() {
    let { id } = useParams();
    const [restaurants, setRestaurants] = useState([]);
    const [index, setIndex] = useState(0);
    const [found, setFound] = useState(false);

    useEffect(() => {

        // try {
        //     setInterval(() => {
        axios.get("https://radiant-savannah-04373.herokuapp.com/rooms")
            .then(res => {
                let currRoom;
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].roomCode == id) {
                        currRoom = res.data[i];
                    }
                }
                setRestaurants(currRoom.restaurants);
                let creatorSet = new Set();
                for (let i = 0; i < currRoom.creatorPreferences.length; i++) {
                    creatorSet.add(currRoom.creatorPreferences[i]);
                }
                for (let i = 0; i < currRoom.joinerPreferences.length; i++) {
                    if (creatorSet.has(currRoom.joinerPreferences[i])) {
                        setFound(true);
                    }
                }
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
        <div>
            {found ? <MatchedPage /> : <div className="MatchingPage">
                {restaurants.length > 0 ? <div><div className="card">
                    <h3 style={{textAlign: "center"}}>{restaurants[index].name}</h3>
                    <img style={{width: "80vw", height: "45vh" ,marginLeft: "10vw"}} src={restaurants[index].img} />
                    <h5 style={{textAlign: "center"}}>Distance: {restaurants[index].distance} miles</h5>
                </div>
                    <button style={{width: "35vw", marginLeft: "10vw", marginRight: "10vw"}} onClick={() => handleDislike()}>Dislike</button>
                    <button style={{width: "35vw"}} onClick={() => handleLike()}>Like</button>
                </div> :
                    <div>Loading...</div>}
            </div>}
        </div>
    );
}

export default MatchingPage;
