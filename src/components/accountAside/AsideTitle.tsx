import { AsideTitleProps } from "../../types/asidetype/AsideTitle";
import React from "react";

function AsideTitle({
  text,
  className,
  onClick,
}: AsideTitleProps): React.JSX.Element {
  return (
    <div
      className={`border-3 border-transparent hover:cursor-pointer transition-all duration-200 md:text-sm ${className}`}
      onClick={onClick}
    >
      <h2 className="font-lexend p-4">{text}</h2>
    </div>
  );
}

export default AsideTitle;
