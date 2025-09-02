
const TaskSeparator = ({title, icon}) => {
    return ( 
        <div className="flex gap-2 pb-1 border-b border-sold border-[#F4F4F5]">
            {icon}
            <p className="text-[#9A9C9F] text-sm"> {title}</p>
        </div>
     );
}
 
export default TaskSeparator;
