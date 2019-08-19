function isValidIRCellphoneNumber(cellphone: string): boolean {
  const cleaned = cleanIRCellphoneNumber(cellphone);
  if (cleaned.length !== 10) {
    return false;
  }
  const regexp = /^9\d{9}$/;
  return regexp.test(cleaned);
}

function cleanIRCellphoneNumber(cellphone: string): string {
  if (typeof cellphone !== 'string' || cellphone === '') {
    return cellphone;
  }
  return cellphone
    .trim()
    .replace(/\s/g, '')
    .replace(/^[0۰]/, '')
    .replace(/([۰-۹])/g, function replacer(match, p1) {
      return IrToEn[p1];
    });
}

const IrToEn = {
  '۰': '0',
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9',
};
export { isValidIRCellphoneNumber, cleanIRCellphoneNumber };
