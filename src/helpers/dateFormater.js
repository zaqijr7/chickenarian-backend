module.exports = (date) => {
  const dateTime = new Date(date).toLocaleString('en-US',
  { timeZone: 'Asia/Jakarta', hour12: false, day:'2-digit', month: '2-digit', year: 'numeric', });
  // console.log(date);
  const time = new Date().toLocaleString('en-US', 
  { timeZone: 'Asia/Jakarta', hour12: false, timeStyle: 'medium' });
  const arrayDate = dateTime.split('/');
  return arrayDate[2] + '-' + arrayDate[0] + '-' + arrayDate[1] + ' ' + time;
}