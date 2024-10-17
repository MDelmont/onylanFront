import { useState } from "react";
import "./modal.scss";



/**
 * Modal component
 * @param {boolean} btnUse - if true, the button that triggers the modal will be rendered
 * @param {ReactNode} children - the content of the modal
 * @returns {ReactElement} a modal component
 */
const Modal = ({ btnUse, children }) => {

  const [modal, setModal] = useState(false);


  const toggleModal = () => {
    try {
      setModal(!modal);
    } catch (e) {
      console.log("error toggleModal in Modal");
    }
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
    <label className="btn-modal" onClick={toggleModal} htmlFor="">
    {btnUse}
    </label>
      
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            {children}
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;
