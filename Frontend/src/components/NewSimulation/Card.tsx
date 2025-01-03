import { IconType } from "react-icons";

interface CardProps {
  title: string;
  Icon: IconType;
}

const Card: React.FC<CardProps> = ({ title, Icon }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-3xl w-full lg:w-44 h-36 lg:h-44 gap-2">
      <div className="flex items-center justify-center bg-gradient-to-bl from-[#d0e0de] to-[#f3ff6e] rounded-full p-4 h-[55px] w-[55px]">
        <Icon size={30} />
      </div>
      <h3 className="mt-2 text-center text-small">{title}</h3>
    </div>
  );
};

export default Card;
