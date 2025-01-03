export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatTerm = (term: string) => {
  const isAnnual = term.toLowerCase() === "anual";
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full ${
        isAnnual
          ? "bg-[#D0C5DF] border border-[#44197E] text-[#44197E]"
          : "bg-[#E3F1D0] border border-[#2E4E06] text-[#2E4E06]"
      }`}
    >
      {term}
    </span>
  );
};
