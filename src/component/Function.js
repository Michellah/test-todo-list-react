import { useState } from 'react';

function Function() {
    const [count, setCount] = useState(0);
    const handleClick = () => {
        setCount(count + 1);
    }

    return (
        <div>
            <h1>Compteur avec un fonction</h1>
            <p> {count} </p>

            <button onClick={handleClick}>+</button>
        </div>
    );
}

export default Function;
