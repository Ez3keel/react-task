
const TaskSeparator = ({title, icon}) => {
    return ( 
        <div className="flex gap-2 pb-1 border-b border-sold border-brand-border">
            {icon}
            <p className="text-[#9A9C9F] text-sm"> {title}</p>
        </div>
     );
}
 
export default TaskSeparator;
