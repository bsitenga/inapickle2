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

function RoomPage() {
    let { id } = useParams();
    const [creatorName, setCreatorName] = useState("Joining...");
    const [joinerName, setJoinerName] = useState("Waiting for a friend...");
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);

    useEffect(() => {
        try {
            setInterval(() => {
                axios.get("https://radiant-savannah-04373.herokuapp.com/rooms")
                    .then(res => {
                        let currRoom;
                        for (let i = 0; i < res.data.length; i++) {
                            if (res.data[i].roomCode == id) {
                                currRoom = res.data[i];
                            }
                        }
                        setCreatorName(currRoom.creator);
                        if (currRoom.joiner != "NOJOIN") {
                            setJoinerName(currRoom.joiner);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }, 4000);
        } catch (e) {
            console.log(e);
        }
    }, [creatorName])

    const getRestaurants = (latitude, longitude, price, cat) => {

        let budget = "";
        for (let x = 0; x < price.length; x++) {
            budget.concat(price[x]);
        }

        axios.get('https://cors-anywhere.herokuapp.com/' + 'https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=' + latitude + '&longitude=' + longitude + '&price=' + price + '&categories=' + cat, {
            headers: {
                'Authorization': 'Bearer RiWn0-rteRq8DqYF-H_VYWdP3qvPffx2HuU6M149dhVAsYKnnBuopPeFk_1vgVkyN5q2mSRQ7v-hLFJ34O9U0AeVF0wKW12KR5rAHdZ_hk_JxfkGMA9CLLntoXEMYHYx',
                "Access-Control-Allow-Origin": "*",
            }
        })
            .then(response => {
                console.log(response);
                let r = response.data.businesses;
                let data = [];
                for (let i = 0; i < r.length; i++) {
                    data.push({
                        name: r[i].name, distance: (r[i].distance/1600).toFixed(2), img: r[i].image_url
                    })
                }
                data.sort(function (a, b) { return a.distance - b.distance });
                console.log(data);
                axios.post('https://radiant-savannah-04373.herokuapp.com/restaurants', {
                    roomCode: id,
                    restaurants: data
                })
                .then(response => console.log(response))
                .catch(error => console.log(error))
            })

            .catch(error => {
                console.log(error);
            });

    }

    function findLoc() {

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLat(latitude);
            setLong(longitude);
        }

        function error() {
            console.log("geolocation error");
        }

        if (!navigator.geolocation) {
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }

    }

    return (
        <div className="RoomPage">
            <h1> Your Room </h1>
            <div class="codeBox">
                <h3>Code: {id} </h3>
                <span class="code"></span>
            </div>
            <div class="nameBox">
                <div class="clientNameFrame">
                    <div id="client1">{creatorName}</div>
                </div>
                <div class="clientNameFrame">
                    <div id="client2">{joinerName}</div>
                </div>
            </div>
            <div class="moneySlider">
                <div class="checkboxes">
                    $
                    <input type="checkbox"></input>
                    $$
                    <input type="checkbox"></input>
                </div>
                <div class="checkboxes">
                    $$$
                    <input type="checkbox"></input>
                    $$$$
                    <input type="checkbox"></input>
                </div>
            </div>

            <div>
                <div class="fpbutton">
                    <button onClick={() => findLoc()}>Find Me</button>
                </div>
                <div class="fpbutton">
                    <button onClick={() => getRestaurants(lat, long, [1, 2, 3], "restaurant")}><Link to={id + "/matching"}>Start Matching</Link></button>
                </div>
            </div>

        </div>
    );
}

export default RoomPage;
