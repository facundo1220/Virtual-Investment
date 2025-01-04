import { IconType } from "react-icons";

interface CardProps {
  title: string;
  Icon: IconType;
}

const Card: React.FC<CardProps> = ({ title, Icon }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full lg:w-44 h-36 lg:h-44 gap-2 rounded-3xl bg-white">
      <div className="flex justify-center items-center h-[55px] w-[55px] rounded-full p-4 bg-gradient-to-bl from-[#d0e0de] to-[#f3ff6e]">
        <Icon size={30} />
      </div>
      <h3 className="text-center text-small mt-2">{title}</h3>
    </div>
  );
};

export default Card;
