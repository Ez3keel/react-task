import { Check, LoaderCircle, ExternalLink } from 'lucide-react';

const TaskItem = ({ task, handleTaskCheckBoxClick }) => {
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
      className={`transition flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 ${getStatusClasses()}`}
    >
      <div className='flex items-center gap-2'>
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type='checkbox'
            checked={task.status === 'done'}
            className='absolute h-full w-full cursor-pointer opacity-0'
            onChange={() => (
              handleTaskCheckBoxClick(task.id)
            )}
          />
          {task.status === 'done' && <Check color='white' size={16} />}
          {task.status === 'in_progress' && (
            <LoaderCircle
              className='text-brand-white animate-spin'
              color='white'
              size={16}
            />
          )}
        </label>
        {task.title}
      </div>

      <a href='#' className='transition hover:opacity-75'>
        <ExternalLink size={16} />
      </a>
    </div>
  );
};

export default TaskItem;
