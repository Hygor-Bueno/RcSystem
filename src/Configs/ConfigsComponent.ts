import { iConfigFormProduct } from '../Interface/iProducts'
export const formProduct: iConfigFormProduct[] = [
    {
        element: 'input',
        type: 'text',
        label: 'Produto',
        name:'description'
    },
    {
        element: 'select',
        label: 'Classificação',
        options: [
            { value: 'br', label: 'Brasil' },
            { value: 'us', label: 'Estados Unidos' },
            { value: 'uk', label: 'Reino Unido' },
            { value: 'fr', label: 'França' },
        ],
        name:'classification'
    },
    {
        element: 'input',
        type: 'number',
        label: 'Valor',
        name:'price'
    },
    {
        element: 'textArea',
        label: 'Observações',
        name:'observation'
    },
    {
        element: 'input',
        type: 'number',
        label: 'Unidades',
        name:'units'
    },
];