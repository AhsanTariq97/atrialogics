interface ButtonProps {
  type: any;
  text: String;
}

const Button: React.FC<ButtonProps> = ({ type, text }) => {
  return (
    <button type={type} className={`px-12 py-3 bg-[#7187A2] font-bold text-lg tracking-wide rounded-full text-white outline-none hover:bg-[#75C3B9]`}>{text}</button>
    // <button onClick={onClick} type={type} className={`px-12 py-3 bg-[#7187A2] font-bold text-lg rounded-full text-white outline-none hover:bg-[#75C3B9]`}>{text}<span className={`${pl}`}>{icon && <h1>ASDw</h1> }</span></button>
  )
}

export default Button