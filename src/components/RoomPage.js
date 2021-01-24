import '../App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
import axios from 'axios';

function RoomPage() {
    let { id } = useParams();

    const getRestaurants = (latitude, longitude, price, cat) => {

        let budget = "";
        for(let x = 0; x < price.length; x++) {
            budget.concat(price[x]);
        }

        axios.get('https://cors-anywhere.herokuapp.com/' + 'https://api.yelp.com/v3/businesses/search?term=restaurants&latitude='+latitude+'&longitude='+longitude+'&price='+price+'&categories='+cat, {
            headers: {
                'Authorization': 'Bearer RiWn0-rteRq8DqYF-H_VYWdP3qvPffx2HuU6M149dhVAsYKnnBuopPeFk_1vgVkyN5q2mSRQ7v-hLFJ34O9U0AeVF0wKW12KR5rAHdZ_hk_JxfkGMA9CLLntoXEMYHYx',
                "Access-Control-Allow-Origin":"*",
            }
        })
        .then(response => {
            console.log(response);
            let r = response.data.businesses;
            let data = [];
            for(let i = 0; i < r.length; i++) {
                data.push( {
                    name: r[i].name, distance: r[i].distance, img: r[i].image_url
            })
            }
            data.sort(function(a,b){return a.distance - b.distance});
            console.log(data);
          })

          .catch(error => {
            console.log(error);
          });

        }

        function findLoc() {

            function success(position) {
              const latitude  = position.coords.latitude;
              const longitude = position.coords.longitude;
              console.log(latitude);
              console.log(longitude);
            }

            function error() {
            }

            if(!navigator.geolocation) {
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
                  <div id="client1">Heinz Doofenshmirtz</div>
                </div>
                <div class="clientNameFrame">
                  <div id="client2">Perry T. Platypus</div>
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

            <div class="roomButtons">
                <button class="testButton">FIND PICKLE</button>
                <button onClick={() => findLoc()}>WHERE</button>
                <button onClick={() => getRestaurants(37.786882, -122.399972, [1,2], "restaurant")}>YUM</button>
            </div>

        </div>
    );
}
export default RoomPage;
