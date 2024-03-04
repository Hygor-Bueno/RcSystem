import { iClassification } from "./Interface/iProducts";

export default class Util{
    clearFormFields() {
        // Seleciona todos os campos de entrada, seleção e área de texto em um único querySelectorAll
        const fields = document.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea');
    
        // Itera sobre cada campo e limpa o valor
        fields.forEach(field => {
            console.log(field);
            field.value = '';
        });
    }
    
    maskMoney(valor: number): string {
        const valorFormatado = valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    
        return valorFormatado;
    }
    getClassDesc(id:string,classification:iClassification[]):string{
        let result:iClassification;
        result = classification.filter((item:iClassification)=> item.id == id)[0];
        return result?.description || '';
    }
    
}    