import { forwardRef } from 'react';
import InputLabel from './InputLabel';
import InputErrorMessage from './inputErrorMessage';
import PropTypes from 'prop-types';

const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className='flex flex-col space-y-1 text-left'>
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className='placeholder:text-gray rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-brand-primary placeholder:text-sm'
        ref={ref} // ✅ agora o ref é o verdadeiro
        {...rest}
      />
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  );
});

Input.displayName = 'Input';

Input.PropTypes = {
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default Input;

// // Componente de entrada de texto
// import { forwardRef } from 'react';
// import InputLabel from './InputLabel';
// import InputErrorMessage from './inputErrorMessage';
// import PropTypes from 'prop-types';

// export default function Input({ label, errorMessage, ref, ...rest }) {
//   return (
//     <div className='flex flex-col space-y-1 text-left'>
//       <InputLabel htmlFor={rest.id}>{label}</InputLabel>
//       <input
//         className='placeholder:text-gray rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-brand-primary placeholder:text-sm'
//         ref={ref}
//         {...rest}
//       />
//       {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
//     </div>
//   );
// }

// Input.displayName = 'Input';
// Input.PropTypes = {
//   label: PropTypes.string.isRequired,
//   errorMessage: PropTypes.string,
//   placeholder: PropTypes.string,
//   id: PropTypes.string.isRequired,
// };
