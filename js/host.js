//Monitor Power Off
function btnPowerOff(){
	UIkit.modal.confirm("Are you sure you want to power off?", function(){
		UIkit.notify({
			'message':'Powering Server Off.',
			'status':'success',
			'timeout':3000,
			'pos':'top-center'
		});
		//Call Power Off Function
	});
}

//Monitor Power Cycle
function btnPowerCycle() {
	UIkit.modal.confirm("Are you sure you want to power cycle?", function(){
		UIkit.notify({
			'message':'Rebooting Server.',
			'status':'success',
			'timeout':3000,
			'pos':'top-center'
		});
		//Call Power Cycle Function
	});
}

//Monitor Destroy
function btnDestroy() {
	UIkit.modal.confirm("Are you sure you want to permanently destroy?", function(){
		UIkit.notify({
			'message':'Destroying Server.',
			'status':'danger',
			'timeout':3000,
			'pos':'top-center'
		});
		//Call Destroy Function
	});
}
//Connect to RDP Session
function btnRDP() {
	console.log("Connecting to RDP");
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

$(document).ready(function() {
	//Populate Host Information
	function populateHost(){
		$("#myhost").html("");
		//var requestURL = "api.php?call=host&hostkey=" + getUrlVars()["hostkey"];
        //        console.log(requestURL);
        //        $.getJSON(requestURL, function(host) {
		$.getJSON("host.json", function(host) {
			var hostname, key, os, size, datacenter, ipaddress;
			hostname = host['hostname'];
			key = host['key'];
			os = host['os'];
			size = host['size'];
			datacenter = host['datacenter'];
			ipaddress = host['ipaddress'];
                        console.log(hostname  + " " + key + " " + os + " " + size + " " + datacenter + " " + ipaddress);
			if(os.indexOf("indows") > -1) {
				var icon = "windows";
			} else {
				var icon = "linux";
			}
			var newHost = '<div class="uk-width-medium-3-4"><div class="uk-panel uk-panel-box-secondary host" key="' + key + '"><h3 class="uk-panel-title"><i class="uk-icon-' + icon + '"></i> ' + os +'</h3><hr><table class="uk-table"><caption>Server Details</caption><tbody><tr><td class="uk-width-1-2">IP Address</td><td class="uk-width-1-2">' + ipaddress + '</td></tr><tr><td class="uk-width-1-2">Status</td><td class="uk-width-1-2">Active</td></tr><tr><td class="uk-width-1-2">Server Size</td><td class="uk-width-1-2">' + size + '</td></tr><tr><td class="uk-width-1-2">Datacenter</td class="uk-width-1-2"><td>' + datacenter + '</td></tr></tbody></table></div></div>';				
			var newActions = '<div class="uk-width-medium-1-4 uk-margin-top" id="actionButtons"><a class="uk-button uk-button-warning uk-button-large uk-width-1-1 uk-clearfix uk-margin-top" id="powerOffButton" onclick="btnPowerOff()"><span class="uk-float-left"><i class="uk-icon-power-off"></i> Power Off</span></a><a class="uk-button uk-button-primary uk-button-large uk-width-1-1 uk-margin-top uk-clearfix" id="powerCycleButton" onclick="btnPowerCycle()"><span class="uk-float-left"><i class="uk-icon-refresh"></i> Power Cycle</span></a><a class="uk-button uk-button-danger uk-button-large uk-width-1-1 uk-margin-top uk-clearfix" id="destroyButton" onclick="btnDestroy()"><span class="uk-float-left"><i class="uk-icon-bomb"></i> Destroy</span></a><a class="uk-button uk-button-success uk-button-large uk-width-1-1 uk-margin-top uk-clearfix" id="rdpButton" onclick="btnRDP()"><span class="uk-float-left"><i class="uk-icon-desktop"></i> Remote Desktop</span></a></div>';
			if(hostname && os && size && datacenter && ipaddress) {
				$("#myhost").append(newHost);
				$("#myhost").append(newActions);
			} else { console.log("Error in Host " + hostname + " " + os + " " + size + " " +  datacenter + " " +  ipaddress + " " +  icon); return; }
			$("#hostNameHeading").html(hostname);
		});
	}
	//Draw Page
	populateHost();
});