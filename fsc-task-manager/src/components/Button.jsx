// Componente de botão
export default function Button(props) {
  return (
    <button className='mt-2 p-6 text-blue-600' onClick={props.onClick}>
      {props.text}
    </button>
  );
}
