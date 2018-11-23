import React, { Component } from 'react';


class SpanRating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
    }

    handleRating = (event, rating) => {
        this.setState ({
            counter: Number(rating)
        }, ()=>{
            this.props.callback(this.props.id, this.state.counter)
        })

    }

    render() {
      const table = [1, 2, 3, 4, 5];

        return (
            <div>
                {
                   table.map(number => {
                    return <span style={{fontSize:"40px", paddingRight:"5px"}} onClick={(event) => {this.handleRating(event, number )}}><i
                        className={`fa ${number <= this.state.counter ? "fa-wine-glass" : "fa-wine-glass-alt"}`}/></span>
            })
                }
            </div>
        )
    }
}

export default SpanRating
