import { CSSProperties, FC } from "react";
import styles from './PrimaryButton.module.scss';

interface PrimaryButtonProps {
  title: string;
  isDisabled: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  isFullWidth?: boolean;
  style?: CSSProperties;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ 
  isDisabled, 
  onClick, 
  type,
  title,
  isFullWidth,
  style
}) => {

  return (
    <button
      disabled={ isDisabled }
      onClick={ onClick }
      type={ type }
      className={ `${styles.primaryButton} ${ isFullWidth ? styles.fullWidth : undefined }` }
      style={ style }
    >
      { title }
    </button>
  );
}

export default PrimaryButton;