import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    onAction: () => void;
    description?: string;
    typeBtn?: "submit" | "reset" | "button" | undefined;
    iconBtn?: IconProp;
    title: string;
    classBtn?: string;
}
export default function Buttons({ onAction, description, title, typeBtn, iconBtn, classBtn }: Props): JSX.Element {
    return (
        <button title={title} type={typeBtn} onClick={async () => await onAction()} className={classBtn}>
            {iconBtn? <IconBtn/> : <DescBtn/>}
        </button>
    );
    function IconBtn(): JSX.Element {
        return (
            <FontAwesomeIcon icon={iconBtn as IconProp} />
        );
    }
    function DescBtn(): JSX.Element {
        return (
            <label>{description || 'Ok'}</label>
        );
    }
}