import Button from "../Button/Button";

function ProcessInfo({ nextStep }: { nextStep: () => void }) {
  return (
    <div className="flex justify-center items-center sm:flex-col lg:flex-row gap-10 h-full">
      <div className="h-full w-full lg:w-1/2 flex flex-col justify-center gap-10">
        <h1 className="text-3xl font-mono font-bold">
          Simulator - Virtual Investment
        </h1>
        <div>
          <h2 className="text-md font-thin">
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
      <div className="bg-black rounded-xl h-3/4 w-full lg:w-1/2 flex items-center justify-center">
        <div className="grid sm:grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-14">
          <div className="bg-white rounded-3xl w-full lg:w-44 h-20 lg:h-44"></div>
          <div className="bg-white rounded-3xl w-full lg:w-44 h-20 lg:h-44"></div>
          <div className="bg-white rounded-3xl w-full lg:w-44 h-20 lg:h-44"></div>
          <div className="bg-white rounded-3xl w-full lg:w-44 h-20 lg:h-44"></div>
        </div>
      </div>
    </div>
  );
}

export default ProcessInfo;
