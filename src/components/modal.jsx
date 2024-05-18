import { useState } from "react";
import "../styles/modal.scss";

/**
 * Permet de géré la création de modal personnalisé dans l'application
 * @param {*} param0 { btnName, children } btnName : Nom du bouton, children : enfant
 * @returns JSX
 */
const Modal = ({ btnName, children }) => {
  const [modal, setModal] = useState(false);

  /**
   * Permet de géré l'affichage du modal
   */
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
      <button onClick={toggleModal} className={`btn-modal btn-${btnName.split(' ')[0]}`}>
        {btnName}
      </button>

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
