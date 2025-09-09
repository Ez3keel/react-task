import InputErrorMessage from './inputErrorMessage';
import InputLabel from './InputLabel';

const TimeSelect = ({ value, onChange, errorMessage }) => {
  return (
    <div className='flex flex-col gap-1 text-left'>
      <InputLabel htmlFor={'time'}>Horário</InputLabel>

      <select
        className='rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]'
        name=''
        id='time'
        value={value}
        onChange={onChange}
        // {...props}
      >
        <option value='morning'>Manhã</option>
        <option value='afternoon'>Tarde</option>
        <option value='eveningTasks'>Noite</option>
      </select>
      {errorMessage && (<InputErrorMessage>{errorMessage}</InputErrorMessage>)}
    </div>
  );
};

export default TimeSelect;
