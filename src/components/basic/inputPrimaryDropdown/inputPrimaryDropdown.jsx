
import "./inputPrimaryDropdown.scss"
const InputPrimaryDropdown = ({onChange,id,messageError,value,name,options}) => {
  console.log(options)
  return <div className={`cont-input-primary ${messageError? "invalid":""} `}>

      <select name={name} id={id} onChange={onChange} className={`input-primary-dropdown`} value={value} >
          {options && options.map(name => {
                return <option key={name} value={name}>{name}</option>
            })}
          </select>
   
        
        {messageError && <p className="input-primary-error">{messageError}</p>}
    </div>
};
export default InputPrimaryDropdown;
