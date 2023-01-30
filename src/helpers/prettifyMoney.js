export default function prettify_money(number) {
  if (number) {
    return number.toLocaleString("en-US");
  } else {
    return;
  }
}
