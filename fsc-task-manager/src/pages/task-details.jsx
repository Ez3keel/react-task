import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TaskDetailsPage = () => {
  // Pega o params da URL
  const { taskId } = useParams();
  const [task, setTask] = useState();

  useEffect(() => {
    const fetchTasks = async () => {
      // Pegando dados da API
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      });

      // Converte os dados para json
      const data = await response.json();
      setTask(data);
    };

    fetchTasks();
  }, [taskId]);
  // Sempre que o taskID mudar ele vai exec o effect

  return (
    <div>
      <p>{task?.description}</p>
    </div>
  );
};

export default TaskDetailsPage;
