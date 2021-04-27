interface PropsDataTypes {
  host: string;
};

const ListItem = (props: PropsDataTypes) => {
  return (
    <option label={props.host} value={props.host}>{props.host}</option>
  );
};

export default ListItem;