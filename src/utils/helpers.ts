export const splitCreditCardNumber = (cardNumber: string) => {
  // Remove any non-numeric characters from the input
  cardNumber = cardNumber.replace(/\D/g, "");

  const splitNumber = [];
  for (let i = 0; i < cardNumber.length; i += 4) {
    splitNumber.push(cardNumber.substring(i, i + 4));
  }

  return splitNumber.join(" ");
};
