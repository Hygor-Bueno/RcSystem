import { Children } from "react";
interface Props {
    children: JSX.Element;
}
export default function Modal(props: Props): JSX.Element {
    return (
        <div className="d-flex align-items-center justify-content-center bg-dark vh-100 vw-100 bg-opacity-50 position-absolute position-absolute" >
            {props.children}
        </div>
    )
}