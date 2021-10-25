import React from "react";
import { ListItem } from "../ListItem";

interface PropsDataTypes {
    formName: string;
    hostsList: Array<string>;
    selectedHost: string;
    errorMessage: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLSpanElement>,
        HTMLSpanElement
    >;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const HostList = (props: PropsDataTypes) => {
    return (
        <label className="flex flex-col h-full">
            <span className="">Hosts {props.errorMessage}</span>
            <select
                form={props.formName}
                name="hosts"
                onChange={props.onChange}
                value={[props.selectedHost]}
                multiple
                className="flex-grow px-4 py-3 rounded w-3/4 focus:ring-0"
            >
                {props.hostsList.map((value, index) => {
                    return <ListItem key={index} host={value} />;
                })}
            </select>
        </label>
    );
};

export default HostList;
