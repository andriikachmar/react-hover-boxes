import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const url = 'http://demo1030918.mockable.io/';

    const [state, setState] = useState({
        data: [],
        squares: [],
        select: '',
    });

    const handleHover = (event) => {
        if (event.target.className === 'block-hovered') {
            event.target.className = 'block';
        } else {
            event.target.className = 'block-hovered';
        }
    };

    const handleChange = (event) => {
        setState({ ...state, select: event.target.value });
    };

    const fillArray = (item) => {
        return Array(item * item).fill(null);
    };

    const handleClick = () => {
        const [easy, normal, hard] = [
            state.data.easyMode.field,
            state.data.normalMode.field,
            state.data.hardMode.field,
        ];

        switch (state.select) {
            case 'easy':
                setState({
                    ...state,
                    squares: fillArray(easy),
                });
                break;
            case 'normal':
                setState({
                    ...state,
                    squares: fillArray(normal),
                });
                break;
            case 'hard':
                setState({
                    ...state,
                    squares: fillArray(hard),
                });
                break;

            default:
                break;
        }
    };

    const getData = async () => {
        const response = await axios.get(url);

        setState({
            ...state,
            data: response.data,
        });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='App'>
            <div style={{ textAlign: 'center' }}>
                <select onChange={handleChange}>
                    <option hidden>Pick mode</option>
                    <option value='easy'>Easy mode</option>
                    <option value='normal'>Normal mode</option>
                    <option value='hard'>Hard mode</option>
                </select>
                <button type='submit' onClick={handleClick}>
                    Start
                </button>
            </div>
            {state.squares.length ? (
                <div className='play-area'>
                    {state.squares.map((item, index) => (
                        <div
                            key={index}
                            className='block'
                            onMouseOver={handleHover}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export default App;
