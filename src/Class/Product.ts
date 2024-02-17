import { iProduct } from "../Interface/iProducts";

export default class Product implements iProduct {
    private _classification: string;
    private _description: string;
    private _price: number;
    private _observation?: string;
    private _units?: number;

    constructor(configs: iProduct) {
        this._price = configs.price;
        this._classification = configs.classification;
        this._description = configs.description;
        this._observation = configs.observation;
        this._units = configs.units;
    }

    // Getters
    get classification(): string {
        return this._classification;
    }

    get description(): string {
        return this._description;
    }

    get price(): number {
        return this._price;
    }

    get observation(): string | undefined {
        return this._observation;
    }

    get units(): number | undefined {
        return this._units;
    }

    // Setters
    set classification(value: string) {
        this._classification = value;
    }

    set description(value: string) {
        this._description = value;
    }

    set price(value: number) {
        this._price =value;
    }

    set observation(value: string | undefined) {
        this._observation = value;
    }

    set units(value: number | undefined) {
        this._units = value;
    }

    tableConfig(){
        return {
            "Descrição:":this._description,
            "Classificação:": this._classification || 'teste',
            "Preço:": parseFloat(this._price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })),
            "Unidade(s)": this._units
        }
    }
}
