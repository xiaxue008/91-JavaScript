var a = 0;
if (true) {
  a = 1;
  function a() {}
  a = 21;
  console.log(a);
}
console.log(a);
