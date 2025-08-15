// import logo from "./logo.svg";
import "./App.css";
import Todolist from "./Todolist";
import ToggleText from "./Toggle";
import Count from "./count";
import FruitList from "./fruitlist";
import LoginMessage from "./loginmessage";
import Timer from "./clock";
import ListProduct from "./listProduct";
import CheckAge from "./checkAge";

function Hello(props) {
  return <h1>Hello {props.name}</h1>;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Hello name="Lala" />
        <Hello name="Lili" />
        <h1> Toggle Text Demo </h1>
        <ToggleText text="Transmit text content from app" />

        <h1> ToDo App</h1>
        <Todolist />
        <h1> Count App</h1>
        <Count />

        <h1> Fruit </h1>
        <FruitList />

        <h1>Login Message</h1>
        <LoginMessage isLoggedIn={false} />

        <h1> Timer</h1>

        <Timer />

        <h1> List Product </h1>
        <ListProduct />

        <h1> Check age</h1>
        <CheckAge />
      </header>
    </div>
  );
}

export default App;
