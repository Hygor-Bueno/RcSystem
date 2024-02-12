import { iClassification, iConfigFormProduct } from '../Interface/iProducts';

export const formProduct: (list: iClassification[]) => iConfigFormProduct[] = (list) => {
    return [
        {
            element: 'input',
            type: 'text',
            label: 'Produto',
            name: 'description'
        },
        {
            element: 'select',
            label: 'Classificação',
            options: list,
            name: 'classification'
        },
        {
            element: 'input',
            type: 'number',
            label: 'Valor',
            name: 'price'
        },
        {
            element: 'textarea', // 'textArea' corrigido para 'textarea'
            label: 'Observações',
            name: 'observation'
        },
        {
            element: 'input',
            type: 'number',
            label: 'Unidades',
            name: 'units'
        },
    ];
};
