import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import classNames from 'classnames';
import JSONInput from 'react-json-editor-ajrm'; 

type Option = {
  value: string;
  label: string;
};

export interface Schema {
  formTitle: string;
  formDescription: string;
  fields: Array<{
    id: string;
    type: 'text' | 'email' | 'select' | 'radio' | 'textarea';
    label: string;
    required: boolean;
    placeholder?: string;
    options?: Option[];
    validation?: {
      pattern: string;
      message: string;
    };
  }>;
}

interface locale {
  format: string;
  symbols: {
    colon: string;
    comma: string;
    semicolon: string;
    slash: string;
    backslash: string;
    brackets: {
      round: string;
      square: string;
      curly: string;
      angle: string;
    };
    period: string;
    quotes: {
      single: string;
      double: string;
      grave: string;
    };
    space: string;
    ampersand: string;
    asterisk: string;
    at: string;
    equals: string;
    hash: string;
    percent: string;
    plus: string;
    minus: string;
    dash: string;
    hyphen: string;
    tilde: string;
    underscore: string;
    bar: string;
  };
  types: {
    key: string;
    value: string;
    number: string;
    string: string;
    primitive: string;
    boolean: string;
    character: string;
    integer: string;
    array: string;
    float: string;
  };
  invalidToken: {
    tokenSequence: {
      prohibited: string;
      permitted: string;
    };
    termSequence: {
      prohibited: string;
      permitted: string;
    };
    double: string;
    useInstead: string;
    unexpected: string;
  };
  brace: {
    curly: {
      missingOpen: string;
      missingClose: string;
      cannotWrap: string;
    };
    square: {
      missingOpen: string;
      missingClose: string;
      cannotWrap: string;
    };
  };
  string: {
    missingOpen: string;
    missingClose: string;
    mustBeWrappedByQuotes: string;
    nonAlphanumeric: string;
    unexpectedKey: string;
  };
  key: {
    numberAndLetterMissingQuotes: string;
    spaceMissingQuotes: string;
    unexpectedString: string;
  };
  noTrailingOrLeadingComma: string;
}

const localeData: locale = {
  format: "json",
  symbols: {
    colon: ":",
    comma: ",",
    semicolon: ";",
    slash: "/",
    backslash: "\\",
    brackets: {
      round: "()",
      square: "[]",
      curly: "{}",
      angle: "<>"
    },
    period: ".",
    quotes: {
      single: "'",
      double: '"',
      grave: "`"
    },
    space: " ",
    ampersand: "&",
    asterisk: "*",
    at: "@",
    equals: "=",
    hash: "#",
    percent: "%",
    plus: "+",
    minus: "-",
    dash: "-",
    hyphen: "-",
    tilde: "~",
    underscore: "_",
    bar: "|"
  },
  types: {
    key: "key",
    value: "value",
    number: "number",
    string: "string",
    primitive: "primitive",
    boolean: "boolean",
    character: "character",
    integer: "integer",
    array: "array",
    float: "float"
  },
  invalidToken: {
    tokenSequence: {
      prohibited: "Prohibited token sequence",
      permitted: "Permitted token sequence"
    },
    termSequence: {
      prohibited: "Prohibited term sequence",
      permitted: "Permitted term sequence"
    },
    double: "Double is not allowed",
    useInstead: "Use instead",
    unexpected: "Unexpected token"
  },
  brace: {
    curly: {
      missingOpen: "Missing opening curly brace",
      missingClose: "Missing closing curly brace",
      cannotWrap: "Cannot wrap with curly braces"
    },
    square: {
      missingOpen: "Missing opening square bracket",
      missingClose: "Missing closing square bracket",
      cannotWrap: "Cannot wrap with square brackets"
    }
  },
  string: {
    missingOpen: "Missing opening quote",
    missingClose: "Missing closing quote",
    mustBeWrappedByQuotes: "String must be wrapped in quotes",
    nonAlphanumeric: "Non-alphanumeric character in string",
    unexpectedKey: "Unexpected key"
  },
  key: {
    numberAndLetterMissingQuotes: "Key with numbers and letters must be quoted",
    spaceMissingQuotes: "Key with spaces must be quoted",
    unexpectedString: "Unexpected string in key"
  },
  noTrailingOrLeadingComma: "No trailing or leading commas allowed"
};

