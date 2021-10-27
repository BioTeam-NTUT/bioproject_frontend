interface HomeStates {
    hostsList: Array<string>;
}

interface FormDataTypes {
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
    selectedHost: string | null;
}

export { HomeStates, FormDataTypes };
