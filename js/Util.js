Util = {};


// Todo
// - onclick display file
// - search files spec lib
// - list lib
// - choose notebook location

// O N L O A D   S T U F F
window,onload = function(){
	Util.gen.createEditor();

	Util.session.update();
}

// G E N E R A L   S T U F F
Util.gen = function(){

	var marked = require('marked');

	////////////////////////
	// External Functions //
	////////////////////////
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

	////////////////////////
	// Internal Functions //
	////////////////////////

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

	////////////////////////
	// External Functions //
	////////////////////////

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

	function saveNote(library,note,content) {
		var noteDir = path.join(root,notebook,library,note);
		writeFile(noteDir,content);
	}

	return{getLibraries:getLibraries, getNotes:getNotes, getNoteContent:getNoteContent, saveNote:saveNote}
}();

// T E X T   S T U F F
Util.txt = function(){

	// Internal Variables
	var regexIgnoreLine = /\n*#.*/g;
	// var regexIgnoreChar = /[ \" \, \. \- \! \? \* \[ \] \d ]/g;
	var regexIgnoreChar = /[^A-Za-z \s']/g;

	////////////////////////
	// Internal Functions //
	////////////////////////

	////////////////////////
	// External Functions //
	////////////////////////
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
		Util.gen.render(txt);
	}

	function setInputText(txt) {
		var editor = ace.edit('baseline');
		editor.setValue(txt);
	}

	function setFileBrowser(files) {
		var fileBrowser = document.getElementById("file-browser");
		fileBrowser.innerHTML = "";
		for (var i = 0; i < files.length; i++) {
			var note = files[i];
			var li = document.createElement("li");
			var strong = document.createElement("strong");
			strong.appendChild(document.createTextNode(note));
			li.appendChild(strong);
			li.onclick = function(y){ return function(){Util.session.setNote(y);} }(note);
			li.setAttribute("class","collection-item waves-effect");
			fileBrowser.appendChild(li);
		};
	}

	function setLibraryBrowser(libs) {
		var libBrowser = document.getElementById("library-browser");
		libBrowser.innerHTML = "";
		// libBrowser.onclick
		for (var i = 0; i < libs.length; i++) {
			var lib = libs[i];
			var li = document.createElement("li");
			li.appendChild(document.createTextNode(lib));
			li.setAttribute("class","collection-item");
			li.onclick = function(y){ return function(){Util.session.setLibrary(y);} }(lib);
			libBrowser.appendChild(li);
		};
	}

	return{ 
		clean:clean, debugOut:debugOut, getInputText:getInputText, setOutputText:setOutputText, 
		setInputText:setInputText, setFileBrowser:setFileBrowser, setLibraryBrowser:setLibraryBrowser }
}();

// S E S S I O N   S T U F F
// Getters and setters for session variables
Util.session = function(){

	var currentLib = "shakespeare";
	var currentNote = "hamlet.md";

	////////////////////////
	// Internal Functions //
	////////////////////////
	
	// Refreshes everything to the current library and note
	function update() {
		console.log("Updating\t" + currentLib + "\t"+ currentNote);
		Util.txt.setLibraryBrowser( Util.fs.getLibraries() );
		Util.txt.setFileBrowser( Util.fs.getNotes(currentLib) );
		Util.txt.setInputText( Util.fs.getNoteContent(currentLib,currentNote) );
		console.log("Updated");
	}

	/////////////
	// Getters //
	/////////////
	
	function getLibrary() {
		return currentLib;
	}

	function getNote() {
		return currentNote;
	}

	/////////////
	// Setters //
	/////////////
	
	function setLibrary(lib) {
		if(lib!=currentLib) {
			currentLib = lib;
			var notes = Util.fs.getNotes(currentLib);
			var note = notes[0];
			setNote(note);
		}
	}

	function setNote(note) {
		currentNote = note;
		update();
	}
	
	return{ update:update,
		getLibrary:getLibrary, getNote:getNote,
		setLibrary:setLibrary, setNote:setNote }
}();

// O N C L I C K   L I S T E N E R S
Util.onlclick = function(){

	////////////////////////
	// External Functions //
	////////////////////////
	function setup() {

	}

	return{}	
}