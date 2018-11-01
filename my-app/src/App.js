import React, {Component} from 'react';
import './App.css';
import Yasqe from './Yasqe'
import Hint from './Hint'
import QueryResult from "./QueryResult";
import Modal from 'react-modal';

class App extends Component {

    constructor(props) {
        super(props);
        this.yasqe = React.createRef();
        this.queryResult = React.createRef();

    }

    onRunClick = async () => {
        const response = await fetch('http://localhost:8080/runDummy', {
            method: 'POST', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }, body: JSON.stringify({query: this.yasqe.current.getText()})
        });
        const body = await response.json();
        this.queryResult.current.setText(body.query);
    };


    render() {
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <Yasqe ref={this.yasqe}/>
                        <div className="text-right">
                            <button className="btn btn-secondary mr-1 mt-1 mb-1" onClick={this.openModal}>Suggest
                            </button>
                            <button className="btn btn-primary mt-1 mb-1" onClick={this.onRunClick}>Run</button>
                        </div>
                        <QueryResult ref={this.queryResult}/>
                    </div>
                    <div className="col">
                        <Hint/>
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
