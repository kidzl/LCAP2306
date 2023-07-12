export default function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/MDKCUD/Services/service1.service').isDraftEnabled('Authors')) {
        return clientAPI.executeAction({
            'Name': '/MDKCUD/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Authors'
                },
                'OnSuccess': '/MDKCUD/Actions/Authors/NavToAuthors_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/MDKCUD/Actions/Authors/NavToAuthors_Edit.action');
    }
}