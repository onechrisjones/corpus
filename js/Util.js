Util = {};


// Todo
// - onclick display file
// - search files spec lib
// - list lib
// - choose notebook location

// O N L O A D   S T U F F
window,onload = function(){
	var libs = Util.fs.getLibraries();
	Util.txt.setLibraryBrowser(libs);

	var files = Util.fs.getNotes("shakespeare");
	Util.txt.setFileBrowser(files);

	Util.gen.createEditor();
}

// G E N E R A L   S T U F F
Util.gen = function(){

	var marked = require('marked');

	// External Functions
	function render(markdownText){
		var renderedHTML = marked(markdownText);
		var preview = document.getElementById('preview');
		preview.innerHTML = renderedHTML;
	}

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

	function createEditor(){
		// Set up ace editor
	  var editor = ace.edit('baseline');
	  editor.getSession().setMode("ace/mode/markdown");
		editor.on('change', function(){
			render(editor.getValue());
		});
		return editor;
	}
	
	return{ render:render, makeIterator:makeIterator, unique:unique, createEditor:createEditor }
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

	function writeFile(srcpath,content) {
		fs.writeFile( srcpath, content, function(err) {
		    if(err) {
		        return console.log(err);
		    }

		    console.log("The file was saved!");
		});
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

	function writeNote(library,note,content) {
		var noteDir = path.join(root,notebook,library,note);
		writeFile(noteDir,content);
	}

	return{getLibraries:getLibraries, getNotes:getNotes, getNoteContent:getNoteContent, writeNote:writeNote}
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
		var editor = ace.edit('baseline');
		return editor.getValue();
	}

	function setOutputText(txt) {
		// var editor = ace.edit('analyze');
		// editor.setValue(txt);
		Util.gen.render(txt);
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

	function setLibraryBrowser(libs) {
		var libBrowser = document.getElementById("library-browser");
		for (var i = 0; i < libs.length; i++) {
			var lib = libs[i];
			var li = document.createElement("li");
			li.appendChild(document.createTextNode(lib));
			li.setAttribute("class","collection-item");
			libBrowser.appendChild(li);
		};
	}

	return{ 
		clean:clean, debugOut:debugOut, getInputText:getInputText, setOutputText:setOutputText, 
		setInputText:setInputText, setFileBrowser:setFileBrowser, setLibraryBrowser:setLibraryBrowser }
}();

// T E S T
// var libs =  Util.fs.getLibraries();
// var lib = libs[3];
// var notes = Util.fs.getNotes(lib);
// var note = notes[0];
// console.log(Util.fs.getNoteContent(lib,note));
