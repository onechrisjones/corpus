PersistentWordPatterns = function(){
	
	var title = "Persistent Word Patterns";
	var lomc = 5; // length of max count
	var buffer = 4; // space between count and combo

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
		// return combos;
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
		// var cleanedText = "countOccurances I will Act II Scene II I will I will I will I will I will I will I will I will I will I will I will I will I will I will I will I will I will I will tell you why so shall my anticipation prevent your so discovery and your so secrecy to the king and queen moult no feather I have of latebut wherefore I know notlost all my mirth forgone all custom of exercises and indeed it goes so heavily with my disposition that this goodly frame the earth seems to me a sterile promontory this most excellent canopy the air look you this brave o'erhanging firmament this majestical roof fretted with golden fire why it appears no other thing to me than a foul and pestilent congregation of vapours What a piece of work is a man how noble in reason how infinite in faculty in form and moving how express and admirable in action how like an angel in apprehension how like a god the beauty of the world the paragon of animals And yet to me what is this quintessence of dust man delights not me no nor woman neither though by your so smiling you seem to say so"
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

	function demo() { alert("PWP works!"); }

  	return{ exe:exe }
}();
