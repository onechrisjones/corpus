DictionaryBase = function(){
	// Internal Variables
	var title = "Dictionary Base";
	var dictionary = "";
	var sections = "abcdefghijklmnopqrstuvwxyz".split("");
	var lolw = 20; // Length of Longest Word (+4)

	// Internal Functions
	function formatLine(word) {
		var padding = lolw-word.length;
		var spaaace = (new Array(padding + 1)).join(" ");
		console.log("a"+word+spaaace+"b");
		return "**"+word+"**"+spaaace+":= *PoS* The Definition"+"\n\n";
	}

	function formatSection(section) {
		return "### "+section.toUpperCase()+"\n\n";
	}

	function formatTitle() {
		return "# "+title+"\n\n";
	}

	function getWords() {
		var raw = Util.txt.getInputText();
		var cleanText = Util.txt.clean(raw);
			cleanText = cleanText.toLowerCase();
			cleanText = cleanText.replace(/[\t\s\n]/g," ");
			cleanText = cleanText.replace(/[ ]{2,}/g," ");
		var words = cleanText.split(" ");
			words = words.sort();
		return Util.gen.unique(words);
	}

	function getLongestWord() {
		return getWords().reduce(function (a, b) { return a.length > b.length ? a : b; });
	}

	// External Functions
	var exe = function(){
		lolw = getLongestWord().length+4;
		dictionary = formatTitle();

		var words = getWords();
		var sectionIndex = 0;
		// Build the dictionary
		for (var i = 0; i < words.length; i++) {
			var firstChar = words[i][0];
			if(sections[sectionIndex]!=firstChar || (sections[sectionIndex]==firstChar && sectionIndex==0 && i==0)) { // Special case for section A
				sectionIndex = sections.indexOf(firstChar)>-1 ? sections.indexOf(firstChar) : sectionIndex; // how to handle index==-1?
				dictionary += formatSection(sections[sectionIndex]);
				dictionary += formatLine(words[i]);
			}
			else {
				dictionary += formatLine(words[i]);
			}
			// if(sections[sectionIndex]==firstChar && !(sectionIndex==0 && i==0)) { // Special case for section A
			// 	dictionary += formatLine(words[i])+"\n";
			// }
			// else {
			// 	if(sections.indexOf(firstChar)>-1) {
			// 		sectionIndex = sections.indexOf(firstChar);
			// 		dictionary += formatSection(sections[sectionIndex])+"\n";
			// 		dictionary += formatLine(words[i])+"\n";
			// 	}
			// }
		};

		Util.txt.setOutputText(dictionary);
		dictionary = "";
		lolw = 20;
	}

	var demo = function() {
		Util.txt.debugOut( getWords() );
	}
  	return{ exe:exe }
}();

// DictionaryBase.exe();
