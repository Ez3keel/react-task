
import Button from "./Button";
import { Trash2 } from 'lucide-react';

const Tasks = () => {

    return ( 
     <div className="px-8 py-16">
           <div className="flex w-full justify-between">
                <div>
                    <span className="text-xs font-semibold text-[#00ADB5]">Minhas Tarefas</span>
                     <h2 className="font-semibold text-xl ">Minhas Tarefas</h2>
                </div>
            </div>

            <div>
                
                <Button text="Adicionar Tarefa" >
                     <Trash2/>
                     Limpar tarefa</Button>
                <Button>Nova tarefa</Button>
            </div>
     </div>
     );
}
 
export default Tasks;
