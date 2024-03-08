import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iCommands } from "../../Interface/iProducts";
import { useMyContext } from "../../MyContext";
import { useState } from "react";
import Order from "../Order/Order";

export default function FormOrders() {
    const { command, setModal } = useMyContext();
    const [order, setOrder] = useState<boolean>(false);
    const [editCommand, setEditCommand] = useState<iCommands>({
        id: '',
        commands: 0,
        status: false
    });

    const containerForm = {
        maxHeight: '90%'
    }
    return (
        <div style={containerForm} className="p-2 col-10 col-sm-8 col-md-6 col-lg-3 col-xl-3 overflow-auto bg-white rounded position-relative d-flex flex-column align-items-center" >
            <div className="w-100">
                <button onClick={() => { setModal(false) }} className="position-absolute top-0 end-0  btn btn-danger">X</button>
                <h1 className="h5">Registrar Pedidos:</h1>
            </div>
            {order ? <Order {...editCommand} /> : <SelectCommands />}
        </div>
    );
    function SelectCommands(): JSX.Element {
        return (
            <div className="form-control col-12 row w-100 overflow-auto">
                {command.map(item =>
                    <button onClick={() => { setOrder(!order); setEditCommand(item); }} className="flex-column col-6 btn align-items-center justify-content-center" key={`button_Order_${item.id}`}>
                        <FontAwesomeIcon className={`${item.status ? 'text-success' : 'text-danger'} mx-3`} icon={item.status ? 'check' : 'pencil'} />
                        <p className="m-0">Mesa {String(item.commands).padStart(2, '0')}</p>
                    </button>
                )}
            </div>
        )
    }
}