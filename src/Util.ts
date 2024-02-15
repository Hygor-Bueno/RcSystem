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
    
}    