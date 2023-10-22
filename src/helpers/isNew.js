export function isNew(dateString) {
  const date = new Date(dateString);
  const currentDate = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  return date > oneMonthAgo && date <= currentDate;
}
