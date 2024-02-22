import React, { Children } from "react";
import { useMyContext } from "../../MyContext";
interface Props {
    children: JSX.Element;
}
export default function Modal(props: Props): JSX.Element {
    const { modal } = useMyContext();
    return modal ?
        (
            <div  id='formModal' className="d-flex align-items-center justify-content-center bg-dark vh-100 vw-100 bg-opacity-50 position-absolute top-0 left-0 overflow-hidden" >
                {props.children}
            </div>
        )
        :
        (<React.Fragment></React.Fragment>)
}