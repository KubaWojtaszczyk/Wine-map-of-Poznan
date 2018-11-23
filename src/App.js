import React, { Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import firebase, {db} from './firebase';
import { Button } from 'reactstrap';
import Child from "./Child";
import fb from "./images/fb.png";
import google from "./images/google.png";
import insta from "./images/insta.png";
import 'bootstrap/dist/css/bootstrap.min.css';


const myIcon = L.icon({
    iconUrl: `https://unpkg.com/leaflet@1.3.4/dist/images/marker-icon.png`,
    iconSize: [25, 41],
    iconAnchor: [22, 94],
    popupAnchor: [-10, -90],
});


class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            lat: 52.4033437,
            lng: 16.9166729,
            zoom: 13,
            data: false,
            isHidden: true,
            place: null,

        }
    }

    updateRating = (id, rating) => {
        const newState = this.state.data;
        const newIndex = newState.findIndex( el => el.id === id);
        newState[newIndex].rating = rating
        this.setState ({
            data: newState
        })
    }

    updateWine = (id, rating) => {
        const newWineRating = this.state.data;
        const newIndex = newWineRating .findIndex( el => el.id === id);
        newWineRating [newIndex].wineRating = rating
        this.setState ({
            data: newWineRating
        })
    }

    componentDidMount() {
        const winery  = [];
        db.collection("winery").get().then(data => {
        data.forEach(doc => {
            winery.push(doc.data());
        })
            this.setState ({
                data: winery
            })
            console.log(this.state.data);
            console.log(this.state.data[0]);
            console.log(this.state.data[1]);
            console.log(this.state.data[2]);
        })
    }

    toggleHidden = (event, markerId)=> {
        const onePlace = this.state.data.filter(place => {
            return place.id === markerId
        })

        this.setState({
            isHidden: !this.state.isHidden,
            place: onePlace[0]

        })
    }


    render() {

        if (this.state.data === false) {
            return null
        }else {
         const position = [this.state.lat, this.state.lng];

         const MyMarkersList = this.state.data.map ( marker =>{
             const wineryPositon = [marker.lat, marker.lng];
             return(
                 <Marker
                     position={wineryPositon}
                     icon={myIcon}>
                  <Popup>
                     <ul style={{margin:"0", padding:"0"}} className="winery" >
                        <li style={{textAlign:"center", textWeight:"bold", paddingBottom:"5px", fontWeight:"bold", color:"#104F2F"}} key={marker.id}> check this place!
                         </li>
                      </ul>
                      <Button  style={{textAlign:"center", outline:"none", textDecoration:"none", color:"white", fontSize:"20px", backgroundColor:"#722D4A", borderRadius:"10%"}} onClick={event=> this.toggleHidden(event, marker.id)}>{marker.name}</Button>
                  </Popup>
                 </Marker>
             )
         })
        return (

         <section className="sectionMain">
              <header>Wine map of Poznan</header>
              <div className="divMain">
                 <div className="row mapRow">
                   <div className="column">
                     <div style={{paddingTop:"30px"}}>
                         <div className="roundPhoto"></div>
                         <h2 className="title">DISCOVER <br/> YOUR PLACE</h2> <br/>
                         <div className="storyContent">
                         Tasting wine is like an adventure.<br/>
                         Different grapes, colors, climate, <br/>
                             fermentation methods and finally - <br/>
                             different brands and producing regions. <br/><br/>
                         You can taste almost all wines in Poznan. <br/>
                             Just check the map <br/>
                             and find the best wine spots <br/>
                             in your neighbourhood. <br/>
                         </div>
                     </div>

                       <div className="socialMedia" style={{marginLeft:"auto", marginRight:"auto"}}>
                           <a style={{textDecoration:"none"}} href="/" target="_blank"> <img src={fb} width="100" height="100" /> </a>
                           <a style={{textDecoration:"none"}} href="/" target="_blank"> <img src={insta} width="100" height="100"/> </a>
                           <a style={{textDecoration:"none"}} href="/" target="_blank"> <img src={google} width="100" height="100"/> </a>
                       </div>

                   </div>

                   <div className="mapDiv column">
                        <Map className="map" center={position} zoom={this.state.zoom}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {MyMarkersList}
                        </Map>
                   </div>
                   <div className="column">
                     <Child className="child" show={!this.state.isHidden} winery={this.state.place} updateRating={this.updateRating} updateWine={this.updateWine}/>
                   </div>
                  </div>
              </div>
        </section>
        )
      }

    }
}



export default App;
