export default function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/MDKCUD/Services/service1.service').isDraftEnabled('Books')) {
        return clientAPI.executeAction({
            'Name': '/MDKCUD/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Books'
                },
                'OnSuccess': '/MDKCUD/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/MDKCUD/Actions/CloseModalPage_Cancel.action');
    }
}