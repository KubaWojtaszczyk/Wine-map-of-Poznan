import React, { Component } from 'react';
import { Button } from 'reactstrap';
import SpanRating from "./Span";



class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            place: false,
        }
    }
    render() {
        return this.props.winery ? (
            <section className="containerBox">
                <div className="nameDiv">
                    <h3>{this.props.winery.name}</h3> <br/>
                    <span>{this.props.winery.address}</span> <br/>
                    <span>{this.props.winery.phone}</span> <br/>
                    <br/>
                     <span >
                            {this.props.winery.openingHours.map(el => {
                                return <span>{el} <br/> </span>
                            })
                        }
                    </span> <br/>
                </div>
                <div className="rankPlaceDiv">
                    <h3>Rank this place!</h3> <br/>
                    <SpanRating callback={this.props.updateRating} id={this.props.winery.id}/>
                </div>
                <div className="wineRankDiv">
                    <h3>Wine of the week</h3>
                    <div className="bottle" style={{width: "120px", height:"120px"}}></div>
                    <div style={{fontSize:"16px"}}>{this.props.winery.wineName}</div> <br/>
                    <p style={{fontSize:"16px", fontWeight:"bold"}}>Did you like the wine?</p>
                    <SpanRating style={{paddingBottom:"20px"}} callback={this.props.updateWine} id={this.props.winery.id}/>
                </div>
            </section>
        ): null
    }
}

export default Child
