import React, { useState } from 'react';
import { iConfigFormProduct } from '../../Interface/iProducts';
import { iInputField, iSelectField, iTextAreaField } from '../../Interface/iForm';

interface FormProps {
    config: Array<iConfigFormProduct>;
    onSubmit: (data: Record<string, any>) => void;
}

function InputField({ type, label, keyDB, onChange }: iInputField): JSX.Element {
    return (
        <div className="mb-3">
            <label htmlFor={label} className="form-label">{label}</label>
            <input type={type} className="form-control" id={label} name={keyDB} onChange={onChange} step={0.001} />
        </div>
    );
}

function SelectField({ label, keyDB, options, onChange }: iSelectField): JSX.Element {
    return (
        <div className="mb-3">
            <label htmlFor={label} className="form-label">{label}</label>
            <select className="form-control" id={label} name={keyDB} onChange={onChange}>
                {options?.map((option, idx) => (
                    <option key={idx} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}

function TextAreaField({ label, keyDB, onChange }: iTextAreaField): JSX.Element {
    return (
        <div className="mb-3">
            <label htmlFor={label} className="form-label">{label}</label>
            <textarea className="form-control" id={label} name={keyDB} onChange={onChange} />
        </div>
    );
}

function Form({ config, onSubmit }: FormProps): JSX.Element {
    const [formData, setFormData] = useState<Record<string, any>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {config.map((elementConfig, index) => {
                const { type, element, label, options, name } = elementConfig;
                switch (element) {
                    case 'input':
                        return <InputField key={index} keyDB={name} type={type || 'text'} label={label} onChange={handleChange} />;
                    case 'select':
                        return <SelectField key={index} keyDB={name} label={label} options={options} onChange={handleChange} />;
                    case 'textArea':
                        return <TextAreaField key={index} keyDB={name} label={label} onChange={handleChange} />;
                    default:
                        return null;
                }
            })}
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default Form;
