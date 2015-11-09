$(document).ready(function() {
	//Populate Datacenters
	function populateHosts(){
		$("#myhosts").html("");
		var data;
		$.getJSON("mymetal.json", function(data) {
			$.each(data.hosts, function(i,host) {
				var hostname, key, os, size, datacenter, ipaddress;
				hostname = escape(host['hostname']);
				key = host['key'];
				os = escape(host['os']);
				size = escape(host['size']);
				datacenter = host['datacenter'];
				ipaddress = escape(host['ipaddress']);
				if(os.indexOf("indows") > -1) {
					var icon = "windows";
				} else {
					var icon = "linux";
				}
				var newHost = '<div class="uk-width-medium-1-2"><div class="uk-panel uk-panel-box uk-panel-box-secondary uk-panel-hover host" key="' + key + '"><h3 class="uk-panel-title"><i class="uk-icon-' + icon + '"></i> ' + hostname +'</h3><hr><table class="uk-table"><caption>Server Details</caption><tbody><tr><td class="uk-width-1-2">IP Address</td><td class="uk-width-1-2">' + ipaddress + '</td></tr><tr><td class="uk-width-1-2">Status</td><td class="uk-width-1-2">Active</td></tr><tr><td class="uk-width-1-2">Server Size</td><td class="uk-width-1-2">' + size + '</td></tr><tr><td class="uk-width-1-2">Datacenter</td class="uk-width-1-2"><td>' + datacenter + '</td></tr></tbody></table></div></div>';				
				if(hostname && os && size && datacenter && ipaddress) {
					$("#myhosts").append(newHost);
				} else { console.log("Error in Host" + hostname + os + size + datacenter + ipaddress + icon); return; }
			});
		});
	}
	//Draw Page
	populateHosts();
	//Monitor and Open Server
	$('#myhosts').on('click', '.host', function(){
		var hostKey = $(this).attr('key');
		window.location.replace('host.html#' + hostKey);
	});
});