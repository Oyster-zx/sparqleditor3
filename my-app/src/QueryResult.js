import React, {Component} from 'react';

class QueryResult extends Component {

    constructor() {
        super();
        this.state = {content: ""};
        this.setText = this.setText.bind(this);
    }

    setText(text) {
        this.setState({content: text});
    }

    render() {
        return (
            <div>
                <div className="card" >
                    <div className="card-body">
                        <h4 className="card-title">Query result</h4>
                        <h6 className="card-subtitle mb-2 text-muted">{this.state.content}</h6>
                    </div>
                </div>
            </div>
        );
    }
}

export default QueryResult;