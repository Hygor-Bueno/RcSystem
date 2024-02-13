import Form from "../Components/Form/Form";
import Loading from "../Components/Loading/Loading";
import { formProduct } from "../Configs/ConfigsComponent";
import { useMyContext } from "../MyContext";
import { iProduct } from "../Interface/iProducts";
import React from "react";
import ApiFireBase from "../API/ApiFireBase";
import FormProduct from "../Components/Form/FormProduct";
import Modal from "../Components/Modal/Modal";

export default function Dashboard(): JSX.Element {
    const { loading } = useMyContext();
    return (
        <React.Fragment>
            <Loading show={loading} />
            <h1 className="h4">Dashboard</h1>
            <Modal>
                <FormProduct />
            </Modal>
        </React.Fragment>
    );
}