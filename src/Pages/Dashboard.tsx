import Loading from "../Components/Loading/Loading";
import { useMyContext } from "../MyContext";
import FormProduct from "../Components/Form/FormProduct";
import Modal from "../Components/Modal/Modal";
import { faBox,faSackDollar,faListCheck } from '@fortawesome/free-solid-svg-icons'
import Buttons from "../Components/Buttons/Buttons";

export default function Dashboard(): JSX.Element {
    const { loading, setModal } = useMyContext();
    return (
        <div>
            <Loading show={loading} />
            <h1 className="h4">Dashboard</h1>
            <Modal>
                <FormProduct />
            </Modal>
            <Buttons typeBtn="button" onAction={()=>setModal(true)} title="Cadastrar Produtos" iconBtn={faBox} classBtn="m-2 btn btn-success"/>
            <Buttons typeBtn="button" onAction={()=>console.log('Cadastrar Classe de Produtos')} title="Cadastrar Produtos" iconBtn={faListCheck} classBtn="m-2 btn btn-primary"/>
            <Buttons typeBtn="button" onAction={()=>console.log('Cadastrar Mesas')} title="Cadastrar Produtos" iconBtn={faSackDollar} classBtn="m-2 btn btn-primary"/>
        </div>
    );
}