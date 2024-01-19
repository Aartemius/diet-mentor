import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../PrimaryButton";
import { setFormData, setNextStep } from "../../../../features/form/formSlice";
import { model } from "./model";
import { useState } from "react";
import { RootState } from "../../../../app/store";
import styles from './StepThree.module.scss';

const StepThree = () => {
  const dispatch = useDispatch();
  const { formData, currentStep } = useSelector((state: RootState) => state.form);

  window.sessionStorage.setItem('currentStep', JSON.stringify(currentStep));

  const currentActiveOption = model.find(item => formData.destructiveBehavior === item.value);
  const [stepValue, setStepValue] = useState(currentActiveOption?.value || null);

  const currentActiveOptionIndex = model.findIndex(item => formData.destructiveBehavior === item.value) || null
  const [cardActiveIndex, setCardActiveIndex] = useState(currentActiveOptionIndex);

  const handleContinueClick = () => {
    dispatch(setFormData({
        ...formData,
        destructiveBehavior: stepValue
      }
    ))
    window.sessionStorage.setItem('formData', JSON.stringify(formData));
    dispatch(setNextStep());
  };

  return (
    <section className={ styles.behaviorsWrap }>
      <h1 className="step-title">Destructive behaviors</h1>
      <h3 className="step-subtitle">We all have them! Which are yours?</h3>

      <div className={ styles.cardsWrap }>
        { model.map((item, index) => (
            <div
              className={ `${styles.iconTextCard} ${cardActiveIndex === index ? styles.active : undefined}` }
              key={item.value}
              onClick={ () => {
                setCardActiveIndex(index);
                setStepValue(item.value);
              } }
            >
              <img src={ item.image } alt={ item.title } />
              <p>{ item.title }</p>
            </div>
          ))
        }
      </div>
      <PrimaryButton 
        onClick={ handleContinueClick }
        isDisabled={ !stepValue }
        title="Continue"
        isFullWidth
      />
    </section>
  );
};

export default StepThree;