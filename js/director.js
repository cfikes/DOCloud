//Initial Population of Current Settings
$(document).ready(function() {
	function populateSettings(){
		$.getJSON("settings.json", function(setting) {
			document.getElementById("settingName").value = setting['Name'];
			document.getElementById("settingCompany").value = setting['Company'];
			document.getElementById("settingSupportE").value = setting['SupportE'];
			document.getElementById("settingSupportT").value = setting['SupportT'];
			document.getElementById("settingSMTPServer").value = setting['SMTPServer'];
			document.getElementById("settingSMTPUsername").value = setting['SMTPUsername'];
			document.getElementById("settingSMTPPassword").value = setting['SMTPPassword'];
			document.getElementById("settingSMTPSecurity").value = setting['SMTPSecurity'];
			document.getElementById("settingSMTPPort").value = setting['SMTPPort'];
			document.getElementById("settingMYSQLServer").value = setting['MYSQLServer'];
			document.getElementById("settingMYSQLPort").value = setting['MYSQLPort'];
			document.getElementById("settingMYSQLDatabase").value = setting['MYSQLDatabase'];
			document.getElementById("settingMYSQLUsername").value = setting['MYSQLUsername'];
			document.getElementById("settingMYSQLPassword").value = setting['MYSQLPassword'];
			document.getElementById("settingDOTokenName").value = setting['DOTokenName'];
			document.getElementById("settingDOToken").value = setting['DOToken'];
			});
	}
	populateSettings();
});