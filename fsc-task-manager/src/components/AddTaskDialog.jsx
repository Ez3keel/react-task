import { createPortal } from 'react-dom';
import Input from './Input';
import Button from './Button';
import { CSSTransition } from 'react-transition-group';
import { use, useEffect, useRef, useState } from 'react';
import './AddTaskDialog.css';
import InputLabel from './InputLabel';
// import AddTaskDialog from './AddTaskDialog';
import TimeSelect from './TimeSelect';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

const AddTaskDialog = ({
  isOpen,
  handleDialogClose,
  handleAddTask,
  onSubmitSucess,
}) => {
  /*Retirado o state de title porque estamos usando UseRef
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  */
  const [time, setTime] = useState('morning');
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const handleSaveClick = async () => {
    const newErrors = [];

    console.log('DENTRO DO SAVE');
    console.log(titleRef.current.value);

    //Pega o valor do imput agora com useRef
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;

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

    setIsloading(true);
    //
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, time, description }),
    });

    // Se não receber nada ele retorna e aparece o erro
    if (!response.ok) {
      setIsloading(false);
      return toast.error(
        'Erro ao adicionar a tarefa. Por favor, tente novamente.',
      );
    }

    toast.success('Tarefa adicionada com sucesso');
    setIsloading(false);
    //

    // Adiciona os erros a lista pois o state só atualiza após finalizar a function
    setErrors(newErrors);

    //  Verifica se possui erros e retorna
    if (newErrors.length > 0) {
      return;
    }

    console.log(time.trim());
    if (!title.trim() || !description.trim() || !time.trim()) {
      return alert('Preencha todos os campos');
    }

    handleAddTask({
      id: uuidv4(),
      title,
      time,
      description,
      status: 'not_started',
    });
    handleDialogClose(false);
  };

  const nodeRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    if (!isOpen) {
      setTime('morning');
      // setTitle('');
      //setDescription('');
      console.log();
    }
    // Sempre que o IsOpen mudar ele vai executar
  }, [isOpen]);

  const titleErrors = errors.find(error => error.inputName === 'title');

  const descriptionErrors = errors.find(
    error => error.inputName === 'description',
  );

  const timeErrors = errors.find(error => error.inputName === 'time');

  return (
    // Quando isOpen for true ele exibe o Dialog
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames='add-task-dialog'
      unmountOnExit //Se for false ele tira da tela
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className='fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur'
          >
            {/* DIALOG */}
            <div className='rounded-xl bg-white p-5 text-center shadow'>
              <h2 className='bg-white text-xl font-semibold text-[brand-dark-blue]'>
                Nova tarefa
              </h2>
              <p className='mb-4 mt-1 text-sm text-[text-gray]'>
                Insira as informações a baixo
              </p>

              {/* TITULO */}
              <div className='flex w-[336px] flex-col space-y-4'>
                <Input
                  id='title'
                  label='Titulo'
                  placeholder='Insira o título da tarefa'
                  /*
                  Retiramos isso para utilizar useRef assim ele otimiza e não fica renderizando a cada digitação
                  value={title}
                  Quando ocorrer mudança no input ele vai atribudir o valor ao state Title
                  onChange={event => setTitle(event.target.value)}
                  */
                  errorMessage={titleErrors?.message}
                  ref={titleRef}
                />

                {/* HORÁRIO */}
                <TimeSelect
                  value={time}
                  onChange={event => setTime(event.target.value)}
                  errorMessage={timeErrors?.message}
                />
                {/* {timeErrors && (
                  <p className='text-left text-xs text-red-500'>
                    {timeErrors.message}
                  </p>
                )} */}

                {/* DESCRIÇÃO */}
                <Input
                  id='description'
                  label='Descrição'
                  placeholder='Descreva a tarefa'
                  // value={description}
                  // onChange={event => setDescription(event.target.value)}
                  ref={descriptionRef}
                  errorMessage={descriptionErrors?.message}
                />

                <div className='flex gap-3'>
                  <Button
                    size='large'
                    className='w-full'
                    variant='secondary'
                    // Fecha o dialog chama o set
                    onClick={() => {
                      return handleDialogClose(false);
                    }}
                  >
                    Cancelar
                  </Button>

                  <Button
                    size='large'
                    className='w-full'
                    onClick={handleSaveClick}
                    disable={isLoading}
                  >
                    {isLoading && (
                      <LoaderCircle className='h-6 w-6 animate-spin' />
                    )}
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
      </div>
    </CSSTransition>
  );
};

AddTaskDialog.PropTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  handleAddTask: PropTypes.func.isRequired,
};

export default AddTaskDialog;
