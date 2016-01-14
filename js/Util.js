Util = {};


// Todo
// - Onload
// - Write to specified file in a lib
// - list files in fileBrowser
// - onclick display file
// - search files spec lib
// - list lib
// - choose notebook location

window,onload = function(){
	var fileBrowser = document.getElementById("fileBrowser");
	for (var i = 0; i < Util.fs.getNotes("shakespeare").length; i++) {
		var note = Util.fs.getNotes("shakespeare")[i];
		var li = document.createElement("li");
		var strong = document.createElement("strong");
		strong.appendChild(document.createTextNode(note));
		li.appendChild(strong);
		fileBrowser.appendChild(li);
	};
}

// G E N E R A L   S T U F F
Util.gen = function(){

	function makeIterator(array){
	    var nextIndex = 0;
	    
	    return {
	       next: function(){
	           return nextIndex < array.length ?
	               {value: array[nextIndex++], done: false} :
	               {done: true};
	       }
	    }
	}

	// Note mixed arrays might goof it up (eg 2="2"). Unless you dig that sorta thing
	function unique(array) {
	    var seen = {};
	    return array.filter(function(item) {
	        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
	    });
	}

	return{ makeIterator:makeIterator, unique:unique }
}();

// F I L E   S T U F F
Util.fs = function(){

	// Internal Variables

	var fs = require('fs');
	var path = require('path');

	var root = __dirname;
	var notebook = "notebook";

	// Internal Functions
	
 	function getDirectories(srcpath) {
	  return fs.readdirSync(srcpath).filter(function(file) {
	    return fs.statSync(path.join(srcpath, file)).isDirectory();
	  });
	}

 	function getFiles(srcpath) {
		var files = fs.readdirSync(srcpath);
		return files.filter(function(file) {
		    return !fs.statSync(path.join(srcpath, file)).isDirectory();
		  });
	}

 	function getFileContent(srcpath) {
		return fs.readFileSync(srcpath, {encoding: 'utf-8'});
	}

	// External Functions

	var getLibraries = function() {
		var notebookDir = path.join(root,notebook);
		return getDirectories(notebookDir);
	}

	var getNotes = function(library) {
		var libraryDir = path.join(root,notebook,library);
		return getFiles(libraryDir);
	}

	var getNoteContent = function(library, note) {
		var noteDir = path.join(root,notebook,library,note);
		return getFileContent(noteDir);
	}

	return{getLibraries:getLibraries, getNotes:getNotes, getNoteContent:getNoteContent}
}();

// T E X T   S T U F F
Util.txt = function(){

	// Internal Variables
	var regexIgnoreLine = /\n*#.*/g; 
	// var regexIgnoreChar = /[ \" \, \. \- \! \? \* \[ \] \d ]/g;
	var regexIgnoreChar = /[^A-Za-z \s']/g;

	// Internal Functions
		
	// External Functions
	var clean = function(txt) {
		txt = txt.replace(regexIgnoreLine,"");
		txt = txt.replace(regexIgnoreChar,"");
		txt = txt.replace(/[\n\s\t]+/g," ");
		return txt;
	}

	// Takes an array of strings and removes duplicates
	// var unique = function(txtArray) {
	// 	var uniq = txtArray.reduce(function(a,b){
	// 	    if (a.indexOf(b) < 0 ) a.push(b);
	// 	    return a;
	//   	},[]);
	//   	return uniq;
	// }

	var debugOut = function(txt) {
		var debug = document.getElementById("debug");
		debug.textContent = txt;
	}

	var getInputText = function() {
		// var input = document.getElementById("inputTextbox");
		// return input.value;
		var editor = ace.edit('baseline-pane');
		return editor.getValue();
	}

	var setOutputText = function(txt) {
		// var output = document.getElementById("outputTextbox");
		// output.value = txt;
		var editor = ace.edit('baseline-pane');
		editor.setValue(txt);		
	}

	var setInputText = function(txt) {
		var input = document.getElementById("inputTextbox");
		input.value = txt;
	}

	return{ clean:clean, debugOut:debugOut, getInputText:getInputText, setOutputText:setOutputText, setInputText:setInputText}
}();

// T E S T 
// var libs =  Util.fs.getLibraries();
// var lib = libs[3];
// var notes = Util.fs.getNotes(lib);
// var note = notes[0];
// console.log(Util.fs.getNoteContent(lib,note));
