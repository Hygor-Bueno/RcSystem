import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ApiFireBase from "../../API/ApiFireBase";
import { formProduct } from "../../Configs/ConfigsComponent";
import { iProduct } from "../../Interface/iProducts";
import { useMyContext } from "../../MyContext";
import Form from "./Form";

export default function FormOrders() {
    const { command, setLoading, setModal } = useMyContext();
    console.log(command)
    const containerForm = {
        maxHeight: '90%'
    }
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
        <div style={containerForm} className="p-2 col-10 col-sm-8 col-md-6 col-lg-3 col-xl-3 overflow-auto bg-white rounded position-relative" >
            <button onClick={() => setModal(false)} className="position-absolute top-0 end-0  btn btn-danger">X</button>
            <h1 className="h5">Cadastrar Produto:</h1>
            <SelectCommands />
        </div>
    );
    function SelectCommands(): JSX.Element {
        return (
            <select onChange={(event) => console.log(event.currentTarget.value)} className="form-control my-4">
                <option hidden defaultValue={''}>Selecione um mesa</option>
                {command.map(item =>
                    <option className="text-bold" value={item.commands} key={item.id}>
                      {item.status ? 'Abrir' : 'Editar'} mesa {item.commands} 
                    </option>
                )}
            </select>
        )
    }
    
}
