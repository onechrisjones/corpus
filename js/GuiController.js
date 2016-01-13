// Keep this in mind for the entirety of our javascript base:
// http://www.thinkful.com/learn/javascript-best-practices-1/#Allow-for-Configuration-and-Translation

// L E G A C Y
var Corpus = function() {

  // instantiate general properties on the object that we will always need:

  rawText = document.getElementById("inputTextbox").value;

  this.lines = rawText.replace(/[\"\,\.\-\!\?]/g, "") // " , . ! ? -
    .replace(/\n\s*\n/g, "\n") // multiple line breaks with potential whitespace between
    .replace(/^\s+|\s+$/gm, "") // whitespace at beginning/end of lines
    .split("\n");

  var pureLines = this.lines.filter(function(elem) {
    return elem.charAt(0) != "#"; // exclude MD headers
  });

  this.words = pureLines.reduce(function(a, b) {
    return a.concat(b.split(" "));
  }, []);

  this.uniqueWords = this.words.filter(function(value, index, self) {
    return self.indexOf(value) === index;
  });

  // object with count of each word: http://stackoverflow.com/a/11649321/1417584
  this.count = {};
  for (var i = 0, j = this.words.length; i < j; i++) {
    this.count[this.words[i]] = (this.count[this.words[i]] || 0) + 1;
  }
}



function setOutputText(val) {
  outputTextbox = document.getElementById("outputTextbox");
  outputTextbox.value = val;
}

function REload() {
  location.reload();
}
// E N D   L E G A C Y

GuiController = function(){

  return{ }
}();
