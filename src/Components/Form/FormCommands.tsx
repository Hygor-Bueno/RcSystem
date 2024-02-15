import ApiFireBase from "../../API/ApiFireBase";
import {  formCommands } from "../../Configs/ConfigsComponent";
import { iCommands,  } from "../../Interface/iProducts";
import { useMyContext } from "../../MyContext";
import Form from "./Form";

export default function FormCommands() {
    const {  setLoading, setModal } = useMyContext();
    const containerForm = {
        maxHeight: '90%'
    }
    const handleSubmit = async (formData: Record<string, any>) => {
        setLoading(true);
        const api = new ApiFireBase('Mesas');
        const commands: iCommands = {
            commands: parseInt(formData.commands),
            status: true
        };
        await api.post(commands);
        setLoading(false);
    };

    return (
        <div style={containerForm} className="p-2 col-10 col-sm-8 col-md-6 col-lg-3 col-xl-3 overflow-auto bg-white rounded position-relative" >
            <button onClick={() => setModal(false)} className="position-absolute top-0 end-0  btn btn-danger">X</button>
            <h1 className="h5">Cadastrar Produto:</h1>
            <Form config={formCommands} onSubmit={handleSubmit} descButton={'Cadastrar'} />
        </div>
    );
}
