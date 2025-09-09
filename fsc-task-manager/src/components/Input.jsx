// Componente de entrada de texto
import { forwardRef } from 'react';
import InputLabel from './InputLabel';
import InputErrorMessage from './inputErrorMessage';

export default function Input({ label, errorMessage, ref, ...rest }) {
  return (
    <div className='flex flex-col space-y-1 text-left'>
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className='rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]'
        ref={ref}
        {...rest}
      />
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  );
}

// const InputRef = forwardRef(({ label, errorMessage, ...rest}, ref ) => {
//   return (
//     <div className='flex flex-col space-y-1 text-left'>
//       <InputLabel htmlFor={rest.id}>{label}</InputLabel>
//       <input
//         className='rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]'
//         ref={ref}
//         {...rest}
//       />
//       {errorMessage && (
//         <p className='text-left text-xs text-red-500'>{errorMessage}</p>
//       )}
//     </div>
//   );
// });
