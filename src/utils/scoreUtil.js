const getScore = (perfIndex) => {
  // score = ((cpi * 10) + (cf / 10000) + (mau * 10) + roic) / 4
  const cpi = Number(perfIndex.filter((elem) => elem.key == 'cpi')[0].value);
  const cf = Number(perfIndex.filter((elem) => elem.key == 'cf')[0].value);
  const mau = Number(perfIndex.filter((elem) => elem.key == 'mau')[0].value);
  const roic = Number(perfIndex.filter((elem) => elem.key == 'roic')[0].value);

  return ((cpi * 10) + (cf / 10000) + (mau * 10) + roic) / 4;
};

module.exports = {
  getScore
};