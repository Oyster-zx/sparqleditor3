import React, {Component} from 'react';
import './App.css';
import Yasqe from './Yasqe'
import Hint from './Hint'
import QueryResult from "./QueryResult";

class App extends Component {

    constructor(props) {
        super(props);
        console.log(JSON.stringify(props));
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

    submitForm = async (e) => {
        const taskNum = Number(this.props.match.params.number);
        e.preventDefault();
        this.props.history.push('/task/' + (taskNum + 1));
        await fetch('http://localhost:8080/task/' + taskNum, {
            method: 'POST', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }, body: JSON.stringify({query: this.yasqe.current.getText()})
        });
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <Yasqe ref={this.yasqe} taskNum={this.props.match.params.number}/>
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
                <form onSubmit={this.submitForm.bind(this)}>
                    <button className="btn btn-success mt-1 mb-1" type="submit">Submit</button>
                </form>
            </div>
        );
    }

}

export default App;
