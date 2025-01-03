interface ButtonArgs {
  title: string;
  onclick?: () => void;
  className?: string;
}

function Button({ title, className, onclick }: ButtonArgs) {
  return (
    <button
      onClick={onclick}
      className={`font-medium h-12 text-button px-5 py-2.5 me-2 mb-2  focus:outline-none  ${className}`}
      type="submit"
    >
      {title}
    </button>
  );
}

export default Button;
