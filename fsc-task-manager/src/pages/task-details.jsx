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
import { useForm } from 'react-hook-form';

const TaskDetailsPage = () => {
  // Pega o params da URL
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

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
      //O reset vai alterar os default values quando a requisição chegar
      //porque quando o componente é montado o estado é vazio
      //quando o useEffect receber os dados da api ai o reset atualiza os dados
      reset(data);
    };

    fetchTasks();
  }, [taskId, reset]);
  // Sempre que o taskID mudar ele vai exec o effect

  //no data vai conter os valores dos inputs
  const handleSaveClick = async data => {
    //Pega o valor do input e salva sem espaços
    const title = data.title.trim();
    const description = data.description.trim();
    const time = data.time.trim();

    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        description,
        time,
      }),
    });

    if (!response.ok) {
      return toast.error('Ocorreu um erro ao salvar a tarefa.');
    }

    //pega e atualiza com a resposta do banco
    //Atualiza o titulo e a descrição e time
    const newTask = await response.json();
    setTask(newTask);
    toast.success('Tarefa salva com sucesso');
  };

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return toast.error('Ocorreu um erro ao deletar a tarefa.');
    }
    toast.success('Tarefa deletada com sucesso');
    navigate(-1);
  };

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
          <Button
            className='h-fit self-end'
            variant='danger'
            onClick={handleDeleteClick}
          >
            <Trash2 size={16} />
            Deletar tarefa
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleSaveClick)}>
          {/* dados da tarefas */}
          <div className='round space-y-6 bg-brand-white p-6'>
            {/* Nome da tarefa */}
            <div>
              <Input
                id='title'
                label='Titulo'
                {...register('title', {
                  required: 'O título é obrigatório',
                  validate: value => {
                    if (!value.trim()) {
                      return 'O título não pode ser vazio.';
                    }
                    return true;
                  },
                })}
                errorMessage={errors?.title?.message}
              ></Input>
            </div>

            {/* Horário */}
            <div>
              <TimeSelect
                {...register('time', {
                  required: 'O horário é obrigatório',
                  validate: value => {
                    if (!value.trim()) {
                      return 'O horário não pode ser vazio.';
                    }
                    return true;
                  },
                })}
                errorMessage={errors?.time?.message}
              />
            </div>

            {/* Descrição */}
            <div>
              <Input
                id='description'
                label='Descrição'
                {...register('description', {
                  required: 'A descrição é obrigatória',
                  validate: value => {
                    if (!value.trim()) {
                      return 'A descrição não pode ser vazia.';
                    }
                    return true;
                  },
                })}
                errorMessage={errors?.description?.message}
              ></Input>
            </div>
          </div>

          {/* Botão de salvar */}
          <div className='flex w-full justify-end gap-3'>
            <Button
              size='large'
              variant='primary'
              type='submit'
              disable={isSubmitting}
            >
              {isSubmitting && (
                <LoaderCircle className='h-4 w-4 animate-spin' />
              )}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
