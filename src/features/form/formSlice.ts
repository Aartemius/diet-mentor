import { createSlice } from '@reduxjs/toolkit';

const initialFormData = {
  goals: '',
  personalParams: {
    height: {
      amount: undefined,
      valueType: '',
    },
    weight: {
      amount: undefined,
      valueType: '',
    },
  },
  destructiveBehavior: '',
  physicalExerciseFrequency: ''
};

const formSlice = createSlice({
  name: 'form',
  initialState: {
    currentStep: window.sessionStorage.getItem('currentStep') ? Number(JSON.parse(window.sessionStorage.getItem('currentStep')!)) : 1,
    formData: window.sessionStorage.getItem('formData') ? JSON.parse(window.sessionStorage.getItem('formData')!) : initialFormData,
  },
  reducers: {
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setNextStep: (state) => {
      state.currentStep += 1;
    },
    setPrevStep: (state) => {
      state.currentStep -= 1;
    },
    setFormData: (state, action) => {
      state.formData = action.payload
    },
    restoreInitialFormData: (state) => {
      state.formData = initialFormData;
    },
  },
});

export const { 
  setStep,
  setNextStep,
  setPrevStep,
  setFormData,
  restoreInitialFormData
} = formSlice.actions;

export default formSlice.reducer;
