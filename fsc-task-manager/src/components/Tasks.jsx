<<<<<<< HEAD
import TaskSeparator from "./TaskSeparator";
import Button from "./Button";
import { Trash2, Plus, Sun, Moon, Cloudy } from "lucide-react";

=======
import { useState } from 'react';
import Button from './Button';
import TasksSeparator from './TaskSeparator';
import { Trash2, Plus, Moon, Sun, Cloudy } from 'lucide-react';
import TASKS from './constantes/tasks';
import TaskItem from './TaskItem';
>>>>>>> 204bbf9aeabf38ea77c5bdc951996f535a887484

const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS);

  //Filtra somente as tarefas da manhã
  const morningTasks = tasks.filter(task => task.time === 'morning');
  const afternoonTasks = tasks.filter(task => task.time === 'afternoon');
  const eveningTasks = tasks.filter(task => task.time === 'evening');

  return (
<<<<<<< HEAD
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
=======
    <div className='w-full space-y-6 px-8 py-16'>
      <div className='flex w-full justify-between rounded-xl bg-white p-6'>
        <div>
          <span className='text-xs font-semibold text-[#00ADB5]'>
            Minhas Tarefas
          </span>
          <h2 className='text-xl font-semibold'>Minhas Tarefas</h2>
        </div>

        <div className='flex items-center gap-4'>
          <Button variant='ghost'>
            Limpar tarefa
            <Trash2 size={16} />
          </Button>

          <Button variant='primary'>
            Nova tarefa
            <Plus size={16} />
          </Button>
        </div>
      </div>

      <div className='rounded-xl bg-white p-6'>
        <div className='my-6 space-y-3'>
          <TasksSeparator title='Manhã' icon={<Sun size={16} />} />

          {/* TAREFAS DE MANHÃ */}
          {morningTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
          
        </div>

        <div className='my-6 space-y-3'>
          <TasksSeparator title='Tarde' icon={<Cloudy size={16} />} />

          {/* TAREFAS DA TARDE */}
          {afternoonTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>

        <div div className='space-y-3'>
          <TasksSeparator title='Noite' icon={<Moon size={16} />} />

          {/* TAREFAS DA NOITE */}
          {eveningTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
>>>>>>> 204bbf9aeabf38ea77c5bdc951996f535a887484
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
