import { Trash2, Check, LoaderCircle, ExternalLink } from 'lucide-react';
import Button from './Button';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'sonner';

const TaskItem = ({ task, handleCheckBoxClick, onDeleteSucess }) => {
  const [deleteTaskIsLoading, setDeleteTaskIsLoading] = useState(false);

  //DELETE - Excluir tarefa
  const handleDeleteClick = async () => {
    setDeleteTaskIsLoading(true);

    // Pega o Id para deletar a tarefa
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE',
    });

    // Se não receber nada ele retorna e aparece o erro
    if (!response.ok) {
      setDeleteTaskIsLoading(false);
      return toast.error(
        'Erro ao deletar a tarefa. Por favor, tente novamente.',
      );
    }
    onDeleteSucess(task.id);
    setDeleteTaskIsLoading(false);
  };

  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-[#00ADB5]  text-[#00ACB5]';
    }

    if (task.status === 'in_progress') {
      return 'bg-[#FFAA04]  text-[#FFAA04]';
    }

    if (task.status === 'not_started') {
      return 'bg-[#35383E]  text-[#35383E]';
    }
  };

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 transition ${getStatusClasses()}`}
    >
      <div className='flex items-center gap-2'>
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type='checkbox'
            checked={task.status === 'done'}
            className='absolute h-full w-full cursor-pointer opacity-0'
            onChange={() => handleCheckBoxClick(task.id)}
          />
          {task.status === 'done' && <Check color='white' size={16} />}
          {task.status === 'in_progress' && (
            <LoaderCircle
              className='animate-spin text-brand-white'
              color='white'
              size={16}
            />
          )}
        </label>
        {task.title}
      </div>

      <div className='flex items-center gap-2'>
        <Button
          variant='ghost'
          onClick={handleDeleteClick}
          disable={deleteTaskIsLoading}
        >
          {deleteTaskIsLoading ? (
            <LoaderCircle
              className='animate-spin text-brand-text-gray'
              size={16}
            />
          ) : (
            <Trash2 size={16} />
          )}
        </Button>

        <a href='#' className='transition hover:opacity-75'>
          <ExternalLink size={16} color='#9A9C9F' />
        </a>
      </div>
    </div>
  );
};

TaskItem.PropTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(['morning', 'afternoon', 'evening']).isRequired,
    status: PropTypes.oneOf(['not_started', 'in_progress', 'done']).isRequired,
  }).isRequired,
  handleCheckBoxClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default TaskItem;
