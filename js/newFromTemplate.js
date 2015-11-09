$(document).ready(function() {
	//Populate Templates
	function populateTemplates(){
		$("#templatePackages").html("");
		var data;
		$.getJSON("templates.json", function(data) {
			$.each(data.templates, function(i,template) {
				var name,key,icon,costm,costh,os,ram,cpu,storage,transfer,desc;
				name = template['name'];
				key = template['key'];
				icon = template['icon'];
				costm = template['costm'];
				costh = template['costh'];
				os = template['os'];
				ram = template['ram'];
				cpu = template['cpu'];
				storage = template['storage'];
				transfer = template['transfer'];
				desc = template['desc'];
				var newTemplate = '<div class="uk-width-1-3 uk-margin-top"><div class="uk-panel uk-panel-box uk-text-center templateselection" template="' + key + '"><p><img src="img/' + icon + '"></p><h3 class="uk-panel-title">' + name + '</h3><dl><dt>' + os + '</dt><dt>$' + costm + '<small>/MO</small></dt><dd>$' + costh + '<small>/hour</small><dd>' + ram + ' GB/ ' + cpu + ' CPU</dd><dd>' + storage + ' GB SSD</dd><dd>' + transfer + ' TB Transfer</dd></dl><p><small>' + desc + '</small></p></div></div>';
				if(name && key && costm && costh && ram && cpu && storage && transfer && icon && desc) { 
					$("#templatePackages").append(newTemplate); 
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
	//Update Profile Text
	function updateProfileText() {
		var newText;
		var thostName = $("#hostname").val();
		if (thostName == "") { thostName = "&nbsp;"; }
		var ttemplate = $("#template").val();
		if (ttemplate == "") {ttemplate = "&nbsp;"; }
		var tregion = $("#region").val();
		if (tregion == "") { tregion = "&nbsp;"; }
		newText = thostName + "&nbsp;&nbsp;" + ttemplate + "/" + tregion;
		$("#installprofile").html(newText);
	}
	//Create Server Handler
	function createServer() {
		var template = document.getElementById("template").value;
		var region = document.getElementById("region").value;
		var name = document.getElementById("hostname").value;
		if(template && region && name){
			UIkit.notify({'message':'<i class="uk-icon-check"></i> New Server Created','status':'success','timeout':3000,'pos':'top-center'});
			preparePage();
		} else if (!name) {
			UIkit.notify({'message':'<center>Please enter a valid hostname.</center>','status':'danger','timeout':2000,'pos':'top-center'});
		} else if (!template) {
			UIkit.notify({'message':'<center>Please choose a template.</center>','status':'danger','timeout':2000,'pos':'top-center'});
		} else if (!region) {
			UIkit.notify({'message':'<center>Please choose a datacenter.</center>','status':'danger','timeout':2000,'pos':'top-center'});
		} else {
			UIkit.notify({'message':'<center>Something Odd is Wrong</center>','status':'danger','timeout':2000,'pos':'top-center'});
		}
	}
	//Prepare the page
	function preparePage() {
		document.getElementById("hostname").value = "";
		document.getElementById("template").value = "";
		document.getElementById("region").value = "";
		populateTemplates();
		populateDatacenters();
	}
	//Draw The Page Initially
	preparePage();
	//Monitor and Modify Datacenter Selection Classes
	$('#datacenterPackages').on('click', '.regionselection', function(){
		$(".regionselection").removeClass("uk-panel-box-primary");
		$(this).addClass("uk-panel-box-primary");
		var newValue = $(this).attr('region');
		$("#region").val(newValue);
		updateProfileText();
		console.log("Server Region Changed to " + $("#region").val());
	});
	//Monitor and Modify Template Selection Classes
	$('#templatePackages').on('click', '.templateselection', function(){
		$(".templateselection").removeClass("uk-panel-box-primary");
		$(this).addClass("uk-panel-box-primary");
		var newValue = $(this).attr('template');
		$("#template").val(newValue);
		updateProfileText();
		console.log("Template Changed to " + $("#template").val());
	});
	//Monitor Hostname Field and Validate
	$("#hostname").change(function() {
		updateProfileText();
	});
	//Monitor Create Server Button
	$("#createserver").click(function(){
		createServer();
	});
});