import { createPortal } from 'react-dom';
import Input from './Input';
import Button from './Button';
import { CSSTransition } from 'react-transition-group';
import { use, useEffect, useRef, useState } from 'react';
import './AddTaskDialog.css';
import InputLabel from './InputLabel';
// import AddTaskDialog from './AddTaskDialog';
import TimeSelect from './TimeSelect';
import { v4 as uuidv4, v4, validate } from 'uuid';
import PropTypes from 'prop-types';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

const AddTaskDialog = ({
  isOpen,
  handleDialogClose,
  handleAddTask,
  onSubmitSucess,
}) => {
  const nodeRef = useRef();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      time: 'morning',
      description: '',
    },
  });

  const handleSaveClick = async data => {
    try {
      const newTask = {
        id: v4(),
        title: data.title.trim(),
        time: data.time.trim(),
        description: data.description.trim(),
        status: 'not_started',
      };

      // Chama a função do componente pai para adicionar a tarefa
      await handleAddTask(newTask);

      //toast.success('Tarefa adicionada com sucesso');
      handleDialogClose(false);
      reset({
        title: '',
        time: 'morning',
        description: '',
      });
    } catch (error) {
      toast.error('Erro ao adicionar a tarefa');
    }
  };

  const handleCancelClick = () => {
    reset({
      title: '',
      time: 'morning',
      description: '',
    });
    handleDialogClose(false);
  };

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
              <form
                onSubmit={handleSubmit(handleSaveClick)}
                className='flex w-[336px] flex-col space-y-4'
              >
                <Input
                  id='title'
                  label='Titulo'
                  placeholder='Insira o título da tarefa'
                  errorMessage={errors?.title?.message}
                  disable={isSubmitting}
                  {...register('title', {
                    required: 'O título é obrigatório.',
                    validate: value => {
                      if (!value.trim()) {
                        return 'O título não pode ser vazio.';
                      }
                      return true;
                    },
                  })}
                />

                {/* HORÁRIO */}
                <TimeSelect
                  errorMessage={errors?.time?.message}
                  disable={isSubmitting}
                  {...register('time', { required: true })}
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
                  errorMessage={errors?.description?.message}
                  disable={isSubmitting}
                  {...register('description', {
                    required: 'A descrição é obrigatória!',
                    validate: value => {
                      if (!value.trim()) {
                        return 'A descrição não pode ser vazia.';
                      }
                      return true;
                    },
                  })}
                />

                <div className='flex gap-3'>
                  <Button
                    size='large'
                    className='w-full'
                    variant='secondary'
                    // Fecha o dialog chama o set
                    onClick={handleCancelClick}
                    type='button'
                  >
                    Cancelar
                  </Button>

                  <Button
                    size='large'
                    className='w-full'
                    type='submit'
                    disable={isSubmitting}
                  >
                    {isSubmitting && (
                      <LoaderCircle className='h-6 w-6 animate-spin' />
                    )}
                    Salvar
                  </Button>
                </div>
              </form>
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