const initialSchema: Schema = {
  formTitle: 'Project Requirements Survey',
  formDescription: 'Please fill out this survey about your project needs',
  fields: [
    {
      id: 'name',
      type: 'text',
      label: 'Full Name',
      required: true,
      placeholder: 'Enter your full name',
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      placeholder: 'you@example.com',
      validation: {
        pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
        message: 'Please enter a valid email address',
      },
    },
    {
      id: 'companySize',
      type: 'select',
      label: 'Company Size',
      required: true,
      options: [
        { value: '1-50', label: '1-50 employees' },
        { value: '51-200', label: '51-200 employees' },
        { value: '201-1000', label: '201-1000 employees' },
        { value: '1000+', label: '1000+ employees' },
      ],
    },
    {
      id: 'industry',
      type: 'radio',
      label: 'Industry',
      required: true,
      options: [
        { value: 'tech', label: 'Technology' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'finance', label: 'Finance' },
        { value: 'retail', label: 'Retail' },
        { value: 'other', label: 'Other' },
      ],
    },
    {
      id: 'comments',
      type: 'textarea',
      label: 'Additional Comments',
      required: false,
      placeholder: 'Any other details you’d like to share...',
    },
  ],
};

const DynamicFormGenerator = () => {
  const [schema, setSchema] = useState(initialSchema);
  const [json, setJson] = useState(JSON.stringify(initialSchema, null, 2));
  const [jsonError, setJsonError] = useState("");
  const { handleSubmit, control, formState: { errors } } = useForm();

  const handleJsonChange = (newJson: string) => {
    try {
      const parsedSchema = JSON.parse(newJson);
      setSchema(parsedSchema);
      setJson(newJson);
      setJsonError("");
    } catch (error) {
      setJsonError("Invalid JSON format.");
    }
  };

  const onSubmit = (data: any) => {
    alert(`Form submitted: ${JSON.stringify(data, null, 2)}`);
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case "text":
      case "email":
        return (
          <Controller
            key={field.id}
            name={field.id}
            control={control}
            defaultValue=""
            rules={{
              required: field.required ? "This field is required" : false,
              pattern: field.validation?.pattern && {
                value: new RegExp(field.validation.pattern),
                message: field.validation.message,
              },
            }}
            render={({ field: controllerField }) => (
              <div className="mb-4">
                <label htmlFor={field.id} className="font-medium">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  {...controllerField}
                  type={field.type}
                  placeholder={field.placeholder}
                  className={classNames("border p-2 rounded w-full", {
                    "border-red-500": errors[field.id],
                  })}
                />
                {errors[field.id] && (
                  <span className="text-red-500 text-sm">
                    {errors[field.id]?.message as string}
                  </span>
                )}
              </div>
            )}
          />
        );
      case "select":
        return (
          <Controller
            key={field.id}
            name={field.id}
            control={control}
            defaultValue=""
            rules={{ required: field.required ? "This field is required" : false }}
            render={({ field: controllerField }) => (
              <div className="mb-4">
                <label htmlFor={field.id} className="font-medium">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                <select
                  {...controllerField}
                  className={classNames("border p-2 rounded w-full", {
                    "border-red-500": errors[field.id],
                  })}
                >
                  <option value="">Select an option</option>
                  {field.options.map((option: any) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors[field.id] && (
                  <span className="text-red-500 text-sm">
                    {errors[field.id]?.message as string}
                  </span>
                )}
              </div>
            )}
          />
        );
      case "radio":
        return (
          <div key={field.id} className="mb-4">
            <label className="font-medium">{field.label}</label>
            <div className="flex space-x-4">
              {field.options.map((option: any) => (
                <label key={option.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={option.value}
                    {...control.register(field.id, {
                      required: field.required ? "This field is required" : false,
                    })}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
            {errors[field.id] && (
              <span className="text-red-500 text-sm">
                {errors[field.id]?.message as string}
              </span>
            )}
          </div>
        );
      case "textarea":
        return (
          <Controller
            key={field.id}
            name={field.id}
            control={control}
            defaultValue=""
            rules={{ required: field.required ? "This field is required" : false }}
            render={({ field: controllerField }) => (
              <div className="mb-4">
                <label htmlFor={field.id} className="font-medium">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                <textarea
                  {...controllerField}
                  placeholder={field.placeholder}
                  className={classNames("border p-2 rounded w-full", {
                    "border-red-500": errors[field.id],
                  })}
                />
                {errors[field.id] && (
                  <span className="text-red-500 text-sm">
                    {errors[field.id]?.message as string}
                  </span>
                )}
              </div>
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex space-x-4">
      {/* Left: JSON Editor */}
      <div className="flex-1 p-4 border rounded-md bg-white">
        <h2 className="text-xl mb-4">JSON Schema Editor</h2>
        <JSONInput
          locale={localeData}
         placeholder={JSON.parse(json)} 
          onChange={(e: { json: string }) => handleJsonChange(e.json)}
          theme="monokai"
        />
        {jsonError && <div className="text-red-500 mt-2">{jsonError}</div>}
      </div>

      {/* Right: Form Preview */}
      <div className="flex-1 p-4 border rounded-md bg-white">
        <h2 className="text-xl mb-4">{schema.formTitle}</h2>
        <p className="mb-4">{schema.formDescription}</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {schema.fields.map(renderField)}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DynamicFormGenerator;
