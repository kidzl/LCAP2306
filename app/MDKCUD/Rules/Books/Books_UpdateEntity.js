export default function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/MDKCUD/Services/service1.service').isDraftEnabled('Books')) {
        return clientAPI.executeAction({
            'Name': '/MDKCUD/Actions/Books/Books_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/MDKCUD/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Books'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/MDKCUD/Actions/Books/Books_UpdateEntity.action');
    }
}