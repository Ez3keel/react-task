import { Trash2, Check, LoaderCircle, ExternalLink } from 'lucide-react';
import Button from './Button';
import PropTypes from 'prop-types';

const TaskItem = ({ task, handleCheckBoxClick, handleDeleteClick }) => {
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
        <Button variant='ghost' onClick={() => handleDeleteClick(task.id)}>
          <Trash2 size={16} />
        </Button>

        <a href='#' className='transition hover:opacity-75'>
          <ExternalLink size={16} color='#9A9C9F' />
        </a>
      </div>
    </div>
  );
};

export default TaskItem;

TaskItem.PropTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(['morning', 'afternoon', 'evening']).isRequired,
    status: PropTypes.oneOf([
      'not_started',
      'in_progress',
      'done',
    ]).isRequired(),
  }).isRequired(),
  handleCheckBoxClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};
