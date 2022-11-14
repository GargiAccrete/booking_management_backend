// Datetime related utilities
const getCurrentTimestamp = () => Math.ceil(Date.now() / 1000);
const convertTimestampToDate = (val) => {
  const d = new Date(Number(val) * 1000);
  return d.toUTCString();
};

module.exports = {
  getCurrentTimestamp,
  convertTimestampToDate,
};
