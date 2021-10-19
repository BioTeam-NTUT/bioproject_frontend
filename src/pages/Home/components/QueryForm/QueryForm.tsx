import React from "react";
import { HostList } from "../HostList";
import { TypeInputs } from "../TypeInputs";
import { FileInput } from "../FileInput";
import { RecordInput } from "../RecordInput";
import { ErrorHint } from "../ErrorHint";
import { PropsDataTypes, FormDataTypes, FormFieldNames } from "./index.d";

class QueryForm extends React.Component<PropsDataTypes, FormDataTypes> {
    constructor(props: PropsDataTypes) {
        super(props);

        this.state = {
            type: "Sequence",
            text: "",
            useEmail: false,
            email: "",
            requiredRecords: "10",
            genTaxonomy: false,
            LE: {
                threshold: "3",
                minLength: "5",
            },
            selectedHost: "",
            error: new Map<string, boolean>([
                [FormFieldNames.TextField, false],
                [FormFieldNames.RecordField, false],
                [FormFieldNames.EmailField, false],
                [FormFieldNames.ThresholdField, false],
                [FormFieldNames.MinLengthField, false],
                [FormFieldNames.ListField, false],
            ]),
            fileName: "",
        };

        this.handleHostListChange = this.handleHostListChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleRecordChange = this.handleRecordChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleEmailOptionChange = this.handleEmailOptionChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleTaxonomyOptionChange =
            this.handleTaxonomyOptionChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    isAllValid() {
        let error = this.state.error;
        let isInvalid: boolean = false;

        if (!this.state.fasta && this.state.text === "") {
            error.set(FormFieldNames.TextField, true);
            isInvalid = true;
        } else {
            error.set(FormFieldNames.TextField, false);
        }

        if (this.state.useEmail && this.state.email === "") {
            error.set(FormFieldNames.EmailField, true);
            isInvalid = true;
        } else {
            error.set(FormFieldNames.EmailField, false);
        }

        if (this.state.selectedHost === "") {
            error.set(FormFieldNames.ListField, true);
            isInvalid = true;
        } else {
            error.set(FormFieldNames.ListField, false);
        }

        this.setState({
            error: error,
        });

        error.forEach((value) => {
            if (value) {
                isInvalid = true;
                return false;
            }
        });

        if (isInvalid) return false;
        return true;
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (this.isAllValid()) {
        }
    }

    handleTypeChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        this.setState({
            type: e.target.value,
            fasta: undefined,
            fileName: "",
        });
    }

    handleRecordChange(e: React.ChangeEvent<HTMLInputElement>) {
        let number = Number(e.target.value);
        let error = this.state.error;

        if (isNaN(+number) || number < 1 || number > 50) {
            error.set(FormFieldNames.RecordField, true);
        } else {
            error.set(FormFieldNames.RecordField, false);
        }

        this.setState({
            requiredRecords: e.target.value,
            error: error,
        });
    }

    handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;

