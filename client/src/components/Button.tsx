interface GlobalButtonProps {
  name: string;
  type?: "button" | "reset" | "submit" | undefined;
}

const GlobalButton: React.FC<GlobalButtonProps> = ({ name, type }) => {
  return (
    <button
      type={type}
      className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md transition duration-300"
    >
      {name}
    </button>
  );
};

export default GlobalButton;
