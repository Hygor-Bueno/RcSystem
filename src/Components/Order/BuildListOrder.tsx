import { useEffect, useState } from "react";
import { iCommands } from "../../Interface/iProducts";
import { iListOrder, iOrders } from "../../Interface/iOrders";
import ApiFireBase from "../../API/ApiFireBase";
import Buttons from "../Buttons/Buttons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

interface Props {
    item: iCommands
}
export default function BuildListOrder(props: Props): JSX.Element {
    const [list, setList] = useState<iListOrder[]>([
        {
            description: "",
            quantity: 0,
            value: 0,
            id: ""
        }
    ])
    useEffect(() => {
        (async () => {
            const reqOrder = new ApiFireBase('Pedidos');
            let resOrder: iOrders = await reqOrder.getOrder(props.item.commands);
            resOrder && setList(resOrder.list);
        })();
    }, []);
    const containerList ={
        overflow:'auto',
        maxHeight:'50vh'
    }
    return (
        <div className="d-flex flex-column overflow-hidden">
            <div className="col-12 row h-25">
                <label className="col-5"><b>Descrição:</b></label>
                <label className="col-2"><b>Qtd:</b></label>
                <label className="col-2"><b>R$:</b></label>
                <label className="col-3"><b>Editar:</b></label>
            </div>
            <div style={containerList} >
                {list.map((item) =>
                    <div key={`item_${item.id}`} className="col-12 py-2">
                        <label className="col-5 text-capitalize">{item.description}</label>
                        <label className="col-2">{item.quantity}</label>
                        <label className="col-2">{item.value.toFixed(2)}</label>
                        <Buttons title="Editar item." onAction={() => console.log("Você está tentando editar um item")} typeBtn="button" classBtn="btn btn-primary col-3 p-0" iconBtn={faPencil} />
                    </div>
                )}
            </div>
            <div className="h-50">
                <b>Total:</b> {calcTotal().toFixed(2)}
            </div>
        </div>
    );
    function calcTotal(): number {
        let result: number = 0;
        list.forEach(item => result += item.value);
        return result;
    }
}