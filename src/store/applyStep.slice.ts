import { ApplyValues } from '@/models/apply';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stepInfo: {} as Partial<ApplyValues>,
};

export const applyStepSlice = createSlice({
  name: 'applyStep',
  initialState,
  reducers: {
    setStep1: (state, action) => {
      state.stepInfo = {
        ...state.stepInfo,
        step: action.payload.step,
        terms: action.payload.terms,
      };
    },
    setStep2: (state, action) => {
      state.stepInfo = {
        ...state.stepInfo,
        step: action.payload.step,
        ...action.payload.infovalue,
      };
    },
    setStep3: (state, action) => {
      state.stepInfo = {
        ...state.stepInfo,
        step: action.payload.step,
        ...action.payload.cardInfo,
      };
    },
    clearStep: (state) => {
      state.stepInfo = {};
    },
  },
});

export const { setStep1, setStep2, setStep3, clearStep } = applyStepSlice.actions;
export default applyStepSlice.reducer;
