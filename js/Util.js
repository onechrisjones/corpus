Util = {};


// Todo
// - Onload
// - Write to specified file in a lib
// - list files in fileBrowser
// - onclick display file
// - search files spec lib
// - list lib
// - choose notebook location

// O N L O A D   S T U F F
window,onload = function(){
	var files = Util.fs.getNotes("shakespeare");
	Util.txt.setFileBrowser(files);
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

	function getLibraries() {
		var notebookDir = path.join(root,notebook);
		return getDirectories(notebookDir);
	}

	function getNotes(library) {
		var libraryDir = path.join(root,notebook,library);
		return getFiles(libraryDir);
	}

	function getNoteContent(library, note) {
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
	function clean(txt) {
		txt = txt.replace(regexIgnoreLine,"");
		txt = txt.replace(regexIgnoreChar,"");
		txt = txt.replace(/[\n\s\t]+/g," ");
		return txt;
	}

	function debugOut(txt) {
		var debug = document.getElementById("debug");
		debug.textContent = txt;
	}

	function getInputText() {
		// var input = document.getElementById("inputTextbox");
		// return input.value;
		var editor = ace.edit('baseline');
		return editor.getValue();
	}

	function setOutputText(txt) {
		// var output = document.getElementById("outputTextbox");
		// output.value = txt;
		var editor = ace.edit('analysis');
		editor.setValue(txt);
	}

	function setInputText(txt) {
		var editor = ace.edit('baseline');
		editor.setValue(txt);
	}

	function setFileBrowser(files) {
		var fileBrowser = document.getElementById("file-browser");
		for (var i = 0; i < files.length; i++) {
			var note = files[i];
			var li = document.createElement("li");
			var strong = document.createElement("strong");
			strong.appendChild(document.createTextNode(note));
			li.appendChild(strong);
			li.setAttribute("class","collection-item waves-effect");
			fileBrowser.appendChild(li);
		};
	}

	return{ clean:clean, debugOut:debugOut, getInputText:getInputText, setOutputText:setOutputText, setInputText:setInputText, setFileBrowser:setFileBrowser }
}();

// T E S T
// var libs =  Util.fs.getLibraries();
// var lib = libs[3];
// var notes = Util.fs.getNotes(lib);
// var note = notes[0];
// console.log(Util.fs.getNoteContent(lib,note));
