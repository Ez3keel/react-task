import { Toaster } from 'sonner';
import Sidebar from './components/Sidebar';
import Tasks from './components/Tasks';

// Componente principal da aplicação
function App() {
  return (
    <div className='flex'>
      <Toaster
        toastOptions={{
          style: {
            color: '#35383E',
          },
        }}
      />
      <Sidebar></Sidebar>
      <Tasks></Tasks>
    </div>
  );
}

export default App;
