/**
 * Helper function to round to 2 decimal places for currency
 */
const roundToTwo = (num: number): number => {
  return Math.round(num * 100) / 100;
};

export const calculateInventory = (items: any[], discount = 0, tax = 0) => {
  let subtotal = 0;

  const calculatedItems = items.map((item) => {
    const value = roundToTwo(item.unitPrice * item.quantity);
    subtotal += value;

    return {
      ...item,
      value,
    };
  });

  // Round subtotal to 2 decimal places
  subtotal = roundToTwo(subtotal);

  const discountValue = roundToTwo((subtotal * discount) / 100);
  
  // Tax is applied to the discounted amount, not the original subtotal
  const discountedAmount = roundToTwo(subtotal - discountValue);
  const taxValue = roundToTwo((discountedAmount * tax) / 100);

  const finalTotal = roundToTwo(discountedAmount + taxValue);

  return {
    items: calculatedItems,
    subtotal,
    finalTotal,
  };
};
