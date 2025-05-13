import headerImage from "./../../../assets/images/header.svg";
const TitleBar = ({ title = "Welcome" }) => {
  return (
    <div className="w-full h-16 overflow-hidden relative">
      <img
        src={headerImage}
        alt="Header"
        className="absolute inset-0 w-full h-full object-cover z-10"
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full flex items-center z-20 px-6">
        <h2 className="text-white text-lg">{title} </h2>
      </div>
    </div>
  );
};

export default TitleBar;
