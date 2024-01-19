import { useDispatch, useSelector } from "react-redux";
import { setFormData, setNextStep } from "../../../../features/form/formSlice";
import { model } from "./model";
import { RootState } from "../../../../app/store";
import styles from './StepOne.module.scss';

const StepOne = () => {
  const dispatch = useDispatch();
  const { formData, currentStep } = useSelector((state: RootState) => state.form);

  window.sessionStorage.setItem('currentStep', JSON.stringify(currentStep));
  
  const handleContinueClick = (value: string) => {
    dispatch(setFormData({
        ...formData,
        goals: value
      }
    ))
    window.sessionStorage.setItem('formData', JSON.stringify(formData));
    dispatch(setNextStep());
  };

  return (
    <section className={ styles.stepOneWrap }>
      <h1 className="step-title">The Goal</h1>
      <h3 className="step-subtitle">
        Focus on the health benefits you need.<br /> 
        Balanced nutrition will let you achieve them 
      </h3>
      <p className="semibold-step-subtitle">What are your goals?</p>
      <div className={ styles.cardsWrap }>
        { model.map(item => (
            <div 
              key={item.value}
              onClick={ () => handleContinueClick(item.value) }
              className={ styles.textImageCard }
            >
              <span>{ item.title }</span>
              <img src={ item.image } alt={ item.title } />
            </div>
          ))
        }
      </div>
    </section>
  );
};

export default StepOne;