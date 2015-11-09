$(document).ready(function() { 

	//Load Host Snapshots
	function loadSnapshots(){
		var data;
		$.getJSON("hostsnapshot.json", function(data) {
			$(".loadingTable").remove();
			var tableHeading = '<tr><th>Datetime</th><th>Description</th><th> </th></tr>';
			$("#hostSnapshotsTable").append(tableHeading);
			$.each(data.snapshots, function(i,snapshot) {
				var datetime,name;
				datetime = snapshot['datetime'];
				name = snapshot['name'];
				key = snapshot['key'];
				var newEntry = '<tr class="shapshotrow" id="' + key + '" key="' + key + '"><td class="uk-width-2-10">' + datetime + '</td><td class="uk-width-6-10">' + name + '</td><td class="uk-margin-remove"><a class="snapshotdelbutton uk-button uk-button-small uk-button-danger uk-margin-right">Delete</a><a class="snapshotrestorebutton uk-button uk-button-small uk-button-success">Restore</a></td></tr>';
				if (name && datetime) { $("#hostSnapshotsTable").append(newEntry); }
			});
		});
	}	
	
	$('#hostSnapshots').on('click', '.snapshotrestorebutton', function(){ 
		var key = event.target.parentNode.parentNode.getAttribute("key");
		UIkit.modal.confirm("Are you sure you want to restore?", function(){
			UIkit.notify({
				'message':'Restoring Snapshop.',
				'status':'success',
				'timeout':3000,
				'pos':'top-center'
			});
			//Call Restore Snapshot
		});
	});

	$('#hostSnapshots').on('click', '.snapshotdelbutton', function(){ 
		var key = event.target.parentNode.parentNode.getAttribute("key");
		UIkit.modal.confirm("Are you sure you want to delete?", function(){
			$("#"+ key).remove();
			UIkit.notify({
				'message':'Snapshop Removed',
				'status':'danger',
				'timeout':3000,
				'pos':'top-center'
			});
			//Call Delete Snapshot
		});
	});

	//Clear Cached Snapshot Name
	$('#newSnapshotModal').on({
		'show.uk.modal': function(){
			document.getElementById("newSnapshotName").value = "";
		}
	});
	
	$("#saveNewSnapshotButton").click(function(){

		var modal = UIkit.modal("#newSnapshotModal");
		var newSnapshotName = $("#newSnapshotName").val();
		if( newSnapshotName ) {
			var date = new Date();
			var year = date.getFullYear().toString();
			var month = date.getMonth() + 1;
			if (month < 10) { month = '0' + month.toString(); } else { month = month.toString(); }
			var day = date.getDate().toString();
			if (day < 10 ) { day = '0' + day.toString(); } else { day = day.toString(); }
			var hours = date.getHours().toString();
			if (hours < 10 ) { hours = '0' + hours.toString(); } else { hours = hours.toString(); }
			var minutes = date.getMinutes().toString();
			if (minutes < 10 ) { minutes = '0' + minutes.toString(); } else { minutes = minutes.toString(); }
			var seconds = date.getSeconds().toString();
			if (seconds < 10 ) { seconds = '0' + seconds.toString(); } else { seconds = seconds.toString(); }
			var key = year + month + day + hours + minutes + seconds;
			var datetime = month + "/" + day + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
			var newEntry = '<tr class="shapshotrow" id="' + key + '" key="' + key + '"><td class="uk-width-2-10">' + datetime + '</td><td class="uk-width-6-10">' + newSnapshotName + '</td><td class="uk-margin-remove"><a class="snapshotdelbutton uk-button uk-button-small uk-button-danger uk-margin-right">Delete</a><a class="snapshotrestorebutton uk-button uk-button-small uk-button-success">Restore</a></td></tr>';
			if (datetime) { 
				$("#hostSnapshotsTable").append(newEntry);
				modal.hide();
				UIkit.notify({
					'message':'Creating Snapshop.',
					'status':'success',
					'timeout':3000,
					'pos':'top-center'
				});
			//Call Create Snapshot
			} else {
				UIkit.notify({
					'message':'A snapshot name is required',
					'status':'danger',
					'timeout':3000,
					'pos':'top-center'
				});
			}
		}
	});
	
	loadSnapshots();
});