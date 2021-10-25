import React from "react";

interface PropsDataType {
    type: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
}

const TypeInputs = (props: PropsDataType) => {
    return (
        <div>
            <div className="hidden md:grid grid-cols-3">
                <div>
                    <input
                        type="radio"
                        id="Sequence"
                        name="type"
                        value="Sequence"
                        className="focus:ring-0 focus:ring-offset-0"
                        checked={props.type === "Sequence"}
                        onChange={props.onChange}
                    />
                    <label htmlFor="Sequence" className="ml-2">
                        Sequence
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="Keyword"
                        name="type"
                        value="Keyword"
                        className="focus:ring-0 focus:ring-offset-0"
                        checked={props.type === "Keyword"}
                        onChange={props.onChange}
                    />
                    <label htmlFor="Keyword" className="ml-2">
                        Keyword
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="ID"
                        name="type"
                        value="ID"
                        className="focus:ring-0 focus:ring-offset-0"
                        checked={props.type === "ID"}
                        onChange={props.onChange}
                    />
                    <label htmlFor="ID" className="ml-2">
                        NCBI/UniProt ID
                    </label>
                </div>
            </div>
            <div className="md:hidden">
                <select
                    name="type"
                    id="type"
                    className="w-full"
                    value={props.type}
                    onChange={props.onChange}
                >
                    <option value="Sequence">Sequence</option>
                    <option value="Keyword">Keyword</option>
                    <option value="ID">NCBI/UniProt ID</option>
                </select>
            </div>
        </div>
    );
};

export default TypeInputs;
