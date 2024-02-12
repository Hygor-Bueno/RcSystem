import Form from "../Components/Form/Form";
import Loading from "../Components/Loading/Loading";
import { formProduct } from "../Configs/ConfigsComponent";
import { useMyContext } from "../MyContext";
import { iProduct } from "../Interface/iProducts";
import React from "react";
import ApiFireBase from "../API/ApiFireBase";

export default function Dashboard(): JSX.Element {
    const { product,classification, loading, setLoading } = useMyContext();

    const handleSubmit = async(formData: Record<string, any>) => {
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
        console.log(product);
        setLoading(false);
    };

    return (
        <React.Fragment>
            <Loading show={loading} />
            <div className="p-2 col-6 h-100 overflow-auto">
                <h1 className="h5">Cadastrar Produto:</h1>
                <Form config={formProduct(classification)} onSubmit={handleSubmit} />
            </div>
        </React.Fragment>
    );
}