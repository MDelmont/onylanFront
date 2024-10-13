import React, { useState } from 'react';


/**
 * A dropdown component that allows users to select an option from a list.
 * @param {string} name - The name of the dropdown.
 * @param {object[]} options - An array of options to be displayed in the dropdown.
 * @param {function} onSelect - A callback function that is called when an option is selected.
 */
const Dropdown = ({ name, options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  /**
   * A boolean indicating whether the dropdown is open or not.
   */
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Handles the selection of an option and calls the onSelect callback function.
   * @param {object} option - The selected option.
   */
  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? selectedOption.label : name}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li key={option.value} onClick={() => handleSelect(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
