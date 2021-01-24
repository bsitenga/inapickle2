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

    const getRestaurants = (lat, long, cat) => {
        axios.get('https://api.yelp.com/v3/businesses/search?term=restaurants&latitude='+lat+'&longitude='+long+'&categories='+cat, {
            headers: {
                'Authorization': 'Bearer RiWn0-rteRq8DqYF-H_VYWdP3qvPffx2HuU6M149dhVAsYKnnBuopPeFk_1vgVkyN5q2mSRQ7v-hLFJ34O9U0AeVF0wKW12KR5rAHdZ_hk_JxfkGMA9CLLntoXEMYHYx'
            }
        })
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
            Welcome to le Room
            <h1> Your Room </h1>
            <div class="codeBox">
                <h3>Code: {id} </h3>
                <span class="code"></span>
            </div>

            <div class="nameBox">
                <div class="nameFrame">>
                  <div id="client1">Heinz Doofenshmirtz</div>
                </div>
                <div class="nameFrame">
                  <div id="client2">Perry T. Platypus</div>
                </div>
            </div>

            <div class="moneySlider">
                $
                <input type="range" min="1" max="10" value="50" class="slider" id="range"></input>
                $$$$$
            </div>

            <div>
                <button>FIND PICKLE</button>
                <button onClick={getRestaurants()}>le Test</button>
            </div>

        </div>
    );
}

export default RoomPage;
