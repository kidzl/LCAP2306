sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'MyProject0711/FioriApp/test/integration/FirstJourney',
		'MyProject0711/FioriApp/test/integration/pages/BooksDraftObjectPage'
    ],
    function(JourneyRunner, opaJourney, BooksDraftObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('MyProject0711/FioriApp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheBooksDraftObjectPage: BooksDraftObjectPage
                }
            },
            opaJourney.run
        );
    }
);