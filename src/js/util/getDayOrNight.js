const isDayTime = (date) => {
  const dateHours = new Date(date).getHours();

  return dateHours > 6 && dateHours < 20;
};

export default isDayTime;
