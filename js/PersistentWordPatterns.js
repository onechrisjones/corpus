PersistentWordPatterns = function(){
	
	var title = "Persistent Word Patterns";
	var lomc = 5; // length of max count
	var buffer = 4; // space between count and combo

	// Returns an array of all sets of 'numberOfWords' words unique up to case
	function wordCombos(numberOfWords) {
		var cleanedText = getCleanText();
		var combos = [];
		var wordArray = cleanedText.split(" ");
		for (var i = numberOfWords-1; i < wordArray.length; i++) {
			var combo = "";
			for (var j = 0; j < numberOfWords; j++) {
				combo = combo.length>0 ? wordArray[i-j]+" "+combo : wordArray[i-j];
			};
			combos.push(combo);
		};
		return Util.gen.unique(combos);
	}

	// Consecuative duplicates of the same thing the second one isn't counted
	// this is because we are looking for a prepended and appended space char
	// this is because we want find words and not ends/beginnings of words
	function countOccurances(wordCombo) {
		var cleanedText = getCleanText(); 
		var pattern = new RegExp(" "+wordCombo+" ",'gi');
		var count = (cleanedText.match(pattern) || []).length;
		return count;
	}

	function getCleanText() {
		var cleanedText = Util.txt.getInputText();
		cleanedText = Util.txt.clean(cleanedText);
		cleanedText = cleanedText.toLowerCase();
		return cleanedText;
	}

	function formatLine(wordCombo,count) {
		var padding = locm-count.toString().length;
		var spaaace = (new Array(padding + 1)).join(" ");
		var buf = (new Array(buffer + 1)).join(" ");
		return " * "+spaaace+count+buf+wordCombo;
	}

	function formatSection(section)  {
		return "### "+section;
	}

	function formatTitle() {
		return "# "+title;
	}
	
	function exe() {
		var results = formatTitle()+"\n";
		var numWords = 2;
		while(true) {
			var combos = wordCombos(numWords);
			var maxCount = 0;
			var sets = [];
			for (var i = 0; i < combos.length; i++) {
				var count = countOccurances(combos[i])
				maxCount = count>maxCount ? count : maxCount;
				if(count>1) {
					sets.push([count,combos[i]]);
				}
			};
			// Nothing interesting left to find, break
			if(maxCount<2){ break; }
			locm = maxCount.toString().length;

			var formattedLines = [];
			for (var i = 0; i < sets.length; i++) {
				var count = sets[i][0];
				var combo = sets[i][1];
				formattedLines.push( formatLine(combo,count) );
			};

			formattedLines = formattedLines.sort();
			formattedLines = formattedLines.join("\n");

			results += formatSection(numWords)+"\n";
			results += formattedLines + "\n";

			numWords += 1;
		}
		Util.txt.setOutputText(results);
	}

  	return{ exe:exe }
}();
