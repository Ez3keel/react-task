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
      <div className="rounded-xl bg-white p-6">

        {/* MANHÂ */}
         <div className="space-y-3">
           <div className="flex gap-2 pb-1 border-b border-sold border-[#F4F4F5]">
            <Sun/>
            <p className="text-[#9A9C9F] text-sm">Manhã</p>
          </div>
         </div>

          {/* Tarde */}
          <div className="space-y-3 my-6">
            <div className="flex gap-2 pb-1 border-b border-sold border-[#F4F4F5]">
            <Cloudy/>
            <p className="text-[#9A9C9F] text-sm">Tarde</p>
          </div>
          </div>

          {/* Noite */}
          <div className="space-y-3">
              <div className="flex gap-2 pb-1 border-b border-sold border-[#F4F4F5]">
              <Moon/>
              <p className="text-[#9A9C9F] text-sm">Noite</p>
            </div>
          </div>

      </div>
    </div>
  );
};

export default Tasks;
