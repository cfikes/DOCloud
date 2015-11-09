$(document).ready(function() { 

	//Load history for host
	function loadHistory(){
		var data;
		$.getJSON("hosthistory.json", function(data) {
			$("#loadingTable").remove();
			var tableHeading = '<tr><th>Datetime</th><th>Source</th><th>Action</th></tr>';
			$("#hostHistoryTable").append(tableHeading);
			$.each(data.entries, function(i,entry) {
				var datetime,source,action;
				datetime = entry['datetime'];
				source = entry['source'];
				action = entry['action'];
				var newEntry = '<tr><td class="uk-width-2-10">' + datetime + '</td><td class="uk-width-1-10">' + source + '</td><td class="uk-width-7-10">' + action + '</td></tr>';
				if (source && action && datetime) { $("#hostHistoryTable").append(newEntry); }
			});
		});
	}	
	
	loadHistory();
});