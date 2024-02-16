import Loading from "../Components/Loading/Loading";
import { useMyContext } from "../MyContext";
import Modal from "../Components/Modal/Modal";
import { faBox, faChartPie, faListCheck } from '@fortawesome/free-solid-svg-icons'
import Buttons from "../Components/Buttons/Buttons";
import { useState } from "react";
import FormProduct from "../Components/Form/FormProduct";
import FormClass from "../Components/Form/FormClass";
import FormCommands from "../Components/Form/FormCommands";
import TableComponent from "../Components/Table/TableComponent";
import Product from "../Class/Product";

export default function Dashboard(): JSX.Element {
    const { loading, setModal, product, classification, command } = useMyContext();
    const [pointer, setPointer] = useState<number>(0);
    const [pointerTable, setPointerTable] = useState<number>(0);
    const form: JSX.Element[] = [<FormProduct />, <FormClass />, <FormCommands />];
    const table: any[] = [product, classification, command];

    return (
        <div className="d-flex flex-column col-12 align-items-center">
            <Loading show={loading} />
            <Modal>
                {form[pointer]}
            </Modal>
            <div className="w-100">
                <Buttons typeBtn="button" onAction={() => {
                    setPointer(0);
                    setModal(true);
                }} title="Cadastrar Produtos" iconBtn={faBox} classBtn="m-2 btn btn-success" />
                <Buttons typeBtn="button" onAction={() => {
                    setPointer(1);
                    setModal(true);
                }} title="Cadastrar Produtos" iconBtn={faChartPie} classBtn="m-2 btn btn-primary" />
                <Buttons typeBtn="button" onAction={() => {
                    setPointer(2);
                    setModal(true);
                }} title="Cadastrar Produtos" iconBtn={faListCheck} classBtn="m-2 btn btn-primary" />
            </div>
            <div className="w-100">
                <select className="form-control w-25" defaultValue='' onChange={(e) => setPointerTable(parseInt(e.target.value))}>
                    <option value={0}>Produto</option>
                    <option value={1}>Classificação</option>
                    <option value={2}>Mesas</option>
                </select>
            </div>
            <div style={{ height: '0%' }} className="overflow-auto h-0 col-12 border flex-grow-1">
                <TableComponent data={table[pointerTable]}/>
            </div>
        </div>
    );

    function returnObjectForTable(pointer:number){
        let response:any;
        switch (pointer) {
            case 0:
                

                break;
        
            default:
                break;
        }
        return response;
    }
}