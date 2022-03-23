const dateTime = new Date().toLocaleString('en-US',
{ timeZone: 'Asia/Jakarta', hour12: false, day:'2-digit', month: '2-digit', year: 'numeric', });
const time = new Date().toLocaleString('en-US', 
{ timeZone: 'Asia/Jakarta', hour12: false, timeStyle: 'medium' });
const arrayDate = dateTime.split('/');
const formatDate = arrayDate[2] + '-' + arrayDate[0] + '-' + arrayDate[1] + ' ' + time;
module.exports = formatDate;