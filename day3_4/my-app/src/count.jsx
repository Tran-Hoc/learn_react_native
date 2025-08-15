import { useState } from "react";

function Count() {
    const [count, setCount] = useState(0); // State to hold the count value

    return (<div> <p> Value: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increase</button>
        <button onClick={() => setCount(count - 1)}>Decrease</button>
        <button onClick={() => setCount(0)}>Reset</button>
    </div>)


}

export default Count;