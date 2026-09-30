import type { ReactNode } from 'react';
import type {
  Control,
  FieldValues,
  UseFormWatch,
  UseFormSetValue,
  UseFormGetValues,
  UseFormTrigger,
} from 'react-hook-form';

export type FormMode = 'add' | 'edit' | 'view';

export interface FormSection<T extends FieldValues = FieldValues> {
  title: string;
  fields: (props: {
    control: Control<T>;
    readOnly: boolean;
    watch: UseFormWatch<T>;
    setValue: UseFormSetValue<T>;
    getValues: UseFormGetValues<T>;
    trigger: UseFormTrigger<T>;
  }) => ReactNode;
}

export interface FormBuilderProps<T extends FieldValues = FieldValues> {
  formFields: FormSection<T>[];
  headerLable?: string;
  mode?: FormMode;

  createAPIKey?: string;
  getAPIKey?: string;
  updateAPIKey?: string;

  createAPI?: (payload: T) => Promise<any>;
  getAPICall?: (id: string) => Promise<T>;
  updateAPI?: (payload: T & { id?: string }) => Promise<any>;

  onSubmit?: (data: T) => void;

  isSaveButton?: boolean;
  isCancelButton?: boolean;
  defaultValues?: Partial<T>;
}
