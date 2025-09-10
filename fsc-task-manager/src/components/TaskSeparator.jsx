import PropTypes from 'prop-types'; //

const TaskSeparator = ({ title, icon }) => {
  return (
    <div className='border-sold flex gap-2 border-b border-brand-border pb-1'>
      {icon}
      <p className='text-sm text-[#9A9C9F]'> {title}</p>
    </div>
  );
};

TaskSeparator.PropTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default TaskSeparator;
