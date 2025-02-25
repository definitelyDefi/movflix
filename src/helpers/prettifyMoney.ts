export default function prettify_money(number: number) {
  if (number) {
    return number.toLocaleString("en-US");
  } else {
    return;
  }
}