        if (!fileList || fileList.length === 0) {
            this.setState({
                fasta: undefined,
                fileName: "",
            });
        } else {
            let error = this.state.error;
            error.set(FormFieldNames.TextField, false);

            this.setState({
                fasta: fileList[0],
                fileName: e.target.value,
                error: error,
            });
        }
    }

    handleHostListChange(e: React.ChangeEvent<HTMLSelectElement>) {
        let error = this.state.error;
        error.set(FormFieldNames.ListField, false);
        this.setState({
            selectedHost: e.target.value,
            error: error,
        });
    }

    handleEmailOptionChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            useEmail: Boolean(e.target.checked),
        });
    }

    handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        let pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        let error = this.state.error;

        if (!pattern.exec(e.target.value)) {
            error.set(FormFieldNames.EmailField, true);
        } else {
            error.set(FormFieldNames.EmailField, false);
        }

        this.setState({
            email: e.target.value,
            error: error,
        });
    }

    handleTaxonomyOptionChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            genTaxonomy: Boolean(e.target.checked),
        });
    }

    handleLEOptionChange(name: string, e: React.ChangeEvent<HTMLInputElement>) {
        let LE = this.state.LE;
        let error = this.state.error;
        let tmp = Number(e.target.value);

        if (name === "threshold") {
            if (isNaN(+tmp) || tmp < 1 || tmp > 6) {
                error.set(FormFieldNames.ThresholdField, true);
            } else {
                error.set(FormFieldNames.ThresholdField, false);
            }

            LE.threshold = e.target.value;
        } else if (name === "minLength") {
            if (isNaN(+tmp) || tmp < 1) {
                error.set(FormFieldNames.MinLengthField, true);
            } else {
                error.set(FormFieldNames.MinLengthField, false);
            }

            LE.minLength = e.target.value;
        }

        this.setState({
            LE: LE,
            error: error,
        });
    }

    handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        let error = this.state.error;

        if (!this.state.fasta && e.target.value === "") {
            error.set(FormFieldNames.TextField, true);
        } else {
            error.set(FormFieldNames.TextField, false);
        }

        this.setState({
            text: e.target.value,
            error: error,
        });
    }

    render() {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-5 bg-yellow-50 p-3 rounded min-w-2/3 max-w-screen-lg">
                <div>
                    <label>Select a method to analyze</label>
                    <form id={this.props.formName} onSubmit={this.handleSubmit}>
                        <TypeInputs
                            type={this.state.type}
                            onChange={this.handleTypeChange}
                        />
                        <ErrorHint
                            isInvalid={this.state.error.get(FormFieldNames.TextField)!}
                            isBlockDisplay = {false}
                            errorMessage={"This field should not be empty."}
                        />
                        <textarea
                            rows={2}
                            className="w-full mt-1 rounded focus:ring-0"
                            onChange={this.handleTextChange}
                        ></textarea>
                        <div className="grid grid-cols-2">
                            <RecordInput
                                records={this.state.requiredRecords}
                                onChange={this.handleRecordChange}
                                errorMessage={
                                    <ErrorHint
                                        isInvalid={this.state.error.get(FormFieldNames.RecordField)!}
                                    />
                                }
                            />
                            <FileInput
                                hidden={this.state.type !== "Sequence"}
                                fileName={this.state.fileName}
                                onChange={this.handleFileChange}
                            />
                        </div>
                    </form>
                </div>
                <div className="mr-5 lg:ml-5 lg:mr-0">
                    <HostList
                        onChange={this.handleHostListChange}
                        formName={this.props.formName}
                        hostsList={this.props.hostsList}
                        selectedHost={this.state.selectedHost}
                        errorMessage={
                            <ErrorHint
                                isInvalid={this.state.error.get(FormFieldNames.ListField)!}
                                isBlockDisplay = {false}
                                errorMessage={"Please choose one of hosts below."}
                            />
                        }
                    />
                </div>
                <div className="grid grid-cols-2">
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={this.state.useEmail}
                                onChange={this.handleEmailOptionChange}
                                className="focus:ring-0 focus:ring-offset-0"
                            />
                            <span className="ml-2">
                                send email <br />
                                <ErrorHint
                                    isInvalid={
                                        this.state.useEmail &&
                                        this.state.error.get(FormFieldNames.EmailField)!
                                    }
                                    isBlockDisplay = {true}
                                    errorMessage={"Please enter your email."}
                                />
                            </span>
                        </label>
                        <input
                            type="text"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                            disabled={!this.state.useEmail}
                            placeholder="Enter your email.."
                            className="disabled:text-gray-400 rounded focus:ring-0"
                        />
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={this.state.genTaxonomy}
                                onChange={this.handleTaxonomyOptionChange}
                                className="focus:ring-0 focus:ring-offset-0"
                            />
                            <span className="ml-2">generate taxonomy</span>
                        </label>
                    </div>
                    <div
                        className={
                            "mt-2 col-span-2 border-2 rounded border-dashed px-2 py-2" +
                            (this.state.error.get(FormFieldNames.ThresholdField) ||
                            this.state.error.get(FormFieldNames.MinLengthField)
                                ? " border-red-400"
                                : "")
                        }
                    >
                        <span className="block font-bold">
                            LE voting system
                            <span className="text-sm text-gray-500 font-normal">
                                {" "}
                                (threshold: 1~6)
                            </span>
                        </span>
                        <ErrorHint
                            isInvalid={
                                this.state.error.get(FormFieldNames.ThresholdField)! ||
                                this.state.error.get(FormFieldNames.MinLengthField)!
                            }
                        />
                        <div className="flex justify-around">
                            <label>
                                <span className="mr-2">Threshold:</span>
                                <input
                                    type="text"
                                    name="threshold"
                                    value={this.state.LE.threshold}
                                    onChange={this.handleLEOptionChange.bind(
                                        this,
                                        "threshold"
                                    )}
                                    className="focus:ring-0 focus:ring-offset-0"
                                ></input>
                            </label>
                            <label className="ml-1">
                                <span className="mr-2">Min length:</span>
                                <input
                                    type="text"
                                    name="minLength"
                                    value={this.state.LE.minLength}
                                    onChange={this.handleLEOptionChange.bind(
                                        this,
                                        "minLength"
                                    )}
                                    className="focus:ring-0 focus:ring-offset-0"
                                ></input>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="grid lg:grid-cols-4">
                    <button
                        form={this.props.formName}
                        className="text-white bg-purple-600 hover:bg-purple-700 font-bold focus:outline-none focus:ring-0 focus:ring-offset-0 col-start-3 self-end justify-self-end rounded-xl p-1"
                    >
                        submit
                    </button>
                </div>
            </div>
        );
    }
}

export default QueryForm;
