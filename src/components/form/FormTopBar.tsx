import { useDispatch, useSelector } from "react-redux";
import { setPrevStep } from "../../features/form/formSlice";
import { RootState } from "../../app/store";
import styles from './FormTopBar.module.scss';

const FormTopBar = () => {
  const dispatch = useDispatch();
  const { currentStep } = useSelector((state: RootState) => state.form);

  const handleBackClick = () => {
    if (currentStep > 1) {
      dispatch(setPrevStep());
    }
  };

  return (
    <div onClick={handleBackClick} className={ styles.topBarWrap }>
      { currentStep > 1 &&
        <img src="icons/backArrow.svg" alt="back" />
      }
      <img src="icons/avocado.svg" alt="avocado" />
      <span>Food Mentor</span>
    </div>
  );
}

export default FormTopBar;