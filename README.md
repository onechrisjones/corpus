
1. Write stories in a 'text editor' interface
2. Link media you transcribed stories from
3. Store the stories... Multiple stories
4. Organize the stories with 'tags' (really generic, like nvAlt tags... or possibly just text based hashtags?)
5. Dictionary building help
6. Profiling scripts


1.1 lots of caveats here, but this should feel like a text editor... Options to show invisibles, line numbering, and phonetic character upport should be baked in.

1.2 should probably be able to display multiple text files in the same window if multiple files are selected... Some sort of ui seperator between them in the window.

1.3 split view horizontal or vertical... For stuff like looking at a dictionary doc and a group of stories simultaneously...

2.1 linking or embedding media... Interacting with media... These features can get really involved, so keep it minimal, especially initially.

3.1 okay, storing the stories should be done with just plain text in a folder somewhere... User chooses the folder on his device or dropbox, whatever... and it 'just works'. Maybe all linked media needs to be in that folder too... I dunno how that'll work yet. No db trash though... Too complicated, and not cross platform.

3.2 versioning! Stories will need to be versioned... As we make changes, iron out kinks in the alphabet... We want to look at the decisions weve made in the past, and be able to go back to a previous way things were done... This might be a cross-platform nightmare... Not sure how this works.

4.1 i like the idea of some sort of standard spot on on all the story.md files for meta data...

