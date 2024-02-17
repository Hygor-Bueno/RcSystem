import Loading from "../Components/Loading/Loading";
import { useMyContext } from "../MyContext";
import Modal from "../Components/Modal/Modal";
import { faBox, faChartPie, faListCheck,faCartShopping } from '@fortawesome/free-solid-svg-icons'
import Buttons from "../Components/Buttons/Buttons";
import { useState } from "react";
import FormProduct from "../Components/Form/FormProduct";
import FormClass from "../Components/Form/FormClass";
import FormCommands from "../Components/Form/FormCommands";
import TableComponent from "../Components/Table/TableComponent";
import { iClassification, iCommands, iProduct } from "../Interface/iProducts";
import Util from "../Util";
import FormOrders from "../Components/Form/FormOrders";

export default function Dashboard(): JSX.Element {
    const { loading, setModal, product, classification, command } = useMyContext();
    const [pointer, setPointer] = useState<number>(0);
    const [pointerTable, setPointerTable] = useState<number>(0);
    const form: JSX.Element[] = [<FormProduct />, <FormClass />, <FormCommands />, <FormOrders/>];
    const table: any[] = [maskProduct(product), maskClassification(classification), maskCommands(command)];

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
                <Buttons typeBtn="button" onAction={() => {
                    setPointer(3);
                    setModal(true);
                }} title="Cadastrar Produtos" iconBtn={faCartShopping} classBtn="m-2 btn btn-primary" />
            </div>
            <div className="w-100">
                <select className="form-control w-25" defaultValue='' onChange={(e) => setPointerTable(parseInt(e.target.value))}>
                    <option value={0}>Produto</option>
                    <option value={1}>Classificação</option>
                    <option value={2}>Mesas</option>
                </select>
            </div>
            <div style={{ height: '0%' }} className="overflow-auto h-0 col-12 border flex-grow-1">
                <TableComponent data={table[pointerTable]} />
            </div>
        </div>
    );
    function maskProduct(products: iProduct[]): any[] {
        let result: any[] = [];
        const util = new Util();
        products.forEach((item: iProduct) => {
            result.push({
                "Descrição:": item.description,
                "Preço:": util.maskMoney(item.price),
                "Unidade(s):": item.units,
                "Classificação:": item.classification,
            });
        });
        return result;
    }
    function maskClassification(classif: iClassification[]): any[] {
        let result: any[] = [];
        classif.forEach((item: iClassification) => {
            result.push({
                "ID:": item.id,
                "Descrição:": item.description                
            });
        });
        return result;
    }
    function maskCommands(commands: iCommands[]): any[] {
        let result: any[] = [];
        commands.forEach((item: iCommands) => {
            result.push({
                "Nº Mesa:": item.commands,
                "Status:": item.status ? 'Livre' : 'Ocupada'                
            });
        });
        return result;
    }
}