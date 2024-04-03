const ChatHeader = ({ name }: { name: string }) => {
  return (
    <div className="relative flex justify-center bg-ct_brown-500 py-4 text-center align-middle text-xl font-bold text-white">
      {name}
    </div>
  );
};

export default ChatHeader;
