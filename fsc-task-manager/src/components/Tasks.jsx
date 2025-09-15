import { useEffect, useState } from 'react';
import Button from './Button';
import TasksSeparator from './TaskSeparator';
import { Trash2, Plus, Moon, Sun, Cloudy, LoaderCircle } from 'lucide-react';
import TaskItem from './TaskItem';
import { toast } from 'sonner';
import AddTaskDialog from './AddTaskDialog';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  // Padrão false para não exibir o Dialog
  const [AddTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      // Pegando dados da API
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
      });

      // Converte os dados para json
      const tasks = await response.json();

      // Atualizar dados no state "tasks"
      setTasks(tasks);
    };

    fetchTasks();
  }, []);

  //  POST - Criar nova tarefa (CREATE)
  const handleAddTask = async newTask => {
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      // Se não receber nada ele retorna e aparece o erro
      if (!response.ok) {
        return toast.error(
          'Erro ao adicionar a tarefa. Por favor, tente novamente.',
        );
      }

      const createdTask = await response.json();
      setTasks([...tasks, createdTask]);
      toast.success('Tarefa adicionada com sucesso');
      setAddTaskDialogIsOpen(false); //Fecha o Dialog
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteTaskSucess = async taskId => {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
    toast.success('Tarefa deletada');
  };

  // //DELETE - Excluir tarefa
  // const handleDeleteClick = async taskId => {
  //   setDeleteTaskIsLoading(true);

  //   try {
  //     // Pega o Id para deletar a tarefa
  //     const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
  //       method: 'DELETE',
  //     });

  //     // Se não receber nada ele retorna e aparece o erro
  //     if (!response.ok) {
  //       return toast.error(
  //         'Erro ao deletar a tarefa. Por favor, tente novamente.',
  //       );
  //     }

  //     // Remove a tarefa da lista
  //     setTasks(tasks.filter(task => task.id !== taskId));
  //     toast.success('Tarefa removida com sucesso!');
  //     setDeleteTaskIsLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // Mockup - DELETE
  // const handleDeleteClick = taskId => {
  //   const newTasks = tasks.filter(task => task.id !== taskId);
  //   setTasks(newTasks);
  //   toast.success('Tarefa removida com sucesso!');
  // };

  // criado com mockups - POST
  // const handleAddTask = task => {
  //   setTasks([...tasks, task]);
  //   console.log(tasks);
  //   toast.success('Tarefa adicionada com sucesso');
  // };

  // const handleDialogClose = () => {
  //   SetAddTaskDialogIsOpen(false);
  // };

  const handleCheckBoxClick = taskId => {
    let newTasks = tasks.map(task => {
      if (task.id !== taskId) {
        return task;
      }

      if (task.status === 'not_started') {
        toast.success('Tarefa iniciada com sucesso');
        return { ...task, status: 'in_progress' };
      }

      if (task.status === 'in_progress') {
        toast.success('Tarefa concluida com sucesso');
        return { ...task, status: 'done' };
      }

      if (task.status === 'done') {
        toast.success('Tarefa reiniciada com sucesso');
        return { ...task, status: 'not_started' };
      }

      return task;
    });
    setTasks(newTasks);
  };

  //Filtra somente as tarefas da manhã
  const morningTasks = tasks.filter(task => task.time === 'morning');
  const afternoonTasks = tasks.filter(task => task.time === 'afternoon');
  const eveningTasks = tasks.filter(task => task.time === 'evening');

  return (
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

          <Button
            variant='primary'
            onClick={() => {
              // Abre o Dialog
              return setAddTaskDialogIsOpen(true);
            }}
          >
            Nova tarefa
            <Plus size={16} />
          </Button>

          <AddTaskDialog
            // Quando true abre o Dialog
            isOpen={AddTaskDialogIsOpen}
            handleDialogClose={() => SetAddTaskDialogIsOpen(false)}
            handleAddTask={handleAddTask}
          />
        </div>
      </div>

      <div className='rounded-xl bg-white p-6'>
        <div className='my-6 space-y-3'>
          <TasksSeparator title='Manhã' icon={<Sun size={16} />} />

          {/* TAREFAS DE MANHÃ */}
          {morningTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxClick={handleCheckBoxClick}
              onDeleteSucess={onDeleteTaskSucess}
            />
          ))}
        </div>

        <div className='my-6 space-y-3'>
          <TasksSeparator title='Tarde' icon={<Cloudy size={16} />} />

          {/* TAREFAS DA TARDE */}
          {afternoonTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxClick={handleCheckBoxClick}
              onDeleteSucess={onDeleteTaskSucess}
            />
          ))}
        </div>

        <div className='space-y-3'>
          <TasksSeparator title='Noite' icon={<Moon size={16} />} />

          {/* TAREFAS DA NOITE */}
          {eveningTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxClick={handleCheckBoxClick}
              onDeleteSucess={onDeleteTaskSucess}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
