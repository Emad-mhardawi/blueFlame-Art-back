const calculateOrderPrice = (portraitStyle, portraitSize, fullBody) => {
  let price;

  if (portraitStyle === "line-art-portrait") {
    price = 60;
  }

  if (portraitStyle === "anime-style-portrait") {
    price = 35;
  }

  return price;
};

module.exports = calculateOrderPrice;
