import React from "react";

class Compteur extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            count: 0
        };

    }

    render() {
        return (
            <div className="App">
                <h1>Compteur avec un composant de classe</h1>
                <p> {this.state.count} </p>

                <button onClick={() => this.setState({ count: this.state.count + 1 })}>+</button>
            </div>
        );
    }
}

export default Compteur;