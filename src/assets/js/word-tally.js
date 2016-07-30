$(document).ready(function() {

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

		(function(){
			var iWordsCount = words.length; // count w/o duplicates
			for (var i=0; i<iWordsCount; i++) {
				var word = words[i];
				$('#results').append('<li><span>' + word.text + '</span><span>' + word.frequency + '</span></li>');
			}

			$('#total_words').text(iWordsCount);
		}());

	}

	$('#run_it').on('click', function() {

		countWords();



	});

	// var the stuff
	var resultsContainer = $('#results');
	var wordSource = $('#word_source');
	var totalWords = $('#total_words');

	function reset() {
		resultsContainer.html('');
		wordSource.val('');
		totalWords.text('');
	}

	$('.reset').on('click', function() {
		reset();
	});















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
