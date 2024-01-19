import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../PrimaryButton";
import { restoreInitialFormData, setPrevStep, setStep } from "../../../../features/form/formSlice";
import styles from './SuccessStep.module.scss';
import { RootState } from "../../../../app/store";

const SuccessStep = () => {
  const dispatch = useDispatch();
  const handleHomeClick = () => {
    dispatch(restoreInitialFormData());
    dispatch(setStep(1));
  };
  const handleBackClick = () => dispatch(setPrevStep());
  const { currentStep } = useSelector((state: RootState) => state.form);
  window.sessionStorage.setItem('currentStep', JSON.stringify(currentStep));
  
  return (
  <section className={ styles.successWrap }>
    <h1>You have successfully completed the form!</h1>
    <PrimaryButton
      title="Edit form"
      onClick={ handleBackClick }
      isDisabled={ false }
      style={{ marginBottom: '1rem' }}
    />
    <PrimaryButton
      title="Home"
      onClick={ handleHomeClick }
      isDisabled={ false }
    />
  </section>
)};

export default SuccessStep;