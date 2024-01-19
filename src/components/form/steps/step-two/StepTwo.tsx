import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../PrimaryButton";
import { setFormData, setNextStep } from "../../../../features/form/formSlice";
import { RootState } from "../../../../app/store";
import styles from './StepTwo.module.scss';

const StepTwo = () => {
  const dispatch = useDispatch();
  const { formData, currentStep } = useSelector((state: RootState) => state.form);
  const [measurementSystem, setMeasurementSystem] = useState<'metric' | 'imperic'>('imperic');

  window.sessionStorage.setItem('currentStep', JSON.stringify(currentStep));

  const heightValueRef = useRef<HTMLInputElement | null>(null);
  const weightValueRef = useRef<HTMLInputElement | null>(null);

  const [isHeightInputEmpty, setIsHeightInputEmpty] = useState(formData.personalParams.height.amount);
  const [isWeightInputEmpty, setIsWeightInputEmpty] = useState(formData.personalParams.weight.amount);
  console.log(isHeightInputEmpty, isWeightInputEmpty)


  const handleHeightInputChange = () => {
    if (heightValueRef.current?.value) {
      setIsHeightInputEmpty(true);
    } else {
      setIsHeightInputEmpty(false);
    }
  }

  const handleWeightInputChange = () => {
    if (weightValueRef.current?.value) {
      setIsWeightInputEmpty(true);
    } else {
      setIsWeightInputEmpty(false);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const heightValue = heightValueRef.current?.value;
    const weightValue = weightValueRef.current?.value;
    
    dispatch(
      setFormData({
        ...formData,
        personalParams: {
          height: {
            amount: heightValue,
            valueType: measurementSystem === 'imperic' ? 'ft' : 'cm',
          },
          weight: {
            amount: weightValue,
            valueType: measurementSystem === 'imperic' ? 'lb' : 'kg',
          },
        },
      })
    );
    window.sessionStorage.setItem('formData', JSON.stringify(formData));
    dispatch(setNextStep());
  };

  return (
    <section className={ styles.stepTwoWrap }>
      <h1 className="step-title">Measure Yourself</h1>
      <h3 className="step-subtitle">What are your height and body weight?</h3>

      <div className={ styles.systemSwitcher }>
        <span
          className={measurementSystem === 'imperic' ? styles.active : undefined}
          onClick={() => {
            setMeasurementSystem('imperic');
          }}
        >
          Imperial
        </span>
        <span
          className={measurementSystem === 'metric' ? styles.active : undefined}
          onClick={() => {
            setMeasurementSystem('metric');
          }}
        >
          Metric
        </span>
      </div>

      <form onSubmit={handleSubmit} className={ styles.form }>
        <div className={ styles.inputWrap }>
          <input
            type="number"
            min="1"
            ref={ heightValueRef }
            defaultValue={ formData.personalParams.height.amount ?? undefined }
            placeholder={`Height (${ measurementSystem === 'imperic' ? 'ft' : 'cm' })`}
            required
            onChange={ handleHeightInputChange }
          />
          { isHeightInputEmpty && <span>{measurementSystem === 'imperic' ? 'ft' : 'cm'}</span> }
        </div>
        <div className={ styles.inputWrap }>
          <input
            type="number"
            min="1"
            ref={ weightValueRef }
            defaultValue={ formData.personalParams.weight.amount ?? undefined }
            placeholder={`Current weight (${measurementSystem === 'imperic' ? 'lb' : 'kg'})`}
            required
            onChange={ handleWeightInputChange }
          />
          { isWeightInputEmpty && <span>{measurementSystem === 'imperic' ? 'lb' : 'kg'}</span> }
        </div>
        <PrimaryButton
          isDisabled={ !isHeightInputEmpty || !isWeightInputEmpty }
          type="submit" 
          title="Continue" 
          isFullWidth
          style={{ marginTop: '5rem' }}
        />
      </form>
    </section>
  );
};

export default StepTwo;
