export const calculateRate = (rate) => {
  if (rate % 2) {
    let rateStr = rate.toString();
    let numAfterDot = rateStr.slice(2);
    let numBeforeDot = rateStr.slice(0, 1);
    if (numAfterDot > 4) {
      return rate;
    } else {
      return Number(numBeforeDot);
    }
  } else {
    return rate;
  }
};
