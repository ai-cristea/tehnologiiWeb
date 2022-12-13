import React, {useState, useEffect} from 'react'

function App() {
const [count, setCount] = useState(0)

<<<<<<< HEAD
useEffect(() => {
  document.title = `You clicked ${count} times`;
})

    return (
        <div className="container">
            <p> You clicked {count} times.</p>
            <button onClick={() => setCount(count + 1)}> Click me! </button>
        </div>
    );
=======
useEffect( () => {
  document.title = `You clicked ${count} times`;
})

  return (
    <div className='container'>
      <p> You clicked {count} times </p>
      <button onClick={() => setCount(count + 1)}> Click me!</button>
    </div>
  );
>>>>>>> 3cbf3edb649de9730a6528a2022f3ee0914dad38
}

export default App;
