


import style from './Modal.module.css'
import { useEffect } from "react";
export const Modal = ({ data, onCloseModal }) => {



  useEffect(() => {
    const handleKeydown = event => {
      if (event.code === "Escape") {
        onCloseModal()
      }
      // console.log('escape')
    }
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    }
  }, [onCloseModal])





  const handlOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onCloseModal()
    }
  }


  return (
    <div className={style.overlay} onClick={handlOverlayClick}>
      <div className={style.modal}>
        <div>

          <img src={data} alt="somebody" />


        </div>
      </div>
    </div>
  );
}



































