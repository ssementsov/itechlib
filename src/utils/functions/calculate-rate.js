export const calculateRate = (rate) => {
  if (rate % 2) {
    let rateStr = rate.toString();
    let numAfterComa = rateStr.slice(2);
    let numBeforeComa = rateStr.slice(0, 1);
    if (numAfterComa > 5) {
      return rate;
    } else {
      return Number(numBeforeComa);
    }
  } else {
    return rate;
  }
};
