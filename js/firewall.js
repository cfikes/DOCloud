$(document).ready(function() {

	//Load Rules for Host
	function loadRules(){
		if($("#host").val() == "default") { $("#currentRules").html(""); return; }
		$("#currentRules").html("");
		var data;
		$.getJSON("existingrules.json", function(data) {
			$.each(data.rules, function(i,rule) {
				var source,port,protocol,action,friendlyName;
				source = rule['sourcenet'];
				port = rule['destport'];
				protocol = rule['protocol'];
				action = rule['action'];
				friendlyName = rule['friendlyname'];
				var newRule = '<div class="uk-panel uk-panel-box uk-margin" friendlyname="' + friendlyName + '" sourcenet="' + source + '" destport="' + port + '" protocol="' + protocol + '" action="' + action + '"><i class="uk-icon-arrows"> </i> ' + friendlyName + '<a class="uk-button uk-button-danger uk-button-mini uk-float-right delRule">Delete</a></div>';
				if (source && port && protocol && action && friendlyName) { $("#currentRules").append(newRule); }
			});
		});
	}	

	//Save Rule Order
	$("#saveRuleOrder").click(function(){
		var source,port,action;
                var command0A = "iptables -F";
                var command0B = "iptables -A INPUT -i lo -j ACCEPT -m comment --comment \"Allow Loopback\"";
                var command0C = "iptables -A OUTPUT -o lo -j ACCEPT -m comment --comment \"Allow Loopback\"";
                console.log(command0A);
                console.log(command0B);
                console.log(command0C);
                
		$("#currentRules").children().each(function() {
			source = $(this).attr('sourcenet');
			port = $(this).attr('destport');
			protocol = $(this).attr('protocol');
			action = $(this).attr('action');
                        friendlyname = $(this).attr('friendlyname');
			var command1 = "iptables -A INPUT -s " + source + " -p " + protocol + " --dport " + port + " -j " + action + " -m comment --comment \"" + friendlyname + "\"";
			console.log(command1);
		});
                var command2= "iptables -P INPUT DROP";
                console.log(command2);
		UIkit.notify({ 
			'message': '<i class="uk-icon-check"></i> Rule Order Saved',
			'status': 'success',
			'timeout': 2000,
			'pos': 'top-center'
		});
	});

	//Add Rule from Form
	$("#addRule").click(function(){
		var source,port,protocol,action,friendlyName;
		source = $("#sourcenet").val();
		port = $("#destport").val();
		protocol = $("#protocol").val();
		action = $("#action").val();
		friendlyName = $("#friendlyName").val();
		var newRule = '<div class="uk-panel uk-panel-box uk-margin-top" friendlyname="' + friendlyName + '" sourcenet="' + source + '" destport="' + port + '" protocol="' + protocol + '" action="' + action + '"><i class="uk-icon-arrows"> </i> ' + friendlyName + '<a class="uk-button uk-button-danger uk-button-mini uk-float-right delRule">Delete</a></div>';
		if (source && port && protocol && action && friendlyName) {
			$("#currentRules").append(newRule);
			document.getElementById("friendlyName").value = "";
			document.getElementById("sourcenet").value = "";
			document.getElementById("destport").value = "";
                        document.getElementById("action").value = "ACCEPT";
			UIkit.notify({
				'message':'To apply save rule order.',
				'status':'',
				'timeout':3000,
				'pos':'top-center'
			});
			var modal = UIkit.modal("#newRuleModal");
			modal.hide();
		} else {
			UIkit.notify({
				'message':'<i class="uk-icon-remove"></i> Please Complete All Fields',
				'status':'warning',
				'timeout':3000,
				'pos':'top-center'
			});
		}
	});

	//Delete Current Rule
	$('#currentRules').on('click', '.delRule', function(){ 
		$(this).parent().remove();
                UIkit.notify({
                    'message':'To apply save rule order',
                    'status':'warning',
                    'timeout':1000,
                    'pos':'top-center'
                });
	});
	
	loadRules();
});