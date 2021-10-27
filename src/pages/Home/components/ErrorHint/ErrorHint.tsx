interface PropsDataType {
    isInvalid: boolean;
    isBlockDisplay?: boolean;
    errorMessage?: string;
}

const ErrorHint = (props: PropsDataType) => {
    const isInvalid = props.isInvalid;
    const isBlockDisplay = props.isBlockDisplay ?? true;
    const errorMessage = props.errorMessage ?? "Invalid input";

    return (
        <span
            className={`font-medium text-red-500 text-xs 
                    ${isInvalid ? "" : "hidden"} ${
                isBlockDisplay ? "block" : ""
            }`}
        >
            {errorMessage}
        </span>
    );
};

export default ErrorHint;
