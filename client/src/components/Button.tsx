interface GlobalButtonProps {
  name: string;
}

const GlobalButton: React.FC<GlobalButtonProps> = ({ name }) => {
  return (
    <button className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md transition duration-300">
      {name}
    </button>
  );
};

export default GlobalButton;
