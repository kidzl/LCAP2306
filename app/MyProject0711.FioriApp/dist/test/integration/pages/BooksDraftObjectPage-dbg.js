sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'MyProject0711.FioriApp',
            componentId: 'BooksDraftObjectPage',
            entitySet: 'BooksDraft'
        },
        CustomPageDefinitions
    );
});