import { useEffect, useState } from "react";
import ApiFireBase from "../../API/ApiFireBase";
import { iListOrder, iOrders } from "../../Interface/iOrders";
import Buttons from "../Buttons/Buttons";
import { faPlus, faRotateBack } from "@fortawesome/free-solid-svg-icons";
import BuildListOrder from "./BuildListOrder";
import { iCommands } from "../../Interface/iProducts";
import { useMyContext } from "../../MyContext";
import GetProduct from "../Product/GetProduct";

interface iProps {
    id?: string,
    commands: number,
    status: boolean
}

export default function Order(props: iProps): JSX.Element {
    const { loadCommands } = useMyContext();

    const [addItem, setAddItem] = useState<boolean>(false);
    const [commandList, setCommandList] = useState<iOrders>({
        commands: props.commands,
        list: [],
        date: "",
        status: false,
        id: props.id || ''
    });


    useEffect(() => {
        (async () => {
            try {
                const reqOrder = new ApiFireBase('Pedidos');
                let resOrder: iOrders = await reqOrder.getOrder(props.commands);
                if (resOrder) {
                    setCommandList(resOrder)
                };
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
                    if (addItem) {
                        const reqOrder = new ApiFireBase('Pedidos');
                        if (commandList.status && commandList.list.length > 0) {
                            // Atualiza comanda.
                            const id = commandList.commands || 0;
                            await reqOrder.putOrder(id, commandList);
                        } else if (commandList.list.length > 0) {
                            // Cria comanda.
                            changeStatusCommands(false);
                            commandList.status = true;
                            await reqOrder.post(commandList);
                        } else if (commandList.list.length == 0) {
                            // Deleta comanda.
                            changeStatusCommands(true);
                            await reqOrder.deleteOrder(commandList.commands);
                        }
                    }
                }} typeBtn="button" />
            </div>
            {addItem ? <GetProduct commandList={commandList.list} setCommandList={updateList} /> : <BuildListOrder idCommand={commandList.commands} commandList={commandList.list} />}
        </div>
    );

    function changeStatusCommands(newState: boolean) {
        const upCommand: iCommands = {
            commands: commandList.commands,
            status: newState
        }
        const newCommand = new ApiFireBase('Mesas');
        newCommand.putCommand(commandList.commands, upCommand);
        loadCommands();
    }
}