import ApiFireBase from "../../API/ApiFireBase";
import { formClass } from "../../Configs/ConfigsComponent";
import { iRegisterClass } from "../../Interface/iProducts";
import { useMyContext } from "../../MyContext";
import Form from "./Form";

export default function FormClass() {
    const { loadClass, setLoading, setModal } = useMyContext();
    const containerForm = {
        maxHeight: '90%'
    }
    const handleSubmit = async (formData: Record<string, any>) => {
        setLoading(true);
        const api = new ApiFireBase('Classificação');
        const classfication: iRegisterClass = {
            description: formData.description
        };
        await api.post(classfication);
        await loadClass();
        setLoading(false);
    };

    return (
        <div style={containerForm} className="p-2 col-10 col-sm-8 col-md-6 col-lg-3 col-xl-3 overflow-auto bg-white rounded position-relative" >
            <button onClick={() => setModal(false)} className="position-absolute top-0 end-0  btn btn-danger">X</button>
            <h1 className="h5">Cadastrar categoria:</h1>
            <Form config={formClass} onSubmit={handleSubmit} descButton={'Cadastrar'} />
        </div>
    );
}
