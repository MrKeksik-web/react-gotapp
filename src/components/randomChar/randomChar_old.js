import React, {Component} from 'react';
import './randomChar.css';
import '../../services/gotService';
import GotService from '../../services/gotService';
import Spinner from '../spinner'
import ErrorMessage from '../errorMessage'

export default class RandomChar extends Component {

    gotService = new GotService();

    state = {
        char: {},
        loading: true,
        error: false,
    }

    componentDidMount() {
        this.getRandomchar();
        this.timerId = setInterval(this.getRandomchar, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    oncharLoaded = (char) => {
        this.setState({char, loading: false});
    }

    getRandomchar = () => {
        const id = Math.floor(25 + Math.random()*100);
        this.gotService.getCharacter(id)
              .then(char => this.oncharLoaded(char))
              .catch(this.onError);
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        });
    }

    render() {
        const {char, loading, error} = this.state;  

        const content = (loading || error) ? null : <ViewContent char={char} />
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;

        return (
            <div className="random-block rounded">
                {content}
                {spinner}
                {errorMessage}
            </div>
        );
    }
}

const ViewContent = ({char}) => {
    const {name, gender, born, died, culture} = char;


    return (
        <>
        <h4>Random Character: {name}</h4>
        <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Gender </span>
                <span>{gender}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Born </span>
                <span>{born}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Died </span>
                <span>{died}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Culture </span>
                <span>{culture}</span>
            </li>
        </ul>
        </>
    )
}