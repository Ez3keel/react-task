import { createPortal } from 'react-dom';
import Input from './Input';
import Button from './Button';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import './AddTaskDialog.css';
import InputLabel from './InputLabel';
// import AddTaskDialog from './AddTaskDialog';
import TimeSelect from './TimeSelect';

const AddTaskDialog = ({ isOpen, handleDialogClose, handleAddTask }) => {
  const nodeRef = useRef();

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
              <h2 className='bg-white text-xl font-semibold text-[#35383E]'>
                Nova tarefa
              </h2>
              <p className='mb-4 mt-1 text-sm text-[#9A9C9F]'>
                Insira as informações a baixo
              </p>

              {/* TITULO */}
              <div className='flex w-[336px] flex-col space-y-4'>
                <Input
                  id='title'
                  label='Titulo'
                  placeholder='Insira o título da tarefa'
                />

                {/* HORÁRIO */}
                <TimeSelect />

                {/* DESCRIÇÃO */}
                <Input
                  id='description'
                  label='Descrição'
                  placeholder='Descreva a tarefa'
                />
                <div className='flex gap-3'>
                  <Button
                    size='large'
                    className='w-full'
                    variant='secondary'
                    // Fecha o dialog chama o set
                    onClick={() => handleDialogClose(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size='large'
                    className='w-full'
                    onClick={() =>
                      handleAddTask({
                        id: Math.random(),
                        title: 'Teste',
                        time: 'morning',
                        description: 'Teste',
                        status: 'not_started',
                      })
                    }
                  >
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

export default AddTaskDialog;
