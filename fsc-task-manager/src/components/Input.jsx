// Componente de entrada de texto
export default function Input(props) {
  return (
    <input
      className="input"
      type="text"
      placeholder="Type here"
      value={props.value}
      onChange={props.onChange}
    />
  );
}
