<<<<<<< HEAD
const TaskSeparator = ({title, icon}) => {
    return ( 
        <div className="flex gap-2 pb-1 border-b border-sold border-[#F4F4F5]">
            {icon}
            <p className="text-[#9A9C9F] text-sm"> {title}</p>
        </div>
     );
}
 
export default TaskSeparator;
=======


const TasksSeparator = ({ title, icon }) => {
  return (
    <div className="flex gap-2 border-b border-solid border-brand-border pb-1">
      {icon}
      <p className="text-sm text-brand-text-gray">{title}</p>
    </div>
  )
}

export default TasksSeparator
>>>>>>> 204bbf9aeabf38ea77c5bdc951996f535a887484
