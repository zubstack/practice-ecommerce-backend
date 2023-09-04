function add(a, b) {
  return a + b;
}

function reverseString(str) {
  if (str === "") return "";
  return reverseString(str.substr(1)) + str.charAt(0);
}

export { add, reverseString };
