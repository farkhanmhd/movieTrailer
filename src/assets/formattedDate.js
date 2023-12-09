const formattedDate = (date) => {
  const newDate = new Date(date);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return newDate.toLocaleDateString("en-UK", options);
};

export default formattedDate;
