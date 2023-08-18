interface GlobalInputProps {
  htmlFor?: string;
}

const GlobalInput: React.FC<GlobalInputProps> = ({ htmlFor }) => {
  return (
    <input
      type="text"
      id={htmlFor}
      className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 outline-none"
    />
  );
};

export default GlobalInput;
