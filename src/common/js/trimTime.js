export function trimTime (times) {
  var time = new Date(times);
  var obj = {
    'Y': time.getFullYear(),
    'M': time.getMonth() + 1,
    'D': time.getDate(),
    'H': time.getHours(),
    'min': time.getMinutes()
  };
  return obj;
}
