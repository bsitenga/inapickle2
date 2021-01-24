import '../App.css'; //I don't know how to properly start this so LOOK OveR
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

function HistoryPage() {
    let { id } = useParams();

function populate() {
    //fetch past matches w/ restaraunt, date, w/ who, top eat, unique eats
    //for loop: insert each match by calling insertMatches
    document.querySelector("#top-eat").textContent = "";
    document.querySelector("#unique-eat-num").textContent = "";
}

function insertMatches(name, date, partner) {
    let newMatch = document.createElement("div");
    newMatch.append(name + " with:");
    let newDate = document.createElement("div");
    newDate.textContent = date;
    newMatch.append(date);
    newMatch.append(partner);
}

// Fetch information from local files (past matches, restaurant, date, w/ who, top eat, unique eats)
// Populate #matches w/ elements
// If no prior matches, top & unique eats = none
// Add corresponding class,id,etc. to elements
// implement scrollbar?



    return (
        <div className="HistoryPage">
          Your Matches
            <div id="matches"></div>
            <div id="accolades">
              <div id="top-eats">Top Eat: </div>
              <div id="unique-eats">Unique Eats: </div>
              <div id="buddy"></div>
            </div>

        </div>
        <button onClick={getRestaurants()}>le Test</button>
    );
}

export default HistoryPage;
