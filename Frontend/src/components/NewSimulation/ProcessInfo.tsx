import Button from "../Button/Button";
import Card from "./Card";
import { RiComputerLine } from "react-icons/ri";
import { BiCoin } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoCashOutline } from "react-icons/io5";

function ProcessInfo({ nextStep }: { nextStep: () => void }) {
  const cards = [
    { title: "100% Digital, No Documents", Icon: RiComputerLine },
    { title: "Minimun Amount to Start: $500.000", Icon: BiCoin },
    { title: "Minimun Investemt Period: 30 Days", Icon: FaRegCalendarAlt },
    {
      title: "Required: OneBank Savings or Cheking Account",
      Icon: IoCashOutline,
    },
  ];

  return (
    <div className="flex justify-center items-center flex-col lg:flex-row gap-10 h-full">
      <div className="h-full s-full lg:w-1/2 flex flex-col justify-center gap-10">
        <h1 className="md:text-headline3 text-headline4 font-semibold">
          Simulator - Virtual Investment
        </h1>
        <div>
          <h2 className="text-paragraph font-thin">
            With the term and the amount you want to invest, you will be able to
            simulate the approximate conditions of your investment.
          </h2>
        </div>
        <Button
          className="bg-black rounded-full h-14 text-white hover:text-black hover:bg-[#f3ff6e] w-full lg:w-3/4"
          title="Start"
          onclick={nextStep}
        />
      </div>
      <div className="lg:w-1/2 flex h-3/4 justify-center">
        <div className="bg-black rounded-3xl  w-full lg:w-max p-14">
          <div className="grid sm:grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-14">
            {cards.map((card, index) => (
              <Card key={index} title={card.title} Icon={card.Icon} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessInfo;
