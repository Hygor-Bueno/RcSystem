import ApiFireBase from "../../API/ApiFireBase";
import { formProduct } from "../../Configs/ConfigsComponent";
import { iProduct } from "../../Interface/iProducts";
import { useMyContext } from "../../MyContext";
import Form from "./Form";

export default function FormProduct() {
    const { classification, setLoading } = useMyContext();
    const handleSubmit = async (formData: Record<string, any>) => {
        setLoading(true);
        const api = new ApiFireBase('Produtos');
        const product: iProduct = {
            classification: formData.classification,
            description: formData.description,
            price: parseFloat(formData.price),
            observation: formData.observation || '',
            units: parseInt(formData.units) || 1
        };
        await api.post(product);
        setLoading(false);
    };

    return (
        <div className="p-2 col-10 col-sm-8 col-md-6 col-lg-3 col-xl-3 overflow-auto bg-white rounded">
            <h1 className="h5">Cadastrar Produto:</h1>
            <Form config={formProduct(classification)} onSubmit={handleSubmit} />
        </div>
    );
}