Util = {};

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

Util.txt = function(){

	// Internal Variables

	var regexIgnoreLine = /\n#.*/g 
	var regexIgnoreChar = /[ \" \, \. \- \! \? \* \[ \] ]/g

	// Internal Functions
	
		
	// External Functions

	var cleanText = function(txt) {
		txt = txt.replace(regexIgnoreLine,"");
		txt = txt.replace(regexIgnoreChar,"");
		return txt;
	}

	var debugOut = function(txt) {
		var debug = document.getElementById("debug");
		debug.textContent = txt;
	}

	return{ cleanText:cleanText, debugOut:debugOut }
}();

// T E S T 
// var libs =  Util.fs.getLibraries();
// var lib = libs[3];
// var notes = Util.fs.getNotes(lib);
// var note = notes[0];
// console.log(Util.fs.getNoteContent(lib,note));
