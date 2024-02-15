import Loading from "../Components/Loading/Loading";
import { useMyContext } from "../MyContext";
import Modal from "../Components/Modal/Modal";
import { faBox,faChartPie,faListCheck } from '@fortawesome/free-solid-svg-icons'
import Buttons from "../Components/Buttons/Buttons";
import { useState } from "react";
import FormProduct from "../Components/Form/FormProduct";
import FormClass from "../Components/Form/FormClass";
import FormCommands from "../Components/Form/FormCommands";

export default function Dashboard(): JSX.Element {
    const { loading, setModal } = useMyContext();
    const [pointer,setPointer] = useState<number>(0);
    const form:JSX.Element[] = [<FormProduct/>,<FormClass/>,<FormCommands/>] 
    return (
        <div>
            <Loading show={loading} />
            <h1 className="h4">Dashboard</h1>
            <Modal>
                {form[pointer]}
            </Modal>
            <Buttons typeBtn="button" onAction={()=>{
                setPointer(0);
                setModal(true);
            }} title="Cadastrar Produtos" iconBtn={faBox} classBtn="m-2 btn btn-success"/>
            <Buttons typeBtn="button" onAction={()=>{
                setPointer(1);
                setModal(true);
            }} title="Cadastrar Produtos" iconBtn={faChartPie} classBtn="m-2 btn btn-primary"/>
            <Buttons typeBtn="button" onAction={()=>{
                setPointer(2);
                setModal(true);
            }} title="Cadastrar Produtos" iconBtn={faListCheck} classBtn="m-2 btn btn-primary"/>
        </div>
    );
}