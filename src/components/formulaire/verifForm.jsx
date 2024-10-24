import '../../styles/formulaire//verifForm.scss'

/**
 * A component that displays a form with conditions to check
 * 
 * @param {Object} conditions - an object containing the conditions to check
 * @param {string} conditions.key - the key of the condition
 * @param {Object} conditions.message - an object containing the messages to display
 * @param {string} conditions.message.invalid - the message to display if the condition is invalid
 * @param {string} conditions.message.valid - the message to display if the condition is valid
 * @param {boolean} conditions.condition - the result of the condition
 * 
 * @returns {JSX} a JSX element
 */
const VerifForm = ({ conditions }) => {

  return (
      <div className="verif-form">
          <p>Vérification</p>
          <div className="condition-verif-cont">
          {conditions.map(({ key, message, condition }) => (
              <span className={`condition-verif ${condition ? "invalid":"valid"}` } key={key}>
                {condition ? <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path className='invalid-svg'  d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                </svg>:<svg  width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path className='valid-svg' d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>}
                  {condition ? ` ${message.invalid}` : ` ${message.valid}`} 
              </span>
          ))}
          </div>
      </div>
  );
};

export default VerifForm;
