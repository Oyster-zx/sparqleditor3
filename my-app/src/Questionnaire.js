import React, {Component} from 'react';

class Questionnaire extends Component {

    submitForm (e) {
        e.preventDefault();
        this.props.history.push('/task/1');
    }

    render() {
        return (
            <div>
                <div>
                    <h4>Questionnaire</h4>
                </div>
                <div>
                    <form onSubmit={this.submitForm.bind(this)}>
                        <button className="btn btn-success mt-1 mb-1" type="submit">Submit</button>
                    </form>
                </div>

            </div>
        );
    }
}

export default Questionnaire;