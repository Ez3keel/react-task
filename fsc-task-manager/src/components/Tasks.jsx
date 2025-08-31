import Button from "./Button";
import { Trash2, Plus } from "lucide-react";

const Tasks = () => {
  return (
    <div className="px-8 py-16 w-full">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">Minhas Tarefas</span>
          <h2 className="font-semibold text-xl">Minhas Tarefas</h2>
        </div>
      

      <div className="flex items-center gap-4">
        <Button
          variant="ghost">
          Limpar tarefa
          <Trash2 size={16}/>
        </Button>

        <Button
        variant="primary">>
          Nova tarefa
          <Plus size={16}/>
        </Button>


        {/* <Button 
          text="Nova tarefa" 
          RightIcon={Plus} 
        /> */}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
