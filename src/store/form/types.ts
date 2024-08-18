import { IFormData } from '../../utils/interfaces';

interface IFormState {
  dataFormNoControl: IFormData[];
  dataFormHookData: IFormData[];
}

export enum EFormStateName {
  NO_CONTROL_FORM = 'dataFormNoControl',
  CONTROL_FORM = 'dataFormHookData',
}

export type { IFormState };
