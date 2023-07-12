export default function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/MDKCUD/Services/service1.service').isDraftEnabled('Books')) {
        return clientAPI.executeAction({
            'Name': '/MDKCUD/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Books'
                },
                'OnSuccess': '/MDKCUD/Actions/Books/NavToBooks_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/MDKCUD/Actions/Books/NavToBooks_Edit.action');
    }
}