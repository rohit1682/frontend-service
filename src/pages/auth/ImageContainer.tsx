const ImageContainer: React.FC = () => {
    return (
          
        <div className="img-holder h-full flex justify-end items-end rounded-3xl bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('/images/form_image.png')" }}>

                <div className="text-container  m-5  flex items-center p-4 h-1/2">
                <span className="font-medium sm:text-xl md:text-xl lg:text-[30px] text-[#FFFFFF] leading-[48px] tracking-[0px] lexend-font text-md">
                  “The path to triumph is paved with the<span className="text-[#9EF300]"> strength to train hard </span> and the perseverance to <span className="text-[#9EF300]"> rise each time you fall.” </span></span>
                </div>
                    
        </div>
    );
  };
  
export default ImageContainer;