import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './../components/Sidebar';
import { ChevronRight, ArrowLeft, LoaderCircle } from 'lucide-react';
import Button from './../components/Button';
import { Trash2 } from 'lucide-react';
import InputLabel from './../components/InputLabel';
import Input from '../components/Input';
import TimeSelect from './../components/TimeSelect';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const TaskDetailsPage = () => {
  // Pega o params da URL
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const navigate = useNavigate();
  const [saveIsLoading, setSaveIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const titleRef = useRef();
  const descriptionRef = useRef();
  const timeRef = useRef();

  const handleBackClick = () => {
    navigate(-1);
  };

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

  const handleSaveClick = async () => {
    setSaveIsLoading(true);

    const newErrors = [];

    //Pega o valor do imput agora com useRef
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const time = timeRef.current.value;

    // Adiciona o erro ao state
    if (!title.trim()) {
      newErrors.push({
        inputName: 'title',
        message: 'O titulo é obrigatório',
      });
    }

    if (!time.trim()) {
      newErrors.push({
        inputName: 'time',
        message: 'O horário é obrigatório',
      });
    }
    if (!description.trim()) {
      newErrors.push({
        inputName: 'description',
        message: 'A descrição é obrigatória',
      });
    }
    // Adiciona os erros a lista pois o state só atualiza após finalizar a function
    setErrors(newErrors);

    //  Verifica se possui erros e retorna
    if (newErrors.length > 0) {
      return setSaveIsLoading(false);
    }
    setErrors(newErrors);
    if (newErrors.length > 0) {
      return setSaveIsLoading(false);
    }

    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        description,
        time,
      }),
    });

    if (!response.ok) {
      return setSaveIsLoading(false);
    }

    //pega e atualiza com a resposta do banco
    //Atualiza o titulo e a descrição e time
    const newTask = await response.json();
    setTask(newTask);
    setSaveIsLoading(false);
    toast.success('Tarefa salva com sucesso');
  };

  const titleErrors = errors.find(error => error.inputName === 'title');
  const timeErrors = errors.find(error => error.inputName === 'time');
  const descriptionErrors = errors.find(
    error => error.inputName === 'description',
  );

  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full space-y-6 px-8 py-16'>
        {/* Barra do topo */}
        <div className='flex w-full justify-between'>
          {/* parte esquerda */}
          <div>
            <Button
              onClick={handleBackClick}
              className='mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary'
            >
              <ArrowLeft color='white' />
            </Button>
            <div className='flex items-center gap-1 text-xs'>
              <Link className='cursor-pointer text-brand-text-gray' to='/'>
                Minhas tarefas
              </Link>
              <ChevronRight className='text-brand-text-gray' size={16} />
              <span className='font-semibold text-brand-primary'>
                {task?.title}
              </span>
            </div>

            <h1 className='mt-1 text-xl font-semibold'>{task?.title}</h1>
          </div>
          {/* parte direita */}
          <Button className='h-fit self-end' variant='danger'>
            <Trash2 size={16} />
            Deletar tarefa
          </Button>
        </div>

        {/* dados da tarefas */}
        <div className='round space-y-6 bg-brand-white p-6'>
          {/* Nome da tarefa */}
          <div>
            <Input
              id='title'
              label='Titulo'
              defaultValue={task?.title}
              errorMessage={titleErrors?.message}
              ref={titleRef}
            ></Input>
          </div>

          {/* Horário */}
          <div>
            <TimeSelect
              defaultValue={task?.time}
              errorMessage={timeErrors?.message}
              ref={timeRef}
            />
          </div>

          {/* Descrição */}
          <div>
            <Input
              id='description'
              label='Descrição'
              defaultValue={task?.description}
              errorMessage={descriptionErrors?.message}
              ref={descriptionRef}
            ></Input>
          </div>
        </div>

        <div className='flex w-full justify-end gap-3'>
          <Button size='large' variant='primary' onClick={handleSaveClick}>
            {saveIsLoading && <LoaderCircle className='h-4 w-4 animate-spin' />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
