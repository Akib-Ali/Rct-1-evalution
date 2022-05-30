import { useState } from "react";
import styles from "./Button.module.css";

export   function Button({ title, onClick, disabled, id }) {
 
  return (
    <button id={id} onClick={onClick}  disabled={disabled} data-testid="button-component" className={styles.button}>
      {title}
    </button>
  
  );
}

export default Button;
