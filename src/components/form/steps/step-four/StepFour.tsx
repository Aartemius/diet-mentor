import { useDispatch, useSelector } from "react-redux";
import { setFormData, setNextStep } from "../../../../features/form/formSlice";
import { model } from "./model";
import { RootState } from "../../../../app/store";
import styles from './StepFour.module.scss';
import { useState } from "react";
import PrimaryButton from "../../PrimaryButton";

const StepFour = () => {
  const dispatch = useDispatch();
  const { formData, currentStep } = useSelector((state: RootState) => state.form);
  window.sessionStorage.setItem('currentStep', JSON.stringify(currentStep));

  const currentActiveOption = model.find(item => formData.physicalExerciseFrequency === item.value);
  const [stepValue, setStepValue] = useState(currentActiveOption?.value || null);

  const currentActiveOptionIndex = model.findIndex(item => formData.physicalExerciseFrequency === item.value) || null;
  const [cardActiveIndex, setCardActiveIndex] = useState(currentActiveOptionIndex !== -1 ? currentActiveOptionIndex : null);

  const handleSubmit = () => {
    dispatch(setFormData({
        ...formData,
        physicalExerciseFrequency: stepValue
      }
    ));
    window.sessionStorage.setItem('formData', JSON.stringify(formData));
    dispatch(setNextStep());
  }

  return (
    <section>
      <div className={ styles.finalStepWrap }>
        <div className={ styles.imageWrap }>
          <img src="images/pinkLady.png" alt="Physical exercise" />
        </div>
        <div className={ styles.cardsWrap }>
          { model.map((item, index) => (
              <div 
                className={ cardActiveIndex === index ? styles.active : undefined }
                key={item.value}
                onClick={ () => {
                  setCardActiveIndex(index);
                  setStepValue(item.value);
                } }
              >
                <p>{ item.title }</p>
              </div>
            ))
          }
        </div>
      </div>
      <PrimaryButton 
        onClick={ handleSubmit }
        isDisabled={ !stepValue }
        title="Submit form"
        isFullWidth
      />
    </section>
  );
};

export default StepFour;