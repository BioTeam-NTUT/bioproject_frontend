import React from 'react';
interface PropsDataTypes {
	fileName: string;
	hidden: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = (props: PropsDataTypes) => {
	return (
		<label className={props.hidden ? "hidden" : ""}>
			<span className="mr-3 block">FASTA File:</span>
			<input type="file" id="fasta" name="fasta" className="rounded" onChange={props.onChange} value={props.fileName} />
		</label>
	);
}

export default FileInput;