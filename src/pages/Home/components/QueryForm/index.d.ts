import { FormDataTypes } from "../../index.d";
interface PropsDataTypes {
    hostsList: Array<string>;
    formName: string;
    onSubmit: (e: FormDataTypes) => Promise<void>;
}

interface QueryFormStates extends OutputDataTypes {
    error: Map<string, boolean>;
    fileName: string;
    isSubmitting: boolean;
}

interface OutputDataTypes {
    type: string;
    text: string;
    requiredRecords: string;
    useEmail: boolean;
    email: string;
    genTaxonomy: boolean;
    LE: {
        threshold: number;
        minLength: number;
    };
    selectedHost: string;
    fasta?: Blob;
}

export type { PropsDataTypes, QueryFormStates, OutputDataTypes };
