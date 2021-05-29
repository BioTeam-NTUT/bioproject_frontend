import React from 'react';
import { HostList } from '../HostList';
import { FileInput } from '../FileInput';
import { RecordInput } from '../RecordInput';
import { TypeInputs } from '../TypeInputs';

interface PropsDataTypes {
  hostsList: Array<string>;
  formName: string;
  onSubmit: (e: FormDataTypes) => void;
}

interface FormDataTypes extends OutputDataTypes {
  error: Map<string, boolean>;
  fileName: string;
}

interface OutputDataTypes {
  type: string;
  text: string;
  requiredRecords: string;
  useEmail: boolean;
  email: string;
  genTaxonomy: boolean;
  LE: {
      threshold: string;
      minLength: string;
  }
  selectedHost: string;
  fasta?: Blob;
};

const errorFunction = (error?: boolean, block: boolean = true, errorMessage: string = "Invalid input") => {
  return (
    <span className={"font-medium text-red-500 text-xs "+ (error ? (block ? "block" : "") : "hidden")}>{errorMessage}</span>
  );
}

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
          minLength: "5"
      },
      selectedHost: "",
      error: new Map<string, boolean>(
        [
          ['textfield', false],
          ['recordfield', false],
          ['emailfield', false],
          ['thresholdfield', false],
          ['minLengthfield', false],
          ['listfield', false]
        ]
      ),
      fileName: ""
    };

    this.handleHostListChange = this.handleHostListChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleRecordChange = this.handleRecordChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleEmailOptionChange = this.handleEmailOptionChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleTaxonomyOptionChange = this.handleTaxonomyOptionChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  isAllValid() {
    let error = this.state.error;
    let isInvalid: Boolean = false;

    if (!this.state.fasta && this.state.text === "") {
      error.set("textfield", true);
      isInvalid = true;
    }
    else {
      error.set("textfield", false);
    }

    if (this.state.useEmail && this.state.email === "") {
      error.set("emailfield", true);
      isInvalid = true;
    }
    else {
      error.set("emailfield", false);
    }

    if (this.state.selectedHost === "") {
      error.set("listfield", true);
      isInvalid = true;
    }
    else {
      error.set("listfield", false);
    }

    this.setState({
      error: error
    });

    error.forEach((value) => {
      if (value) {
        isInvalid = true;
        return false;
      }
    });

    if(isInvalid) return false;
    return true;
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    

    if (this.isAllValid()) {

    }
    
  }
  
  handleTypeChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    this.setState({
      type: e.target.value,
      fasta: undefined,
      fileName: ""
    });
  }

  handleRecordChange(e: React.ChangeEvent<HTMLInputElement>) {
    let number = Number(e.target.value);
    let error = this.state.error;

    if (isNaN(+number) || number < 1 || number > 50) {
      error.set("recordfield", true);
      console.log(error.get("recordfield"))
    }
    else {
      error.set("recordfield", false);
    }

    this.setState({
      requiredRecords: e.target.value,
      error: error
    });
  }

  handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList || fileList.length === 0) {
      this.setState({
        fasta: undefined,
        fileName: ""
      });
    }
    else {
      let error = this.state.error;
      error.set("textfield", false);
  
      this.setState({
        fasta: fileList[0],
        fileName: e.target.value,
        error: error
      });
    }
  }

  handleHostListChange(e: React.ChangeEvent<HTMLSelectElement>) {
    let error = this.state.error;
    error.set("listfield", false);
    this.setState({
      selectedHost: e.target.value,
      error: error
    });
  }

  handleEmailOptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      useEmail: Boolean(e.target.checked)
    });
  }

  handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    let pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    let error = this.state.error;

    if (!pattern.exec(e.target.value)) {
      error.set("emailfield", true);
    }
    else {
      error.set("emailfield", false);
    }

    this.setState({
      email: e.target.value,
      error: error
    });
  }

  handleTaxonomyOptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      genTaxonomy: Boolean(e.target.checked)
    });
  }

  handleLEOptionChange(name: string, e:React.ChangeEvent<HTMLInputElement>) {
    let LE = this.state.LE;
    let error = this.state.error;
    let tmp = Number(e.target.value);

    if (name === "threshold") {
      if (isNaN(+tmp) || tmp < 1 || tmp > 6) {
        error.set("thresholdfield", true);
      }
      else {
        error.set("thresholdfield", false);
      }

      LE.threshold = e.target.value;
    }
    else if (name === "minLength") {
      if (isNaN(+tmp) || tmp < 1) {
        error.set("minLengthfield", true);
      }
      else {
        error.set("minLengthfield", false);
      }

      LE.minLength = e.target.value;
    }

    this.setState({
      LE: LE,
      error: error
    });
  }

  handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    let error = this.state.error;

    if (!this.state.fasta && e.target.value === "") {
      error.set("textfield", true);
    }
    else {
      error.set("textfield", false);
    }

    this.setState({
      text: e.target.value,
      error: error
    });
  }

  render() {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-5 bg-yellow-50 p-3 rounded min-w-2/3 max-w-screen-lg">
        <div>
          <form id={this.props.formName} onSubmit={this.handleSubmit}>
            <label>Select a method to analyze</label>
            <TypeInputs type={this.state.type} onChange={this.handleTypeChange} />
            {errorFunction(this.state.error.get("textfield"), false, "This field should not be empty.")}
            <textarea rows={2} className="w-full mt-1 rounded focus:ring-0" onChange={this.handleTextChange}></textarea>
            <div className="grid grid-cols-2">
              {/* <RecordInput records={this.state.requiredRecords} onChange={this.handleRecordChange} errorMessage={errorFunction(this.state.error.get("recordfield"))} /> */}
              <FileInput hidden={this.state.type !== "Sequence"} fileName={this.state.fileName} onChange={this.handleFileChange} />
            </div>
          </form>
        </div>
        <div className="mr-5 lg:ml-5 lg:mr-0">
          <HostList
            onChange={this.handleHostListChange}
            formName={this.props.formName}
            hostsList={this.props.hostsList}
            selectedHost={this.state.selectedHost}
            errorMessage={errorFunction(this.state.error.get("listfield"), false, "Please choose one of hosts below.")}
          />
        </div>
        <div className="grid grid-cols-2">
          <div>
            <label>
              <input type="checkbox" checked={this.state.useEmail} onChange={this.handleEmailOptionChange} className="focus:ring-0 focus:ring-offset-0" />
              <span className="ml-2">send email <br />{errorFunction(this.state.useEmail && this.state.error.get("emailfield"), true, "Please enter your email.")}</span>
            </label>
            <input type="text" value={this.state.email} onChange={this.handleEmailChange} disabled={!this.state.useEmail} placeholder="Enter your email.." className="disabled:text-gray-400 rounded focus:ring-0"/>
          </div>
          <div>
            <label>
              <input type="checkbox" checked={this.state.genTaxonomy} onChange={this.handleTaxonomyOptionChange} className="focus:ring-0 focus:ring-offset-0" />
              <span className="ml-2">generate taxonomy</span>
            </label>
          </div>
          <div className={"mt-2 col-span-2 border-2 rounded border-dashed px-2 py-2" + ((this.state.error.get("thresholdfield") || this.state.error.get("minLengthfield")) ? " border-red-400" : "")}>
            <span className="block font-bold">LE voting system<span className="text-sm text-gray-500 font-normal"> (threshold: 1~6)</span></span>
            {errorFunction(this.state.error.get("thresholdfield") || this.state.error.get("minLengthfield"))}
            <div className="flex justify-around">
              <label>
                <span className="mr-2">Threshold:</span>
                <input type="text" name="threshold" value={this.state.LE.threshold} onChange={this.handleLEOptionChange.bind(this, "threshold")} className="focus:ring-0 focus:ring-offset-0"></input>
              </label>
              <label className="ml-1">
                <span className="mr-2">Min length:</span>
                <input type="text" name="minLength" value={this.state.LE.minLength} onChange={this.handleLEOptionChange.bind(this, "minLength")} className="focus:ring-0 focus:ring-offset-0"></input>
              </label>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-4">
          <button form={this.props.formName} className="text-white bg-purple-600 hover:bg-purple-700 font-bold focus:outline-none focus:ring-0 focus:ring-offset-0 col-start-3 self-end justify-self-end rounded-xl p-1">
            submit
          </button>
        </div>
      </div>
    );
  }
}

export default QueryForm;