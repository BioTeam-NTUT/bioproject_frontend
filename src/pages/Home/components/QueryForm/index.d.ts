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
    };
    selectedHost: string;
    fasta?: Blob;
}

export const enum FormFieldNames {
    TextField = "textField",
    RecordField = "recordField",
    EmailField = "emailField",
    ThresholdField = "thresholdField",
    MinLengthField = "minLengthField",
    ListField = "listField"
}

export type { PropsDataTypes, FormDataTypes, OutputDataTypes };