5.1 initially, just run a script and generate an md 'dictionary' file (all individual words in alphabetical order, obvs), and then just version that... The program will update it, make new ones when stories are added to the corpus... Selecting certain stories (manually, or by #tag(s)...), you can make a dictionary report from just those selected stories (for example, maybe you tag all your stories 'done' once you've checked them with a language helper... And you want the most accurate dictionary possible, so you'd select only '#done' stories, and generate a dictionary report from those. Obviously, as you get #done with more stories, you'll update the dictionary, adding any new words to it.)

5.2 adding 'gloss' or 'definition' information will be tricky, and gets dangerously close to lexicography. I say we keep this really simple, and let people get as creative as they want behind the 'head-word'. The potential problem here might be updating a dictionary file after any definitions have been added... Maybe the 'update dictionary' script could be smart enough to just add new words in the appropriate spots, and not mess with any definition information (obviously, dictionary lines will follow a logical structure, and start with the 'head-word', maybe in md **bold**, then maybe some separator, like a 'dash' maybe, and then any user added definition/gloss information.) I think this should be kept as simple as possible... No lexical database stuff, just an alphabetical list of everything separated by punctuation or whitespace (complex forms as entries). Just versioned text (MARKDOWN!) files. The whole thing is just versioned text files, and some scripts that make can pump out more versioned text files... 

5.3 i really like the idea of browsing the dictionary though, and displaying (in a pane or something) a list of all the instances of that word in your corpus... (Find all in 'project' basically). Then a 'replace all in project' too... Maybe there could be a special kind of 'dictionary based' find and replace thing... But it is useful for correcting typos, unifying spelling across work from multiple typists or language learners... But it is valuable beyond the scope of just words too... So definitely gotta have a really cool find and replace funtionality.... The versioning is super handy here too, in case you make mistakes.

5.4 grep and a more user friendly find and replace situation (see: regexRX and coda for cool examples), always just 'find all' and allow users to manually choose instances to make replacements if they want.

6.1 it'd be so tight to be able to mine your corpus for all sorts of frequency information, anything really. Really killer find/replace would be enough here, but the GUI would need to be right. We might want to see how often a letter ends a word, co-occurs with another letter, how often int occurs in the corpus... But this doesnt necessarily need to be a tool just for this little niche situation... If there was an atom package that made a few UI tweaks, had a few little extra bells and whistles... Could be perfect!


***

Glossa Goals
====

##Good Linguistics software is going to help Linguists/Lexicographers make Dictionaries/Lexicons of languages.

We basically do this by entering 'data' - like dictionary 'entries' (i.e. cat = gato ... but there is lot's of meta data too, right? That is a noun, there might be conjugations... etc.). Lexicons do the same thing as dictionaries, but at a deeper level. For example, '-ing' is a MORPHEME in english... the smallest unit of meaning. Morphemes, too have lot's of metadata associated with them, and that all needs to get figured out, recorded, and sifted through. 'Runn-ing' is combination of 2 morphemes, a verb root and an affix (in this case, a suffix) [(run)+(-ing)]. 

...But we also need to enter longer 'texts', (i.e. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu ligula in mi vulputate gravida. Aliquam orci purus, cursus vitae aliquet quis, accumsan at sapien. Morbi arcu quam, dictum ac placerat non, blandit luctus ante. Donec eget libero nec velit faucibus ultricies vel a dolor. Curabitur ullamcorper posuere turpis non rutrum.) and break those down grammatically/morphologically. Typically this is done with some 'interlinearization', and involves telling your software where all the morpheme breaks are, and filling out all the pertinent info for each morpheme... kind, what other kinds it attaches to... etc. 

Currently, the software standards now are 'FLEx', and... well... nothing else. this is SIL's Application for Windows/.NET, and is clunky and old... but does work. The app is free, and i think it is even open source! A Port to mac could be developed (quickly, even... with some good software engineers who know the mono framework). SIL has done a lot of work in the field of linguistics, and has developed all sorts of standards and software tools. Currently SILs apps kick out all sorts of XML files for data portability, and I think they have lots of documentation on how all that stuff gets put together. 

My friend and I came up with a preliminary name for this piece of software... Glossa. Below, Is what I have been thinking through in terms of Glossa's Workflow... I can't really speak to the 'DB Schema' or whatever - all that data management stuff it tough for me to wrap my head around as I don't have the vocabulary to keep up in those kinds of discussions!

##But it is not that simple

So even if #1 was simple enough, it gets more complicated than that. Enter... IPA.

So 'NEW' Languages (like the one I am working in) don't even have alphabets and literacy yet... that is one of the reasons we work in these languages. We still need to enter data, and stary putting all those Lexicon pieces together, but to add another dimension of difficulty, We need to enter all the data in IPA... basically the pronunciations of everything. 

I'd wikipedia that if you aren't familiar with it... VERY important to our kind of work... but in a nutshell, IPA is a way to record every sound that comes out of a human beings mouth - with your keyboard. All linguists have to know this stuff, and with IPA, you can 'write' down ANY language... though it wouldn't necessarily be readable. 

We enter all those texts (transcriptions of verbal interactions...) and dictionary entries in IPA, and then have to figure out which characters (a.k.a. 'sounds') or groups of sounds deserve a letter in a brand new alphabet. Basically, we need to find all these certain patterns in the 'corpus' of data, and essentially strip them out... leaving behind only the unpredictable stuff that is going to carry meaning in the language. This is REALLY important, as good decisions made here are going to influence the difficulty of learning to read and write this language in the future. This all has to be unicode, because we're not talking just roman character sets... 'New' languages usually get orthographies in their country's National Charset... so new languages in Thailand will get alphabets in Thai script... and selection of characters is important too, as it will help your people groups to learn literacy in the national language as well. LOTS to think about!

So glossa needs to help us move from phonetics, to an alphabet, to a lexicon, and then maybe later, on to a literacy program. More details below, but I think that just about scratches the surface of what this software needs to do!

Proposed Glossa Human and Machine Process Workflow
====

1. **Make Data** Enter the texts (and/or the tabular data?)
	
	* **UI for data entry needs to FEEL like writing code** to make experience more like you are entering data, and less like you are 'word-processing'. Monospace (UNICODE!) fonts, maybe line numbers, 
	* **UTF/keyboard entry... 'TAB' for field change, 'shift-TAB' for 'New Entry'? (maybe a button UI element as well for this?)** _Text entry field must be smart. It should recognize IPA, and realize that what you are entering is RAW phonetic data, yet to be processed. This will affect where that data gets stored (phonetics, not phonemics or orthographic). 'shift-TAB' entries should probably have some subtle visual cue to the user that when they have a new blank screen now, they ENTERED their previous data, not deleted it or something._
	* **Every time a 'space' is entered, 'ADD' the previous 'word' to the 'DATABASE' in the right place (maybe do this upon 'submission'/'shif-TAB'?)** _each 'entry' will need to be gone over later, and broken down into morphemes, etc... but maybe the markup will help with that? Either way, each of these 'entries' is significant, in that it represents at least a morpheme, and at most, a possible combination of them._ 
	* **IDEA! but developing a new standard?** _Maybe develop an 'IPA+' kind of markup to help Glossa figure out how to enter data for you? I am thinking dashes and pipes and underscores to help guess at morpheme breaks and types of morphemes (affixes, clitics, stems, roots...)_
	* **Probably need an 'ATTACH' button...** _ability to attach/reference media files because much of the data added will be transcribed from them if not transcribed LIVE. Maybe not video, but maybe if you add a video file, the app will automatically strip the audio out, and try to enhance for vocals clarity. Maybe even add photos? That could be nice for kicking out lexicons and dictionaries..._
	* **Audio... but NO 'Complex' UI!** _some transcription specific audio controls, like speed adjust, back 2, 5, 10 seconds... this is obviously only necessary IF there is an attached media file. _
	* **IDEA! but Complicated Data-wise** _maybe Glossa could even try to recognize where in the audio file you are transcribing, by noting when you type what while the user is scrubbing audio? then note that information for later reference?_
	* **Interlinearization... a staple of Linguistic Analysis!** _Upon a 'TAB' keyboard event, Glossa will graphically Interlinearize, and indicate another level of meaning to be added. Graphically, this should be done with some sort of contrast/color/focus shift (i.e. grey out the previously entered line, and while it is still visible, start entering data below it? For example, I entered an IPA utterance, now I would probably 'TAB' and start entering a 2nd language Gloss... or going 'word by word' and entering meaning for each)_
	* **AND... Add a new record.** _Upon a 'shift-TAB' event, all the data gets entered into the database to be combed through and further broken down and analyzed later. Some of these records might be long texts, some might be simply an utterance and then it's gloss in a second language... They SHOULD each be some unit defined at discourse-level._
	* **For Phonological Inventories and later Analysis** _Glossa needs also to be keeping count of every IPA symbol entered, so that it can later detail the inventory of the entire corpus, and we can see which IPA symbols are and aren't represented in the IPA data. Frequency, Inventory, and Distribution charts typically need to be checked out when doing Phonological Analysis._
	* **Glossa's Brains - Some shit she needs to know** _If entering IPA, then Glossa will need to also 'Know IPA'. This meaning, It will notice when characters are often used together, and maybe be able to propose why (Point of articulation similarities, Manner of articulation similarities)... This data will help develop alphabets for the unwritten languages. Filtering out useless and predictable patterns will help figure out which groups of sounds deserve a letter in an alphabet._
	**Alternative data entry methods** _Maybe CSV, XML, or SFM file imports? Not sure how all that works on the data storage side of things, but maybe users should be able to enter data entered in with applications like Toolbox and FLEx?_

2. **Define an Orthography** Analyze the Phonological data

	* **Okay, so all this data gets entered... BEAUTIFUL.** _Now What? Hopefully data entry was only slightly more complex (as far as UI is concerned at least) than something like NotationalVelocity. Next we get our hands dirty with data._
	* Ideally, we'd have some semblance of an alphabet before diving into morphology and grammar, but morphology and grammar can speak to some of the phonology as well, which makes determining what users should do next slightly difficult to figure out. I would guess a solution to this is that users do whatever they feel necessary in the Phonological AND Grammatical realms, and some sort of versioning system just hangs on to all the changes and decisions made
	* Now there are bunches of different kinds of entries in our database, and now we have to view those entries, and work with them... Complex UI problems to solve. 
	* How did all that data entered Complex Data organization problems to solve.

3. **Compose a Lexicon** Analyze Morphology and Grammar
	
	* **The database is your lexicon.** _It has every morpheme and every entered combination of morphemes in it by now. It has glosses, and it even has pronunciation (IPA) and maybe even audio/visual media associated with each entry. Back in the old days, you'd publish a book of that trash... now, maybe you leave it in a database, or kick it out to some .epub or other publishable format to boost your street cred._

4. **Discourse Analysis** Chart Discourse features of the language.

Ideas for ease of IPA Input on iPad
====

Bouncing this stuff back and forth a bit with some other linguists... 

The UI for doing IPA on iOS is going to be a bit of a tough nut to crack. MOST people, linguists or not, would be using thumbs more than anything to type on an iOS device. That is not optimal for longer transcriptions.

I am thinking that Glossa will need to do some gnarly stuff with remapping bluetooth keyboard input. That would help lots of people speed up transcription and typing. I am thinking this might be pretty easy... after initially mapping the soft keyboard.

However, actually remapping soft keyboard input is quite the UI problem to solve, and Apple hasn't even messed with it yet. Lots of thinking on this, and I think I have come to some conclusions.

1. IPA Chart access via a keyboard extension bar.
	* All the diacritics will need to be browsable, as regardless your keylayout, some of these won't be obvious or easy to find at all.
	* some of the consonants might also be kinda tough to find, browsable charts here a MUST
	* See http://mattt.me/2010/designing-an-ipa-keyboard-for-the-ipad/ 's Vowel entry idea... but I think that optimally, a 'tap-hold' electronic vowel synthesis/check could be integrated as well.
3. Predictive consonant suggestions
	* Basically, when you type a consonant, there's a palette with suggested/similar consonants (that consonant's "family"). If you press one of those, it replaces the-character-you-typed* (maybe more on that later!) with the one you selected. 
	* Maybe, as you make enough of these substitutions, Glossa will intelligently change the key layout, as it notices you aren't using certain keys/characters. 
	* UI for this could maybe use colors... as you use a character more and more often, the color of the suggested character could get redder and redder, until POP! It finds it's way into your keyboard, with some green or blue color, so that you notice it changed.
	* And 'edit mode' for your own keyboard manipulation should also be seriously considered... tap-hod your keyboard's KEYS, then they wiggle, and tapping them gives you a context menu allowing you to make changes to individual keys (i.e. undo a change Glossa automatically made, or work up your own personalized IPA keylayout, specific to you and the language you are transcribing.
	* 
4. Recognize official 'shorthands' for IPA... (Kirshenbaum, SAMPA, x-SAMPA)

