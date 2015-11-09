$(document).ready(function() {
	//Populate Packages
	function populatePackages(){
		$("#serverPackages").html("");
		var data;
		$.getJSON("packages.json", function(data) {
			$.each(data.packages, function(i,spackage) {
				var name,key,costm,costh,ram,cpu,storage,transfer;
				name = spackage['name'];
				key = spackage['key'];
				costm = spackage['costm'];
				costh = spackage['costh'];
				ram = spackage['ram'];
				cpu = spackage['cpu'];
				storage = spackage['storage'];
				transfer = spackage['transfer'];
				var newPackage = '<div class="uk-width-1-5"><div class="uk-panel uk-panel-box uk-text-center sizeselection" serversize="' + key + '"><h3 class="uk-panel-title">' + name + '</h3><hr><dl><dt>$' + costm + '<small>/MO</small></dt><dd>$' + costh + '<small>/hour</small><dt>' + ram + ' GB/ ' + cpu + ' CPU</dt><dt>' + storage + ' GB SSD</dt><dt>' + transfer + ' TB Transfer</dt></dl></div></div>';
				if(name && key && costm && costh && ram && cpu && storage && transfer) { 
					$("#serverPackages").append(newPackage); 
				} else { return; }
			});
		});
	}
	//Populate Datacenters
	function populateDatacenters(){
		$("#datacenterPackages").html("");
		var data;
		$.getJSON("datacenters.json", function(data) {
			$.each(data.datacenters, function(i,datacenter) {
				var name,key,icon,note1,note2,note3;
				name = datacenter['name'];
				key = datacenter['key'];
				icon = datacenter['icon'];
				note1 = datacenter['note1'];
				note2 = datacenter['note2'];
				note3 = datacenter['note3'];
				var newDatacenter = '<div class="uk-width-1-5"><div class="uk-panel uk-panel-box uk-text-center regionselection" region="' + key + '"><p><img src="img/' + icon + '"></p><h3 class="uk-panel-title">' + name + '</h3><hr><dl><dd>' + note1 + '</dd><dd>' + note2 + '</dd><dd>' + note3 + '</dd><dl></div></div>';
				if(name && key && icon && note1 && note2 && note3) {
					$("#datacenterPackages").append(newDatacenter);
				} else { console.log("Error in Datacenters " + name + key + icon + note1 + note2 + note3); return; }
			});
		});
	}
	//Populate OS'
	function populateOS(){
		$("#osPackages").html("");
		var data;
		$.getJSON("os.json", function(data) {
			$.each(data.os, function(i,osp) {
				var name, key, icon, version, note1, note2;
				name = osp['name'];
				key = osp['key'];
				icon = osp['icon'];
				version = osp['version'];
				note1 = osp['note1'];
				note2 = osp['note2'];
				var newOS = '<div class="uk-width-1-4 uk-margin-top"><div class="uk-panel uk-panel-box uk-text-center osselection" os="' + key + '"><p><img src="img/' + icon + '"></p><h3 class="uk-panel-title">' + name + '</h3><hr><dl><dt>' + version + '</dt><dd>' + note1 + '</dd><dd><em>' + note2 + '</em></dd><dl></div></div>';
				if(name && key && icon && version && note1 && note2) {
					$("#osPackages").append(newOS);
				} else { return; }
			});
		});
	}
	//Populate Additional Options
	function populateOptions() {
		$("#optionPackages").html("");
		var data;
		$.getJSON("metaloptions.json", function(data) {
			$.each(data.options, function(i,option) {
				var name, key;
				name = option['name'];
				key = option['key'];
				var newOption = '<div class="uk-width-1-4"><label><input type="checkbox" class="uk-margin" name="' + key + '" id="' + key + '"> ' + name + ' </label></div>';
				if(name && key) {
					$("#optionPackages").append(newOption);
				} else { return; }
			});
		});
	}
	//Update Profile Text
	function updateProfileText() {
		var newText;
		var thostName = $("#hostname").val();
		if (thostName == "") { thostName = "&nbsp;"; }
		var tserverSize = $("#size").val();
		if (tserverSize == "") {tserverSize = "&nbsp;"; }
		var tregion = $("#region").val();
		if (tregion == "") { tregion = "&nbsp;"; }
		var tos = $("#os").val();
		if (tos == "") { tos = "&nbsp;"; }
		newText = thostName + "&nbsp;&nbsp;" + tserverSize + "/" + tregion + "/" + tos;
		$("#installprofile").html(newText);
	}
	//Create Server Handler
	function createServer() {
		var size = document.getElementById("size").value;
		var region = document.getElementById("region").value;
		var os = document.getElementById("os").value;
		var name = document.getElementById("hostname").value;
		if(size && region && os && name){
			UIkit.notify({'message':'<i class="uk-icon-check"></i> New Server Created','status':'success','timeout':3000,'pos':'top-center'});
			preparePage();
		} else if (!name) {
			UIkit.notify({'message':'<center>Please enter a valid hostname.</center>','status':'danger','timeout':2000,'pos':'top-center'});
		} else if (!size) {
			UIkit.notify({'message':'<center>Please choose a server size.</center>','status':'danger','timeout':2000,'pos':'top-center'});
		} else if (!region) {
			UIkit.notify({'message':'<center>Please choose a datacenter.</center>','status':'danger','timeout':2000,'pos':'top-center'});
		} else if (!os) {
			UIkit.notify({'message':'<center>Please choose an operating system.</center>','status':'danger','timeout':2000,'pos':'top-center'});
		} else {
			UIkit.notify({'message':'<center>Something Odd is Wrong</center>','status':'danger','timeout':2000,'pos':'top-center'});
		}
	}
	//Prepare the page
	function preparePage() {
		document.getElementById("hostname").value = "";
		document.getElementById("os").value = "";
		document.getElementById("region").value = "";
		populatePackages();
		populateDatacenters();
		populateOS();
		populateOptions();
	}
	//Draw The Page Initially
	preparePage();
	//Monitor and Modify Server Size Selection Classes
	$('#serverPackages').on('click', '.sizeselection', function(){
		$(".sizeselection").removeClass("uk-panel-box-primary");
		$(this).addClass("uk-panel-box-primary");
		var newValue = $(this).attr('serversize');
		$("#size").val(newValue);
		updateProfileText();
		console.log("Server Size Changed to " + $("#size").val());
	});
	//Monitor and Modify Datacenter Selection Classes
	$('#datacenterPackages').on('click', '.regionselection', function(){
		$(".regionselection").removeClass("uk-panel-box-primary");
		$(this).addClass("uk-panel-box-primary");
		var newValue = $(this).attr('region');
		$("#region").val(newValue);
		updateProfileText();
		console.log("Server Region Changed to " + $("#region").val());
	});
	//Monitor and Modify OS Selection Classes
	$('#osPackages').on('click', '.osselection', function(){
		$(".osselection").removeClass("uk-panel-box-primary");
		$(this).addClass("uk-panel-box-primary");
		var newValue = $(this).attr('os');
		$("#os").val(newValue);
		updateProfileText();
		console.log("Server OS Changed to " + $("#os").val());
	});
	//Monitor Create Server Button
	$("#createserver").click(function(){
		createServer();
	});
	//Monitor Hostname Field and Validate
	$("#hostname").change(function() {
		updateProfileText();
	});
});