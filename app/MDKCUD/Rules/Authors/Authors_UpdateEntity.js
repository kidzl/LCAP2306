export default function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/MDKCUD/Services/service1.service').isDraftEnabled('Authors')) {
        return clientAPI.executeAction({
            'Name': '/MDKCUD/Actions/Authors/Authors_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/MDKCUD/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Authors'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/MDKCUD/Actions/Authors/Authors_UpdateEntity.action');
    }
}