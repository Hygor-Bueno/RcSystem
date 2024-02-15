import { iClassification, iConfigFormProduct } from '../Interface/iProducts';

export const formProduct: (list: iClassification[]) => iConfigFormProduct[] = (list) => {
    return [
        {
            element: 'input',
            type: 'text',
            label: 'Produto',
            name: 'description',
            required: true
        },
        {
            element: 'select',
            label: 'Classificação',
            options: list,
            name: 'classification',
            required: true
        },
        {
            element: 'input',
            type: 'number',
            label: 'Valor',
            name: 'price',
            required: true
        },
        {
            element: 'textarea', // 'textArea' corrigido para 'textarea'
            label: 'Observações',
            name: 'observation',
            required: false
        },
        {
            element: 'input',
            type: 'number',
            label: 'Unidade(s)',
            name: 'units',
            required: true
        },
    ];
};
export const formClass: iConfigFormProduct[] = [
    {
        element: 'input',
        type: 'text',
        label: 'Classificação',
        name: 'description',
        required: true
    }
];