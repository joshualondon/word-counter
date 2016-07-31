
// results container - to display after counting words
var resultsContainer = $('#results');

// textarea source - main entry
var wordSource = $('#word_source');

// used to display word count
var totalWords = $('#total_words');

// reset all the things
function reset() {
	resultsContainer.html('');
	wordSource.val('');
	totalWords.text('');
}

function resetResults() {
	resultsContainer.html('');
}




function countWords() {

	var words = (function(){

		var sWords = $('#word_source').val().toLowerCase().trim().replace(/[,;.]/g,'').split(/[\s\/]+/g).sort();
		var iWordsCount = sWords.length; // count w/ duplicates

		// array of words to ignore
		var ignore = ['and','the','to','a','of','for','as','i','with','it','is','on','that','this','can','in','be','has','if'];
		ignore = (function(){
			var o = {}; // object prop checking > in array checking
			var iCount = ignore.length;
			for (var i=0;i<iCount;i++){
				o[ignore[i]] = true;
			}
			return o;
		}());

		var counts = {}; // object for math
		for (var i=0; i<iWordsCount; i++) {
			var sWord = sWords[i];
			if (!ignore[sWord]) {
				counts[sWord] = counts[sWord] || 0;
				counts[sWord]++;
			}
		}

		var arr = []; // an array of objects to return
		for (sWord in counts) {
			arr.push({
				text: sWord,
				frequency: counts[sWord]
			});
		}

		// sort array by descending frequency | http://stackoverflow.com/a/8837505
		return arr.sort(function(a,b){
			return (a.frequency > b.frequency) ? -1 : ((a.frequency < b.frequency) ? 1 : 0);
		});

	}());


	// -- function to send the results processed even off to ga
	function sendGAResultsProcessed(event) {

		ga('send', 'event', 'Results', 'Processed', 'Count function processed', {
			'hitCallback': function() {
				console.log('sent to GA!');
			}
		});
	}
	sendGAResultsProcessed(event);





	(function(){
		var iWordsCount = words.length; // count w/o duplicates
		for (var i=0; i<iWordsCount; i++) {
			var word = words[i];
			$('#results').append('<li><span>' + word.text + '</span><span>' + word.frequency + '</span></li>');
		}

		$('#total_words').text(iWordsCount);
	}());

	console.log('countWords fired')
}









$(document).ready(function() {

	$('#run_it').on('click', function() {
		resetResults();
		countWords();
	});

	$('.reset').on('click', function() {
		reset();
	});





	if (navigator.appVersion.indexOf("Mac")!=-1) OSName="1";
	if (navigator.appVersion.indexOf("Win")!=-1) OSName="2";
	if (navigator.appVersion.indexOf("X11")!=-1) OSName="3";
	if (navigator.appVersion.indexOf("Linux")!=-1) OSName="4";

	if (OSName == 1) {
		wordSource.attr('placeholder', 'CMD + V or begin typing');
		console.log('you are on a mac');
	}

	if (OSName == 2) {
		wordSource.attr('placeholder', 'Ctrl + V or begin typing');
		console.log('you are on a pc');
	}






	// export results as CSV
	function generateCSV() {
		var iWordsCount = words.length; // count w/o duplicates
		for (var i=0; i<iWordsCount; i++) {
			var word = words[i];
			console.log(word.text, word.frequency);

		}
	}

	$('.download-csv').on('click', function() {
		generateCSV();
	});


});
