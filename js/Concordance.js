// L E G A C Y

function concordance() {
  var corpus = new Corpus(),
    stream = [],
    formattedOutput = ["#New words, by story, with total count for this document"],
    n = 1;

  // Procedural style favored in the main processing loop, because it's basically stream processing
  for (i = 0; i < corpus.lines.length; i++) {
    // if the line has a MD header:
    if (corpus.lines[i].charAt(0) == "#") {
      formattedOutput.push(""); // spacer for MD headers
      formattedOutput.push("#".concat(corpus.lines[i]));
      n = 1;
    } else {
      var words = corpus.lines[i].split(" ");
      var newWords = words.filter(function(elem) {
        return stream.indexOf(elem) == -1;
      });
      newWords.forEach(function(elem) {
        var freq = corpus.count[elem];
        stream.push(elem);
        formattedOutput.push(n + ") " + elem + "     (" + freq + ")");
        n++;
      });

    }
  }

  var finalOutput = formattedOutput.join("\n");
  setOutputText(finalOutput);
}

// E N D   L E G A C Y

Concordance = function(){

  return{ }
}();