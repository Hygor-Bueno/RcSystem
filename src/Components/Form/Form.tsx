import React, { useState } from 'react';
import { iConfigFormProduct } from '../../Interface/iProducts';
import { iInputField, iSelectField, iTextAreaField } from '../../Interface/iForm';

interface FormProps {
    config: Array<iConfigFormProduct>;
    onSubmit: (data: Record<string, any>) => void;
}

function InputField({mandatory, type, label, keyDB, onChange }: iInputField): JSX.Element {
    return (
        <div className="mb-3">
            <label htmlFor={label} className="form-label">{mandatory && <b className='text-danger'>*</b>}{label}:</label>
            <input required={mandatory} type={type} className="form-control" id={label} name={keyDB} onChange={onChange} step={0.001} />
        </div>
    );
}

function SelectField({mandatory, label, keyDB, options, onChange }: iSelectField): JSX.Element {
    return (
        <div className="mb-3">
            <label htmlFor={label} className="form-label">{mandatory && <b className='text-danger'>*</b>}{label}:</label>
            <select required={mandatory} className="form-control" id={label} name={keyDB} onChange={onChange}>
                <option hidden defaultValue=''></option>
                {options?.map((option, idx) => (
                    <option key={idx} value={option.id}>{option.description}</option>
                ))}
            </select>
        </div>
    );
}

function TextAreaField({mandatory, label, keyDB, onChange }: iTextAreaField): JSX.Element {
    return (
        <div  className="mb-3">
            <label htmlFor={label} className="form-label">{mandatory && <b className='text-danger'>*</b>}{label}:</label>
            <textarea required={mandatory} className="form-control" id={label} name={keyDB} onChange={onChange} />
        </div>
    );
}

export default function Form({ config, onSubmit }: FormProps): JSX.Element {
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
                const { type, element, label, options, name,required } = elementConfig;
                switch (element) {
                    case 'input':
                        return <InputField mandatory={required} key={index} keyDB={name} type={type || 'text'} label={label} onChange={handleChange} />;
                    case 'select':
                        return <SelectField mandatory={required} key={index} keyDB={name} label={label} options={options} onChange={handleChange} />;
                    case 'textarea':
                        return <TextAreaField mandatory={required} key={index} keyDB={name} label={label} onChange={handleChange} />;
                    default:
                        return null;
                }
            })}
            <button type="submit" className="btn btn-primary">Salvar</button>
        </form>
    );
}