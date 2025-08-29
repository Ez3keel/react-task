// Componente de botão
export default function Button({text}) {
  return (
    <button className='bg-[#00ACB5] rounded-md px-3 py-1
    text-xs text-white' >
      {text}
    </button>
  );
}
