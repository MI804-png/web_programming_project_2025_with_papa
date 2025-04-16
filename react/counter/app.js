const CounterApp = () => {
    const [count, setCount] = React.useState(0);

    return (
        <div className="counter-app">
            <h1>Counter App</h1>
            <p>Current Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<CounterApp />);