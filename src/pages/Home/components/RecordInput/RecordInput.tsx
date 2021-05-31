import React from 'react';

interface PropsDataTypes {
  records: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
}

const RecordInput = (props: PropsDataTypes) => {
  return (
    <label className="">
      <span className="mr-3 block">Query records:<span className="text-sm text-gray-500"> (1~50)</span></span>
      {props.errorMessage}
      <input type="text" id="records" name="records" onChange={props.onChange} value={props.records} className="leading-4 w-20 rounded" />
    </label>
  );
};

export default RecordInput;