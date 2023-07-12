{
	"_Name": "MDKCUD",
	"Version": "/MDKCUD/Globals/AppDefinition_Version.global",
	"MainPage": "/MDKCUD/Pages/Main.page",
	"OnLaunch": [
		"/MDKCUD/Actions/Service/InitializeOnline.action"
	],
	"OnWillUpdate": "/MDKCUD/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/MDKCUD/Actions/Service/InitializeOnline.action",
	"Styles": "/MDKCUD/Styles/Styles.less",
	"Localization": "/MDKCUD/i18n/i18n.properties",
	"_SchemaVersion": "23.4"
}