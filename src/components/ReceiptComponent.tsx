import checkMark from "../assets/checkmark.svg";

interface ReceiptComponentProps {
  handleIsComplete: () => void;
}

const ReceiptComponent = ({ handleIsComplete }: ReceiptComponentProps) => {
  return (
    <div className="w-full flex flex-col gap-5 items-center">
      <div>
        <img src={checkMark} alt="Checkmark" />
      </div>
      <div className="grid gap-2 text-center">
        <h3 className="text-xl uppercase">Thank you!</h3>
        <p>We've added your card details</p>
      </div>
      <button
        className="bg-[#21092F] h-12 flex justify-center items-center w-full rounded-md hover:opacity-90 cursor-pointer text-white font-semibold text-lg mt-10"
        type="button"
        onClick={handleIsComplete}
      >
        Continue
      </button>
    </div>
  );
};

export default ReceiptComponent;
