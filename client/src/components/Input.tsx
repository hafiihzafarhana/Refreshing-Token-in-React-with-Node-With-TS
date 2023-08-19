interface GlobalInputProps {
  htmlFor?: string;
  val?: string;
  setVal?: (value: string) => void;
  type: string;
  placeHolder?: string;
  required: boolean;
}

const GlobalInput: React.FC<GlobalInputProps> = ({
  htmlFor,
  val,
  setVal,
  type,
  placeHolder,
}) => {
  return (
    <input
      type={type}
      id={htmlFor}
      value={val}
      placeholder={placeHolder}
      // required={true}
      onChange={(event) => setVal && setVal(event.target.value)}
      className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 outline-none"
    />
  );
};

export default GlobalInput;
