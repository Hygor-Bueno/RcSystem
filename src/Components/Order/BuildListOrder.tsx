import { iListOrder, iOrders } from "../../Interface/iOrders";

interface Props {
    commandList: iListOrder[]
}
export default function BuildListOrder(props: Props): JSX.Element {

    const containerList ={
        overflow:'auto',
        maxHeight:'50vh'
    }
    return (
        <div className="d-flex flex-column overflow-hidden">
            <div className="col-12 row h-25">
                <label className="col-7"><b>Descrição:</b></label>
                <label className="col-2"><b>Qtd:</b></label>
                <label className="col-3"><b>R$:</b></label>
               
            </div>
            <div style={containerList} >
                {props.commandList.map((item) =>
                    <div key={`item_${item.id}`} className="col-12 py-2">
                        <label className="col-7 text-capitalize">{item.description}</label>
                        <label className="col-2">{item.quantity}</label>
                        <label className="col-3">{item.value.toFixed(2)}</label>
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
        props.commandList.forEach(item => result += item.value);
        return result;
    }
}