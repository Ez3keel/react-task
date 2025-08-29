import { useState } from "react";
import { useEffect } from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import Input from "./components/Input";
import Sidebar from './components/Sidebar';

// Componente principal da aplicação
function App() {
  const [inputValue, setInput] = useState("");
  const [messages, setMessages] = useState([
    "Hello, World!",
    "Welcome to React!",
  ]);

  useEffect(() => {
    // Código a ser executado quando o componente for montado
    console.log("Componente montado");
    return () => {
      // Código a ser executado quando o componente for desmontado
      console.log("Componente desmontado");
    };
  }, []); // O array vazio garante que o efeito rode apenas uma vez, na montagem e desmontagem

  function handleButtonClick() {
    setMessages([...messages, inputValue]);
  }

  return (
    <div>
      <Sidebar></Sidebar>

      <Header>Add Tasks</Header>
      <div className="container">
        <Button text="Add Task" onClick={handleButtonClick} />
        <Input
          // Passando props para o componente Input
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <Header>
        <h1> My Tasks</h1>
      </Header>
      <div className="text-3xl font-bold underline">
        <ul>
          // Renderizando a lista de mensagens
          {messages.map((msg) => {
            return <li>{msg}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
