import TaskSeparator from "./TaskSeparator";
import Button from "./Button";
import { Trash2, Plus, Sun, Moon, Cloudy } from "lucide-react";


const Tasks = () => {
  return (
    <div className="px-8 py-16 w-full">
      <span className="text-xs font-semibold text-[#00ADB5]">
        Minhas Tarefas
      </span>
      <div className="flex w-full justify-between">
        <div>
          <h2 className="font-semibold text-xl">Minhas Tarefas</h2>
        </div>
      
      <div className="flex items-center gap-4">
        <Button
          variant="ghost">
          Limpar tarefa
          <Trash2 size={16}/>
        </Button>

        <Button
        variant="primary">
          Nova tarefa
          <Plus size={16}/>
        </Button>
        </div>
      </div>


      {/* Lista de tarefas */}
      <div className="rounded-xl bg-white p-6 my-6">
        {/* Manhã */}
         <div className="space-y-3">
           <TaskSeparator 
            title="Manhã" icon={<Sun/>}>
          </TaskSeparator>
         </div>

          {/* Tarde */}
          <div className="space-y-3 my-6">
            <TaskSeparator 
              title="Tarde" icon={<Cloudy/>}>
            </TaskSeparator>
          </div>

          {/* Noite */}
          <div className="space-y-3">
            <TaskSeparator 
              title="Noite" icon={<Moon/>}>
            </TaskSeparator>
          </div>

      </div>
    </div>
  );
};

export default Tasks;
