interface Option {
    value: string;
    label: string;
  }
  
  interface formField {
    id: string;
    type: 'text' | 'email' | 'select' | 'radio' | 'textarea';
    label: string;
    required: boolean;
    placeholder?: string;
    options?: Option[];
    validation?: {
      pattern?: string;
      message?: string;
    };
  }
  
  interface Schema {
    formTitle: string;
    formDescription: string;
    fields: formField[];
  }
  