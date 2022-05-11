String.prototype.equals_pl = function (str) {
  for (var i = 0; i < str.length; i++) {
    str = str.replace("ę", "e");
    str = str.replace("ó", "o");
    str = str.replace("ą", "a");
    str = str.replace("ś", "s");
    str = str.replace("ł", "l");
    str = str.replace("ż", "z");
    str = str.replace("ź", "z");
    str = str.replace("ć", "c");
    str = str.replace("ń", "n");
  }
  if (this == str) {
    return true;
  } else {
    return false;
  }
};

var test = new String("gzegzolka");
console.log(test.equals_pl("gżegżółka"));
console.log(test.equals_pl("Gżegżółka"));

var test2 = new String("zzzzzzzzzzzzz");
console.log(test2.equals_pl("żżżżżżżżżżźźź"));
