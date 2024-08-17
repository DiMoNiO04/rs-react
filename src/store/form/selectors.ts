import { RootState } from '../store';

export const getDataFormNoControl = () => (state: RootState) => state.form.dataFormNoControl;
export const getDataFormHookData = () => (state: RootState) => state.form.dataFormHookData;
