import Header from "./components/Header";
import Button from "./components/Button";
import Input from "./components/Input";
import Sidebar from './components/Sidebar';
import Tasks from './components/Tasks';

// Componente principal da aplicação
function App() {
  
  return (
    <div className="flex gap-9">
      <Sidebar></Sidebar>
      <Tasks></Tasks>
     </div>
  );
}

export default App;
