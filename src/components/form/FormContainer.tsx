import { RootState } from '../../app/store';
import { useSelector } from "react-redux";
import FormTopBar from './FormTopBar';
import StepOne from './steps/step-one/StepOne';
import StepTwo from './steps/step-two/StepTwo';
import StepThree from './steps/step-three/StepThree';
import StepFour from './steps/step-four/StepFour';
import styles from './FormContainer.module.scss';
import SuccessStep from './steps/success-step/SuccessStep';

const FormContainer = () => {
  const { currentStep } = useSelector((state: RootState) => state.form);

  return (
    <>
      <FormTopBar />
      <div className={ styles.formContainer }>
        { currentStep === 1 && <StepOne /> }
        { currentStep === 2 && <StepTwo /> }
        { currentStep === 3 && <StepThree /> }
        { currentStep === 4 && <StepFour /> }
        { currentStep === 5 && <SuccessStep /> }
      </div>
    </>
  );
}

export default FormContainer;