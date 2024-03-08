import { useEffect, useState } from "react";
import { iListOrder } from "../../Interface/iOrders";
import Util from "../../Util";
import { useMyContext } from "../../MyContext";
import { iProduct } from "../../Interface/iProducts";

interface iGetProduct {
    commandList: iListOrder[];
    setCommandList: (item: iListOrder[]) => void
}
export default function GetProduct(props: iGetProduct): JSX.Element {
    const { product, classification } = useMyContext();

    const util = new Util();
    const [productList, setProductList] = useState(product);

    useEffect(() => {
        (() => {
            productList.sort((a, b) => a.classification.localeCompare(b.classification));
        })();
    }, [productList]);
    const styleList = {
        height: '65vh'
    }
    return (
        <div>
            <div className="my-4 col-12 row">
                <div className="col-6">
                    <span className="h5">Categorias:</span>
                    <select className="form-control" onChange={(event) => {
                        if (event.target.value == 'full') {
                            setProductList(product);
                        } else {
                            let result = product.filter(item => item.classification == event.target.value);
                            setProductList(result);
                        }
                    }}>
                        <option value='full'>Todos</option>
                        {classification.map(classItem => <option key={`classItem_${classItem.id}`} value={classItem.id}>{classItem.description}</option>)}
                    </select>
                </div>
                <div className="col-6">
                    <span className="h5">Descrição:</span>
                    <input onChange={(event) => {
                        if (event.target.value) {
                            let result = product.filter(prod => prod.description.toUpperCase().includes(event.target.value.toUpperCase()));
                            setProductList(result);
                        } else {
                            setProductList(product);
                        }
                    }} className="form-control" type="text" />
                </div>
            </div>
            <div style={styleList} className="overflow-auto">
                {productList.map(item => <div className="d-flex justify-content-between bg-light rounded border my-4 p-1" key={`item_product_${item.id}`}>
                    <p className="col-8 m-0">
                        <b>{util.getClassDesc(item.classification || '', classification)}:</b>
                        <br></br>
                        {item.description}.
                        <br></br>
                        Porção: {item.units} unidade(s)
                        <br></br>
                        Preço: {util.maskMoney(item.price)}
                    </p>
                    <div className="d-flex align-items-center justify-content-around col-4">
                        <button onClick={() => {
                            controllerOrder(item, true);
                        }} className="btn btn-success" type="button" title='Mais'>+</button>
                        {getItemQuantity(item.id || '')}
                        <button onClick={() => {
                            controllerOrder(item, false);
                        }} className="btn btn-danger" type="button" title='Menos'>-</button>
                    </div>
                </div>)}
            </div>
        </div>
    );
    function controllerOrder(item: iProduct, add: boolean) {
        let response = getItemForId(item.id || '');
        if (response.id && response.quantity != 0) {
            changeItemQuantity(item.id || '', add, item.price);
        }
        else {
            add && addItem(item);
        }
    }

    function addItem(item: iProduct) {
        let list = props.commandList;
        list.push({ id: item.id || '', quantity: 1, description: item.description, value: item.price });
        props.setCommandList([...list]);
    }

    function changeItemQuantity(idItem: string, add: boolean, price: number) {
        let item = getItemForId(idItem);
        const newQtt = add ? item.quantity + 1 : item.quantity - 1;
        if (newQtt > 0) {
            item.quantity = newQtt;
            item.value = item.quantity * price;
            changeList(item);
        }
        if (newQtt == 0) {
            removeItemList(idItem);
        }
    }
    function changeList(newItem: iListOrder) {
        let list = props.commandList;
        list.forEach((item, index) => {
            if (newItem.id == item.id) list[index] = newItem;
        });
        props.setCommandList([...list]);
    }

    function removeItemList(idItem: string) {
        let list = props.commandList;
        let result: iListOrder[] = [];
        list.forEach(item => {
            if (item.id != idItem) result.push(item);
        });
        props.setCommandList([...result]);
    }

    function getItemQuantity(idItem: string): number {
        let result: number = 0;
        let item = getItemForId(idItem);
        result = item.quantity;
        return result;
    }

    function getItemForId(idItem: string): iListOrder {
        let result: iListOrder = {
            id: '',
            quantity: 0,
            description: '',
            value: 0
        };
        props.commandList.forEach(item => {
            if (idItem == item.id) result = item;
        });
        return result;
    }
}