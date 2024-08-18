import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EFormStateName, IFormState } from './types';
import { IFormData } from '../../utils/interfaces';

const initialState: IFormState = {
  dataFormNoControl: [],
  dataFormHookData: [],
};

const processFormData = (state: IFormState, action: PayloadAction<IFormData>, formType: EFormStateName) => {
  state.dataFormNoControl.forEach((item) => (item.isNew = false));
  state.dataFormHookData.forEach((item) => (item.isNew = false));

  const { ...dataWithoutPassword } = action.payload;
  state[formType].push({
    ...dataWithoutPassword,
    isNew: true,
    password: undefined,
    confirmPassword: undefined,
  });
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setDataFormNoControl(state, action: PayloadAction<IFormData>) {
      processFormData(state, action, EFormStateName.NO_CONTROL_FORM);
    },
    setDataFormHookData(state, action: PayloadAction<IFormData>) {
      processFormData(state, action, EFormStateName.CONTROL_FORM);
    },
  },
});

export const { setDataFormNoControl, setDataFormHookData } = formSlice.actions;
export default formSlice.reducer;
