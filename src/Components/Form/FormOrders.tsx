import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ApiFireBase from "../../API/ApiFireBase";
import { iCommands, iProduct } from "../../Interface/iProducts";
import { useMyContext } from "../../MyContext";
import { useEffect, useState } from "react";
import Buttons from "../Buttons/Buttons";
import { faPlus, faRotateBack } from "@fortawesome/free-solid-svg-icons";
import BuildListOrder from "../Order/BuildListOrder";
import Util from "../../Util";
import { iListOrder, iOrders } from "../../Interface/iOrders";

export default function FormOrders() {
    const { command, setModal, product, classification } = useMyContext();
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

    interface iProps {
        id?: string,
        commands: number,
        status: boolean
    }

    function Order(props: iProps): JSX.Element {
        const [addItem, setAddItem] = useState<boolean>(false);
        const [commandList, setCommandList] = useState<iOrders>({
            commands: props.commands,
            list: [

            ],
            date: "",
            status: false,
            id: props.id || ''
        });


        useEffect(() => {
            (async () => {
                try {
                    const reqOrder = new ApiFireBase('Pedidos');
                    let resOrder: iOrders = await reqOrder.getOrder(editCommand.commands);
                    resOrder && setCommandList(resOrder);
                } catch (error) {
                    console.error(error);
                }
            })();
        }, []);

        function updateList(list: iListOrder[]) {
            let newCommand: iOrders = commandList;
            newCommand.list = list || [] || undefined;
            setCommandList({ ...newCommand });
        };
        return (
            <div className="d-flex flex-column w-100">
                <div>
                    <Buttons classBtn="btn btn-outline-success" iconBtn={addItem ? faRotateBack : faPlus} title="Adicionar item..." onAction={async () => {
                        setAddItem(!addItem);
                        if (commandList.status && addItem) {
                            console.log("Atualizar commanda");
                            const id = commandList.commands || 0;
                            delete commandList.id;
                            const reqOrder = new ApiFireBase('Pedidos');
                            await reqOrder.putOrder(id, commandList);
                        } else if(addItem){
                            commandList.status = true;
                            const newOrder = new ApiFireBase('Pedidos');
                            let result = await newOrder.post(commandList);
                            console.log(result);
                        }

                        // if (addItem) {
                        //     const id = commandList.commands || 0;
                        //     delete commandList.id;
                        //     const reqOrder = new ApiFireBase('Pedidos');
                        //     await reqOrder.put(id,commandList);
                        // }

                    }} typeBtn="button" />
                </div>
                {addItem ? <GetProdutct commandList={commandList.list} setCommandList={updateList} /> : <BuildListOrder commandList={commandList.list} />}
            </div>
        );
    }

    interface iGetProduct {
        commandList: iListOrder[];
        setCommandList: (item: iListOrder[]) => void
    }
    function GetProdutct(props: iGetProduct): JSX.Element {
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
}