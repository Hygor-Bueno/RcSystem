import React, { useEffect } from "react";
import Form from "../Components/Form/Form";
import Loading from "../Components/Loading/Loading";
import { formProduct } from "../Configs/ConfigsComponent";
import ApiFireBase from "../API/ApiFireBase";
import { useMyContext } from "../MyContext";
import { iProduct } from "../Interface/iProducts";

export default function Dashboard(): JSX.Element {
    const { product } = useMyContext();

    const handleSubmit = (formData: Record<string, any>) => {
        const api = new ApiFireBase('Produtos');
        const product: iProduct = {
            classification:formData.classification,
            description:formData.description,
            price:parseFloat(formData.price),
            observation:formData.observation || '',
            units:parseInt(formData.units) || 1
        };
        api.post(product);    
    };

    return (
        <div className="p-2 col-6">
            <Loading show={false} />
            <Form config={formProduct(product)} onSubmit={handleSubmit} />
            <button className='btn btn-danger' title='Adicione um produto' onClick={async () => {
                console.log(product);
            }}>Cancelamento</button>
        </div>
    );
}