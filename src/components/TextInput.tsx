interface Props {
  labelText: string;
  name: string;
  handleChange: Function;
  value: string;
  role: string;
}

const TextInput = ({ labelText, name, handleChange, value, role }: Props) => {
  return (
    <div className="firstName flex flex-col sm:w-[15rem] sm:mt-0 mt-2 w-full">
      <label htmlFor={labelText}>{labelText}</label>
      <input
        className="border-[1px] border-neutral-300 rounded p-1 h-11" type="text" id={labelText}
        name={name}
        onChange={(e) => handleChange(e)}
        role={role}
        required={labelText === "First Name"}
        value={value}
      />
    </div>
  )
}

export default TextInput;