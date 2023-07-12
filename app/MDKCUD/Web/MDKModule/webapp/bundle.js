(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/MDKCUD/i18n/i18n.properties":
/*!*******************************************************!*\
  !*** ./build.definitions/MDKCUD/i18n/i18n.properties ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = "Draft_DraftAdministrativeData=Draft_DraftAdministrativeData\nDraft_DraftUUID=Draft_DraftUUID\nDraft_CreationDateTime=Draft_CreationDateTime\nDraft_CreatedByUser=Draft_CreatedByUser\nDraft_DraftIsCreatedByMe=Draft_DraftIsCreatedByMe\nDraft_LastChangeDateTime=Draft_LastChangeDateTime\nDraft_LastChangedByUser=Draft_LastChangedByUser\nDraft_InProcessByUser=Draft_InProcessByUser\nDraft_DraftIsProcessedByMe=Draft_DraftIsProcessedByMe\n"

/***/ }),

/***/ "./build.definitions/MDKCUD/Rules/AppUpdateFailure.js":
/*!************************************************************!*\
  !*** ./build.definitions/MDKCUD/Rules/AppUpdateFailure.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
    let result = clientAPI.actionResults.AppUpdate.error.toString();
    var message;
    console.log(result);
    if (result.startsWith('Error: Uncaught app extraction failure:')) {
        result = 'Error: Uncaught app extraction failure:';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
        result = 'Application instance is not up or running';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
        result = 'Service instance not found.';
    }

    switch (result) {
        case 'Service instance not found.':
            message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
            message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
            message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
            break;
        case 'Error: Uncaught app extraction failure:':
            message = 'Error extracting metadata. Please redeploy and try again.';
            break;
        case 'Application instance is not up or running':
            message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
            break;
        default:
            message = result;
            break;
    }
    return clientAPI.getPageProxy().executeAction({
        "Name": "/MDKCUD/Actions/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDKCUD/Rules/AppUpdateSuccess.js":
/*!************************************************************!*\
  !*** ./build.definitions/MDKCUD/Rules/AppUpdateSuccess.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
    return (new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    }));
}
function AppUpdateSuccess(clientAPI) {
    var message;
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function() {
        let result = clientAPI.actionResults.AppUpdate.data;
        console.log(result);

        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return clientAPI.getPageProxy().executeAction({
                "Name": "/MDKCUD/Actions/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/MDKCUD/Actions/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Duration": 5,
                    "Message": message,
                    "NumberOfLines": 2
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDKCUD/Rules/Authors/Authors_Cancel.js":
/*!******************************************************************!*\
  !*** ./build.definitions/MDKCUD/Rules/Authors/Authors_Cancel.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/MDKCUD/Services/service1.service').isDraftEnabled('Authors')) {
        return clientAPI.executeAction({
            'Name': '/MDKCUD/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Authors'
                },
                'OnSuccess': '/MDKCUD/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/MDKCUD/Actions/CloseModalPage_Cancel.action');
    }
}

/***/ }),

/***/ "./build.definitions/MDKCUD/Rules/Authors/Authors_CreateBooks.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/MDKCUD/Rules/Authors/Authors_CreateBooks.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateRelatedEntity)
/* harmony export */ });
function CreateRelatedEntity(clientAPI) {
    if (clientAPI.getODataProvider('/MDKCUD/Services/service1.service').isDraftEnabled('Authors')) {
        let readLink = clientAPI.binding['@odata.readLink'];
        return clientAPI.executeAction({
            'Name': '/MDKCUD/Actions/Authors/Authors_CreateBooks.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/MDKCUD/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Authors',
                        'ReadLink': readLink
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/MDKCUD/Actions/Authors/Authors_CreateBooks.action');
    }
}

/***/ }),

/***/ "./build.definitions/MDKCUD/Rules/Authors/Authors_CreateEntity.js":
/*!************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Rules/Authors/Authors_CreateEntity.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/MDKCUD/Services/service1.service').isDraftEnabled('Authors')) {
        return clientAPI.executeAction({
            'Name': '/MDKCUD/Actions/Authors/Authors_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/MDKCUD/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Authors',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/MDKCUD/Actions/Authors/Authors_CreateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/MDKCUD/Rules/Authors/Authors_DeleteConfirmation.js":
/*!******************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Rules/Authors/Authors_DeleteConfirmation.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/MDKCUD/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/MDKCUD/Actions/Authors/Authors_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDKCUD/Rules/Authors/Authors_UpdateEntity.js":
/*!************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Rules/Authors/Authors_UpdateEntity.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
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

/***/ }),

/***/ "./build.definitions/MDKCUD/Rules/Authors/NavToAuthors_CreateBooks.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Rules/Authors/NavToAuthors_CreateBooks.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToCreate)
/* harmony export */ });
function NavToCreate(clientAPI) {
    if (clientAPI.getODataProvider('/MDKCUD/Services/service1.service').isDraftEnabled('Authors')) {
        return clientAPI.executeAction({
            'Name': '/MDKCUD/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Authors'
                },
                'OnSuccess': '/MDKCUD/Actions/Authors/NavToAuthors_CreateBooks.action'
            }
        });
    } else {
        return clientAPI.executeAction('/MDKCUD/Actions/Authors/NavToAuthors_CreateBooks.action');
    }
}

/***/ }),

/***/ "./build.definitions/MDKCUD/Rules/Authors/NavToAuthors_Edit.js":
/*!*********************************************************************!*\
  !*** ./build.definitions/MDKCUD/Rules/Authors/NavToAuthors_Edit.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
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

/***/ }),

/***/ "./build.definitions/MDKCUD/Rules/Books/Books_Cancel.js":
/*!**************************************************************!*\
  !*** ./build.definitions/MDKCUD/Rules/Books/Books_Cancel.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
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

/***/ }),

/***/ "./build.definitions/MDKCUD/Rules/Books/Books_CreateEntity.js":
/*!********************************************************************!*\
  !*** ./build.definitions/MDKCUD/Rules/Books/Books_CreateEntity.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/MDKCUD/Services/service1.service').isDraftEnabled('Books')) {
        return clientAPI.executeAction({
            'Name': '/MDKCUD/Actions/Books/Books_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/MDKCUD/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Books',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/MDKCUD/Actions/Books/Books_CreateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/MDKCUD/Rules/Books/Books_DeleteConfirmation.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Rules/Books/Books_DeleteConfirmation.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/MDKCUD/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/MDKCUD/Actions/Books/Books_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDKCUD/Rules/Books/Books_UpdateEntity.js":
/*!********************************************************************!*\
  !*** ./build.definitions/MDKCUD/Rules/Books/Books_UpdateEntity.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
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

/***/ }),

/***/ "./build.definitions/MDKCUD/Rules/Books/NavToBooks_Edit.js":
/*!*****************************************************************!*\
  !*** ./build.definitions/MDKCUD/Rules/Books/NavToBooks_Edit.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
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

/***/ }),

/***/ "./build.definitions/MDKCUD/Rules/OnWillUpdate.js":
/*!********************************************************!*\
  !*** ./build.definitions/MDKCUD/Rules/OnWillUpdate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/MDKCUD/Actions/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return Promise.resolve();
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDKCUD/Rules/ResetAppSettingsAndLogout.js":
/*!*********************************************************************!*\
  !*** ./build.definitions/MDKCUD/Rules/ResetAppSettingsAndLogout.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
function ResetAppSettingsAndLogout(context) {
    let logger = context.getLogger();
    let platform = context.nativescript.platformModule;
    let appSettings = context.nativescript.appSettingsModule;
    var appId;
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = context.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0, appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch (err) {
        logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
    } finally {
        // Logout 
        return context.getPageProxy().executeAction('/MDKCUD/Actions/Logout.action');
    }
}

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let mdkcud_actions_appupdate_action = __webpack_require__(/*! ./MDKCUD/Actions/AppUpdate.action */ "./build.definitions/MDKCUD/Actions/AppUpdate.action")
let mdkcud_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./MDKCUD/Actions/AppUpdateFailureMessage.action */ "./build.definitions/MDKCUD/Actions/AppUpdateFailureMessage.action")
let mdkcud_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./MDKCUD/Actions/AppUpdateProgressBanner.action */ "./build.definitions/MDKCUD/Actions/AppUpdateProgressBanner.action")
let mdkcud_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./MDKCUD/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/MDKCUD/Actions/AppUpdateSuccessMessage.action")
let mdkcud_actions_authors_authors_createbooks_action = __webpack_require__(/*! ./MDKCUD/Actions/Authors/Authors_CreateBooks.action */ "./build.definitions/MDKCUD/Actions/Authors/Authors_CreateBooks.action")
let mdkcud_actions_authors_authors_createentity_action = __webpack_require__(/*! ./MDKCUD/Actions/Authors/Authors_CreateEntity.action */ "./build.definitions/MDKCUD/Actions/Authors/Authors_CreateEntity.action")
let mdkcud_actions_authors_authors_deleteentity_action = __webpack_require__(/*! ./MDKCUD/Actions/Authors/Authors_DeleteEntity.action */ "./build.definitions/MDKCUD/Actions/Authors/Authors_DeleteEntity.action")
let mdkcud_actions_authors_authors_detailpopover_action = __webpack_require__(/*! ./MDKCUD/Actions/Authors/Authors_DetailPopover.action */ "./build.definitions/MDKCUD/Actions/Authors/Authors_DetailPopover.action")
let mdkcud_actions_authors_authors_updateentity_action = __webpack_require__(/*! ./MDKCUD/Actions/Authors/Authors_UpdateEntity.action */ "./build.definitions/MDKCUD/Actions/Authors/Authors_UpdateEntity.action")
let mdkcud_actions_authors_navtoauthors_create_action = __webpack_require__(/*! ./MDKCUD/Actions/Authors/NavToAuthors_Create.action */ "./build.definitions/MDKCUD/Actions/Authors/NavToAuthors_Create.action")
let mdkcud_actions_authors_navtoauthors_createbooks_action = __webpack_require__(/*! ./MDKCUD/Actions/Authors/NavToAuthors_CreateBooks.action */ "./build.definitions/MDKCUD/Actions/Authors/NavToAuthors_CreateBooks.action")
let mdkcud_actions_authors_navtoauthors_detail_action = __webpack_require__(/*! ./MDKCUD/Actions/Authors/NavToAuthors_Detail.action */ "./build.definitions/MDKCUD/Actions/Authors/NavToAuthors_Detail.action")
let mdkcud_actions_authors_navtoauthors_edit_action = __webpack_require__(/*! ./MDKCUD/Actions/Authors/NavToAuthors_Edit.action */ "./build.definitions/MDKCUD/Actions/Authors/NavToAuthors_Edit.action")
let mdkcud_actions_authors_navtoauthors_list_action = __webpack_require__(/*! ./MDKCUD/Actions/Authors/NavToAuthors_List.action */ "./build.definitions/MDKCUD/Actions/Authors/NavToAuthors_List.action")
let mdkcud_actions_books_books_createentity_action = __webpack_require__(/*! ./MDKCUD/Actions/Books/Books_CreateEntity.action */ "./build.definitions/MDKCUD/Actions/Books/Books_CreateEntity.action")
let mdkcud_actions_books_books_deleteentity_action = __webpack_require__(/*! ./MDKCUD/Actions/Books/Books_DeleteEntity.action */ "./build.definitions/MDKCUD/Actions/Books/Books_DeleteEntity.action")
let mdkcud_actions_books_books_updateentity_action = __webpack_require__(/*! ./MDKCUD/Actions/Books/Books_UpdateEntity.action */ "./build.definitions/MDKCUD/Actions/Books/Books_UpdateEntity.action")
let mdkcud_actions_books_navtobooks_create_action = __webpack_require__(/*! ./MDKCUD/Actions/Books/NavToBooks_Create.action */ "./build.definitions/MDKCUD/Actions/Books/NavToBooks_Create.action")
let mdkcud_actions_books_navtobooks_detail_action = __webpack_require__(/*! ./MDKCUD/Actions/Books/NavToBooks_Detail.action */ "./build.definitions/MDKCUD/Actions/Books/NavToBooks_Detail.action")
let mdkcud_actions_books_navtobooks_edit_action = __webpack_require__(/*! ./MDKCUD/Actions/Books/NavToBooks_Edit.action */ "./build.definitions/MDKCUD/Actions/Books/NavToBooks_Edit.action")
let mdkcud_actions_books_navtobooks_list_action = __webpack_require__(/*! ./MDKCUD/Actions/Books/NavToBooks_List.action */ "./build.definitions/MDKCUD/Actions/Books/NavToBooks_List.action")
let mdkcud_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./MDKCUD/Actions/CloseModalPage_Cancel.action */ "./build.definitions/MDKCUD/Actions/CloseModalPage_Cancel.action")
let mdkcud_actions_closemodalpage_complete_action = __webpack_require__(/*! ./MDKCUD/Actions/CloseModalPage_Complete.action */ "./build.definitions/MDKCUD/Actions/CloseModalPage_Complete.action")
let mdkcud_actions_closepage_action = __webpack_require__(/*! ./MDKCUD/Actions/ClosePage.action */ "./build.definitions/MDKCUD/Actions/ClosePage.action")
let mdkcud_actions_createentityfailuremessage_action = __webpack_require__(/*! ./MDKCUD/Actions/CreateEntityFailureMessage.action */ "./build.definitions/MDKCUD/Actions/CreateEntityFailureMessage.action")
let mdkcud_actions_createentitysuccessmessage_action = __webpack_require__(/*! ./MDKCUD/Actions/CreateEntitySuccessMessage.action */ "./build.definitions/MDKCUD/Actions/CreateEntitySuccessMessage.action")
let mdkcud_actions_deleteconfirmation_action = __webpack_require__(/*! ./MDKCUD/Actions/DeleteConfirmation.action */ "./build.definitions/MDKCUD/Actions/DeleteConfirmation.action")
let mdkcud_actions_deleteentityfailuremessage_action = __webpack_require__(/*! ./MDKCUD/Actions/DeleteEntityFailureMessage.action */ "./build.definitions/MDKCUD/Actions/DeleteEntityFailureMessage.action")
let mdkcud_actions_deleteentitysuccessmessage_action = __webpack_require__(/*! ./MDKCUD/Actions/DeleteEntitySuccessMessage.action */ "./build.definitions/MDKCUD/Actions/DeleteEntitySuccessMessage.action")
let mdkcud_actions_draftdiscardentity_action = __webpack_require__(/*! ./MDKCUD/Actions/DraftDiscardEntity.action */ "./build.definitions/MDKCUD/Actions/DraftDiscardEntity.action")
let mdkcud_actions_drafteditentity_action = __webpack_require__(/*! ./MDKCUD/Actions/DraftEditEntity.action */ "./build.definitions/MDKCUD/Actions/DraftEditEntity.action")
let mdkcud_actions_draftsaveentity_action = __webpack_require__(/*! ./MDKCUD/Actions/DraftSaveEntity.action */ "./build.definitions/MDKCUD/Actions/DraftSaveEntity.action")
let mdkcud_actions_logout_action = __webpack_require__(/*! ./MDKCUD/Actions/Logout.action */ "./build.definitions/MDKCUD/Actions/Logout.action")
let mdkcud_actions_logoutmessage_action = __webpack_require__(/*! ./MDKCUD/Actions/LogoutMessage.action */ "./build.definitions/MDKCUD/Actions/LogoutMessage.action")
let mdkcud_actions_onwillupdate_action = __webpack_require__(/*! ./MDKCUD/Actions/OnWillUpdate.action */ "./build.definitions/MDKCUD/Actions/OnWillUpdate.action")
let mdkcud_actions_service_initializeonline_action = __webpack_require__(/*! ./MDKCUD/Actions/Service/InitializeOnline.action */ "./build.definitions/MDKCUD/Actions/Service/InitializeOnline.action")
let mdkcud_actions_service_initializeonlinefailuremessage_action = __webpack_require__(/*! ./MDKCUD/Actions/Service/InitializeOnlineFailureMessage.action */ "./build.definitions/MDKCUD/Actions/Service/InitializeOnlineFailureMessage.action")
let mdkcud_actions_service_initializeonlinesuccessmessage_action = __webpack_require__(/*! ./MDKCUD/Actions/Service/InitializeOnlineSuccessMessage.action */ "./build.definitions/MDKCUD/Actions/Service/InitializeOnlineSuccessMessage.action")
let mdkcud_actions_updateentityfailuremessage_action = __webpack_require__(/*! ./MDKCUD/Actions/UpdateEntityFailureMessage.action */ "./build.definitions/MDKCUD/Actions/UpdateEntityFailureMessage.action")
let mdkcud_actions_updateentitysuccessmessage_action = __webpack_require__(/*! ./MDKCUD/Actions/UpdateEntitySuccessMessage.action */ "./build.definitions/MDKCUD/Actions/UpdateEntitySuccessMessage.action")
let mdkcud_globals_appdefinition_version_global = __webpack_require__(/*! ./MDKCUD/Globals/AppDefinition_Version.global */ "./build.definitions/MDKCUD/Globals/AppDefinition_Version.global")
let mdkcud_i18n_i18n_properties = __webpack_require__(/*! ./MDKCUD/i18n/i18n.properties */ "./build.definitions/MDKCUD/i18n/i18n.properties")
let mdkcud_jsconfig_json = __webpack_require__(/*! ./MDKCUD/jsconfig.json */ "./build.definitions/MDKCUD/jsconfig.json")
let mdkcud_pages_authors_authors_create_page = __webpack_require__(/*! ./MDKCUD/Pages/Authors/Authors_Create.page */ "./build.definitions/MDKCUD/Pages/Authors/Authors_Create.page")
let mdkcud_pages_authors_authors_createbooks_page = __webpack_require__(/*! ./MDKCUD/Pages/Authors/Authors_CreateBooks.page */ "./build.definitions/MDKCUD/Pages/Authors/Authors_CreateBooks.page")
let mdkcud_pages_authors_authors_detail_page = __webpack_require__(/*! ./MDKCUD/Pages/Authors/Authors_Detail.page */ "./build.definitions/MDKCUD/Pages/Authors/Authors_Detail.page")
let mdkcud_pages_authors_authors_edit_page = __webpack_require__(/*! ./MDKCUD/Pages/Authors/Authors_Edit.page */ "./build.definitions/MDKCUD/Pages/Authors/Authors_Edit.page")
let mdkcud_pages_authors_authors_list_page = __webpack_require__(/*! ./MDKCUD/Pages/Authors/Authors_List.page */ "./build.definitions/MDKCUD/Pages/Authors/Authors_List.page")
let mdkcud_pages_books_books_create_page = __webpack_require__(/*! ./MDKCUD/Pages/Books/Books_Create.page */ "./build.definitions/MDKCUD/Pages/Books/Books_Create.page")
let mdkcud_pages_books_books_detail_page = __webpack_require__(/*! ./MDKCUD/Pages/Books/Books_Detail.page */ "./build.definitions/MDKCUD/Pages/Books/Books_Detail.page")
let mdkcud_pages_books_books_edit_page = __webpack_require__(/*! ./MDKCUD/Pages/Books/Books_Edit.page */ "./build.definitions/MDKCUD/Pages/Books/Books_Edit.page")
let mdkcud_pages_books_books_list_page = __webpack_require__(/*! ./MDKCUD/Pages/Books/Books_List.page */ "./build.definitions/MDKCUD/Pages/Books/Books_List.page")
let mdkcud_pages_main_page = __webpack_require__(/*! ./MDKCUD/Pages/Main.page */ "./build.definitions/MDKCUD/Pages/Main.page")
let mdkcud_rules_appupdatefailure_js = __webpack_require__(/*! ./MDKCUD/Rules/AppUpdateFailure.js */ "./build.definitions/MDKCUD/Rules/AppUpdateFailure.js")
let mdkcud_rules_appupdatesuccess_js = __webpack_require__(/*! ./MDKCUD/Rules/AppUpdateSuccess.js */ "./build.definitions/MDKCUD/Rules/AppUpdateSuccess.js")
let mdkcud_rules_authors_authors_cancel_js = __webpack_require__(/*! ./MDKCUD/Rules/Authors/Authors_Cancel.js */ "./build.definitions/MDKCUD/Rules/Authors/Authors_Cancel.js")
let mdkcud_rules_authors_authors_createbooks_js = __webpack_require__(/*! ./MDKCUD/Rules/Authors/Authors_CreateBooks.js */ "./build.definitions/MDKCUD/Rules/Authors/Authors_CreateBooks.js")
let mdkcud_rules_authors_authors_createentity_js = __webpack_require__(/*! ./MDKCUD/Rules/Authors/Authors_CreateEntity.js */ "./build.definitions/MDKCUD/Rules/Authors/Authors_CreateEntity.js")
let mdkcud_rules_authors_authors_deleteconfirmation_js = __webpack_require__(/*! ./MDKCUD/Rules/Authors/Authors_DeleteConfirmation.js */ "./build.definitions/MDKCUD/Rules/Authors/Authors_DeleteConfirmation.js")
let mdkcud_rules_authors_authors_updateentity_js = __webpack_require__(/*! ./MDKCUD/Rules/Authors/Authors_UpdateEntity.js */ "./build.definitions/MDKCUD/Rules/Authors/Authors_UpdateEntity.js")
let mdkcud_rules_authors_navtoauthors_createbooks_js = __webpack_require__(/*! ./MDKCUD/Rules/Authors/NavToAuthors_CreateBooks.js */ "./build.definitions/MDKCUD/Rules/Authors/NavToAuthors_CreateBooks.js")
let mdkcud_rules_authors_navtoauthors_edit_js = __webpack_require__(/*! ./MDKCUD/Rules/Authors/NavToAuthors_Edit.js */ "./build.definitions/MDKCUD/Rules/Authors/NavToAuthors_Edit.js")
let mdkcud_rules_books_books_cancel_js = __webpack_require__(/*! ./MDKCUD/Rules/Books/Books_Cancel.js */ "./build.definitions/MDKCUD/Rules/Books/Books_Cancel.js")
let mdkcud_rules_books_books_createentity_js = __webpack_require__(/*! ./MDKCUD/Rules/Books/Books_CreateEntity.js */ "./build.definitions/MDKCUD/Rules/Books/Books_CreateEntity.js")
let mdkcud_rules_books_books_deleteconfirmation_js = __webpack_require__(/*! ./MDKCUD/Rules/Books/Books_DeleteConfirmation.js */ "./build.definitions/MDKCUD/Rules/Books/Books_DeleteConfirmation.js")
let mdkcud_rules_books_books_updateentity_js = __webpack_require__(/*! ./MDKCUD/Rules/Books/Books_UpdateEntity.js */ "./build.definitions/MDKCUD/Rules/Books/Books_UpdateEntity.js")
let mdkcud_rules_books_navtobooks_edit_js = __webpack_require__(/*! ./MDKCUD/Rules/Books/NavToBooks_Edit.js */ "./build.definitions/MDKCUD/Rules/Books/NavToBooks_Edit.js")
let mdkcud_rules_onwillupdate_js = __webpack_require__(/*! ./MDKCUD/Rules/OnWillUpdate.js */ "./build.definitions/MDKCUD/Rules/OnWillUpdate.js")
let mdkcud_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./MDKCUD/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/MDKCUD/Rules/ResetAppSettingsAndLogout.js")
let mdkcud_services_service1_service = __webpack_require__(/*! ./MDKCUD/Services/service1.service */ "./build.definitions/MDKCUD/Services/service1.service")
let mdkcud_styles_styles_css = __webpack_require__(/*! ./MDKCUD/Styles/Styles.css */ "./build.definitions/MDKCUD/Styles/Styles.css")
let mdkcud_styles_styles_json = __webpack_require__(/*! ./MDKCUD/Styles/Styles.json */ "./build.definitions/MDKCUD/Styles/Styles.json")
let mdkcud_styles_styles_less = __webpack_require__(/*! ./MDKCUD/Styles/Styles.less */ "./build.definitions/MDKCUD/Styles/Styles.less")
let mdkcud_styles_styles_nss = __webpack_require__(/*! ./MDKCUD/Styles/Styles.nss */ "./build.definitions/MDKCUD/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	mdkcud_actions_appupdate_action : mdkcud_actions_appupdate_action,
	mdkcud_actions_appupdatefailuremessage_action : mdkcud_actions_appupdatefailuremessage_action,
	mdkcud_actions_appupdateprogressbanner_action : mdkcud_actions_appupdateprogressbanner_action,
	mdkcud_actions_appupdatesuccessmessage_action : mdkcud_actions_appupdatesuccessmessage_action,
	mdkcud_actions_authors_authors_createbooks_action : mdkcud_actions_authors_authors_createbooks_action,
	mdkcud_actions_authors_authors_createentity_action : mdkcud_actions_authors_authors_createentity_action,
	mdkcud_actions_authors_authors_deleteentity_action : mdkcud_actions_authors_authors_deleteentity_action,
	mdkcud_actions_authors_authors_detailpopover_action : mdkcud_actions_authors_authors_detailpopover_action,
	mdkcud_actions_authors_authors_updateentity_action : mdkcud_actions_authors_authors_updateentity_action,
	mdkcud_actions_authors_navtoauthors_create_action : mdkcud_actions_authors_navtoauthors_create_action,
	mdkcud_actions_authors_navtoauthors_createbooks_action : mdkcud_actions_authors_navtoauthors_createbooks_action,
	mdkcud_actions_authors_navtoauthors_detail_action : mdkcud_actions_authors_navtoauthors_detail_action,
	mdkcud_actions_authors_navtoauthors_edit_action : mdkcud_actions_authors_navtoauthors_edit_action,
	mdkcud_actions_authors_navtoauthors_list_action : mdkcud_actions_authors_navtoauthors_list_action,
	mdkcud_actions_books_books_createentity_action : mdkcud_actions_books_books_createentity_action,
	mdkcud_actions_books_books_deleteentity_action : mdkcud_actions_books_books_deleteentity_action,
	mdkcud_actions_books_books_updateentity_action : mdkcud_actions_books_books_updateentity_action,
	mdkcud_actions_books_navtobooks_create_action : mdkcud_actions_books_navtobooks_create_action,
	mdkcud_actions_books_navtobooks_detail_action : mdkcud_actions_books_navtobooks_detail_action,
	mdkcud_actions_books_navtobooks_edit_action : mdkcud_actions_books_navtobooks_edit_action,
	mdkcud_actions_books_navtobooks_list_action : mdkcud_actions_books_navtobooks_list_action,
	mdkcud_actions_closemodalpage_cancel_action : mdkcud_actions_closemodalpage_cancel_action,
	mdkcud_actions_closemodalpage_complete_action : mdkcud_actions_closemodalpage_complete_action,
	mdkcud_actions_closepage_action : mdkcud_actions_closepage_action,
	mdkcud_actions_createentityfailuremessage_action : mdkcud_actions_createentityfailuremessage_action,
	mdkcud_actions_createentitysuccessmessage_action : mdkcud_actions_createentitysuccessmessage_action,
	mdkcud_actions_deleteconfirmation_action : mdkcud_actions_deleteconfirmation_action,
	mdkcud_actions_deleteentityfailuremessage_action : mdkcud_actions_deleteentityfailuremessage_action,
	mdkcud_actions_deleteentitysuccessmessage_action : mdkcud_actions_deleteentitysuccessmessage_action,
	mdkcud_actions_draftdiscardentity_action : mdkcud_actions_draftdiscardentity_action,
	mdkcud_actions_drafteditentity_action : mdkcud_actions_drafteditentity_action,
	mdkcud_actions_draftsaveentity_action : mdkcud_actions_draftsaveentity_action,
	mdkcud_actions_logout_action : mdkcud_actions_logout_action,
	mdkcud_actions_logoutmessage_action : mdkcud_actions_logoutmessage_action,
	mdkcud_actions_onwillupdate_action : mdkcud_actions_onwillupdate_action,
	mdkcud_actions_service_initializeonline_action : mdkcud_actions_service_initializeonline_action,
	mdkcud_actions_service_initializeonlinefailuremessage_action : mdkcud_actions_service_initializeonlinefailuremessage_action,
	mdkcud_actions_service_initializeonlinesuccessmessage_action : mdkcud_actions_service_initializeonlinesuccessmessage_action,
	mdkcud_actions_updateentityfailuremessage_action : mdkcud_actions_updateentityfailuremessage_action,
	mdkcud_actions_updateentitysuccessmessage_action : mdkcud_actions_updateentitysuccessmessage_action,
	mdkcud_globals_appdefinition_version_global : mdkcud_globals_appdefinition_version_global,
	mdkcud_i18n_i18n_properties : mdkcud_i18n_i18n_properties,
	mdkcud_jsconfig_json : mdkcud_jsconfig_json,
	mdkcud_pages_authors_authors_create_page : mdkcud_pages_authors_authors_create_page,
	mdkcud_pages_authors_authors_createbooks_page : mdkcud_pages_authors_authors_createbooks_page,
	mdkcud_pages_authors_authors_detail_page : mdkcud_pages_authors_authors_detail_page,
	mdkcud_pages_authors_authors_edit_page : mdkcud_pages_authors_authors_edit_page,
	mdkcud_pages_authors_authors_list_page : mdkcud_pages_authors_authors_list_page,
	mdkcud_pages_books_books_create_page : mdkcud_pages_books_books_create_page,
	mdkcud_pages_books_books_detail_page : mdkcud_pages_books_books_detail_page,
	mdkcud_pages_books_books_edit_page : mdkcud_pages_books_books_edit_page,
	mdkcud_pages_books_books_list_page : mdkcud_pages_books_books_list_page,
	mdkcud_pages_main_page : mdkcud_pages_main_page,
	mdkcud_rules_appupdatefailure_js : mdkcud_rules_appupdatefailure_js,
	mdkcud_rules_appupdatesuccess_js : mdkcud_rules_appupdatesuccess_js,
	mdkcud_rules_authors_authors_cancel_js : mdkcud_rules_authors_authors_cancel_js,
	mdkcud_rules_authors_authors_createbooks_js : mdkcud_rules_authors_authors_createbooks_js,
	mdkcud_rules_authors_authors_createentity_js : mdkcud_rules_authors_authors_createentity_js,
	mdkcud_rules_authors_authors_deleteconfirmation_js : mdkcud_rules_authors_authors_deleteconfirmation_js,
	mdkcud_rules_authors_authors_updateentity_js : mdkcud_rules_authors_authors_updateentity_js,
	mdkcud_rules_authors_navtoauthors_createbooks_js : mdkcud_rules_authors_navtoauthors_createbooks_js,
	mdkcud_rules_authors_navtoauthors_edit_js : mdkcud_rules_authors_navtoauthors_edit_js,
	mdkcud_rules_books_books_cancel_js : mdkcud_rules_books_books_cancel_js,
	mdkcud_rules_books_books_createentity_js : mdkcud_rules_books_books_createentity_js,
	mdkcud_rules_books_books_deleteconfirmation_js : mdkcud_rules_books_books_deleteconfirmation_js,
	mdkcud_rules_books_books_updateentity_js : mdkcud_rules_books_books_updateentity_js,
	mdkcud_rules_books_navtobooks_edit_js : mdkcud_rules_books_navtobooks_edit_js,
	mdkcud_rules_onwillupdate_js : mdkcud_rules_onwillupdate_js,
	mdkcud_rules_resetappsettingsandlogout_js : mdkcud_rules_resetappsettingsandlogout_js,
	mdkcud_services_service1_service : mdkcud_services_service1_service,
	mdkcud_styles_styles_css : mdkcud_styles_styles_css,
	mdkcud_styles_styles_json : mdkcud_styles_styles_json,
	mdkcud_styles_styles_less : mdkcud_styles_styles_less,
	mdkcud_styles_styles_nss : mdkcud_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/MDKCUD/Styles/Styles.css":
/*!****************************************************!*\
  !*** ./build.definitions/MDKCUD/Styles/Styles.css ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", "",{"version":3,"sources":["webpack://./build.definitions/MDKCUD/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDKCUD/Styles/Styles.less":
/*!*****************************************************!*\
  !*** ./build.definitions/MDKCUD/Styles/Styles.less ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", "",{"version":3,"sources":["webpack://./build.definitions/MDKCUD/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDKCUD/Styles/Styles.nss":
/*!****************************************************!*\
  !*** ./build.definitions/MDKCUD/Styles/Styles.nss ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../../../css-loader/dist/runtime/api.js":
/*!**************************************************!*\
  !*** ../../../../css-loader/dist/runtime/api.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../../../css-loader/dist/runtime/sourceMaps.js":
/*!*********************************************************!*\
  !*** ../../../../css-loader/dist/runtime/sourceMaps.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/MDKCUD/Pages/Authors/Authors_Create.page":
/*!********************************************************************!*\
  !*** ./build.definitions/MDKCUD/Pages/Authors/Authors_Create.page ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKCUD/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKCUD/Rules/Authors/Authors_CreateEntity.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Authors Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Mode":"Datetime","_Name":"createdAt","Caption":"createdAt","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"createdBy","_Name":"createdBy","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Datetime","_Name":"modifiedAt","Caption":"modifiedAt","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"modifiedBy","_Name":"modifiedBy","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Authors_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKCUD/Pages/Authors/Authors_CreateBooks.page":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Pages/Authors/Authors_CreateBooks.page ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKCUD/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKCUD/Rules/Authors/Authors_CreateBooks.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Books","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","KeyboardType":"Number","_Name":"ID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"title","_Name":"title","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"stock","KeyboardType":"Number","_Name":"stock","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"price","KeyboardType":"Number","_Name":"price","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"currency","_Name":"currency","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Authors_CreateBooks","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKCUD/Pages/Authors/Authors_Detail.page":
/*!********************************************************************!*\
  !*** ./build.definitions/MDKCUD/Pages/Authors/Authors_Detail.page ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Authors Detail","DesignTimeTarget":{"Service":"/MDKCUD/Services/service1.service","EntitySet":"Authors","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MDKCUD/Rules/Authors/NavToAuthors_Edit.js","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MDKCUD/Actions/Authors/Authors_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ID}","Subhead":"{createdAt}","BodyText":"","Footnote":"{modifiedAt}","Description":"{createdBy}","StatusText":"{modifiedBy}","StatusImage":"","SubstatusImage":"","SubstatusText":""},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"createdAt","Value":"{createdAt}"},{"KeyName":"createdBy","Value":"{createdBy}"},{"KeyName":"modifiedAt","Value":"{modifiedAt}"},{"KeyName":"modifiedBy","Value":"{modifiedBy}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"books"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{stock}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{title}","Footnote":"{price}","PreserveIconStackSpacing":false,"StatusText":"{currency}","Subhead":"{ID}","SubstatusText":"","OnPress":"/MDKCUD/Actions/Books/NavToBooks_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/books","Service":"/MDKCUD/Services/service1.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["Books"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Authors_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKCUD/Pages/Authors/Authors_Edit.page":
/*!******************************************************************!*\
  !*** ./build.definitions/MDKCUD/Pages/Authors/Authors_Edit.page ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Authors Detail","DesignTimeTarget":{"Service":"/MDKCUD/Services/service1.service","EntitySet":"Authors","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/MDKCUD/Rules/Authors/Authors_Cancel.js"},{"Position":"Right","SystemItem":"Save","OnPress":"/MDKCUD/Rules/Authors/Authors_UpdateEntity.js"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Mode":"Datetime","_Name":"createdAt","Value":"{createdAt}","Caption":"createdAt","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"createdBy","_Name":"createdBy","Value":"{createdBy}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Datetime","_Name":"modifiedAt","Value":"{modifiedAt}","Caption":"modifiedAt","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"modifiedBy","_Name":"modifiedBy","Value":"{modifiedBy}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Authors_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKCUD/Pages/Authors/Authors_List.page":
/*!******************************************************************!*\
  !*** ./build.definitions/MDKCUD/Pages/Authors/Authors_List.page ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Authors","ActionBar":{"Items":[{"OnPress":"/MDKCUD/Actions/Authors/NavToAuthors_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{createdBy}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDKCUD/Actions/Authors/NavToAuthors_Detail.action","StatusImage":"","Title":"{ID}","Footnote":"{modifiedAt}","PreserveIconStackSpacing":false,"StatusText":"{modifiedBy}","Subhead":"{createdAt}","SubstatusText":""},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Authors","Service":"/MDKCUD/Services/service1.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Authors_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKCUD/Pages/Books/Books_Create.page":
/*!****************************************************************!*\
  !*** ./build.definitions/MDKCUD/Pages/Books/Books_Create.page ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKCUD/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKCUD/Rules/Books/Books_CreateEntity.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Books Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","KeyboardType":"Number","_Name":"ID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"title","_Name":"title","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"stock","KeyboardType":"Number","_Name":"stock","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"price","KeyboardType":"Number","_Name":"price","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"currency","_Name":"currency","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Books_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKCUD/Pages/Books/Books_Detail.page":
/*!****************************************************************!*\
  !*** ./build.definitions/MDKCUD/Pages/Books/Books_Detail.page ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Books Detail","DesignTimeTarget":{"Service":"/MDKCUD/Services/service1.service","EntitySet":"Books","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MDKCUD/Rules/Books/NavToBooks_Edit.js","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MDKCUD/Rules/Books/Books_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{title}","Subhead":"{ID}","BodyText":"","Footnote":"{price}","Description":"{stock}","StatusText":"{currency}","StatusImage":"","SubstatusImage":"","SubstatusText":""},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"ID","Value":"{ID}"},{"KeyName":"title","Value":"{title}"},{"KeyName":"stock","Value":"{stock}"},{"KeyName":"price","Value":"{price}"},{"KeyName":"currency","Value":"{currency}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Books_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKCUD/Pages/Books/Books_Edit.page":
/*!**************************************************************!*\
  !*** ./build.definitions/MDKCUD/Pages/Books/Books_Edit.page ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Books Detail","DesignTimeTarget":{"Service":"/MDKCUD/Services/service1.service","EntitySet":"Books","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/MDKCUD/Rules/Books/Books_Cancel.js"},{"Position":"Right","SystemItem":"Save","OnPress":"/MDKCUD/Rules/Books/Books_UpdateEntity.js"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","_Name":"ID","Value":"{ID}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"title","_Name":"title","Value":"{title}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"stock","_Name":"stock","Value":"{stock}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"price","_Name":"price","Value":"{price}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"currency","_Name":"currency","Value":"{currency}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Books_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKCUD/Pages/Books/Books_List.page":
/*!**************************************************************!*\
  !*** ./build.definitions/MDKCUD/Pages/Books/Books_List.page ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Books","ActionBar":{"Items":[{"OnPress":"/MDKCUD/Actions/Books/NavToBooks_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{stock}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDKCUD/Actions/Books/NavToBooks_Detail.action","StatusImage":"","Title":"{title}","Footnote":"{price}","PreserveIconStackSpacing":false,"StatusText":"{currency}","Subhead":"{ID}","SubstatusText":""},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Books","Service":"/MDKCUD/Services/service1.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Books_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKCUD/Pages/Main.page":
/*!**************************************************!*\
  !*** ./build.definitions/MDKCUD/Pages/Main.page ***!
  \**************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Main","Controls":[{"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable","Sections":[{"Buttons":[{"OnPress":"/MDKCUD/Actions/Authors/NavToAuthors_List.action","Alignment":"Center","Title":"Authors","ButtonType":"Text","Semantic":"Tint"},{"OnPress":"/MDKCUD/Actions/Books/NavToBooks_List.action","Alignment":"Center","Title":"Books","ButtonType":"Text","Semantic":"Tint"}],"_Name":"SectionButtonTable0","_Type":"Section.Type.ButtonTable"}]}],"_Name":"Main","_Type":"Page","ToolBar":{"Items":[{"_Name":"LogoutToolbarItem","_Type":"Control.Type.ToolbarItem","Caption":"Logout","OnPress":"/MDKCUD/Actions/LogoutMessage.action"},{"_Name":"UpdateToolbarItem","_Type":"Control.Type.ToolbarItem","Caption":"Update","Enabled":true,"Clickable":true,"OnPress":"/MDKCUD/Actions/AppUpdateProgressBanner.action","Visible":"$(PLT,true,true,false)"}]},"PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"MDKCUD","Version":"/MDKCUD/Globals/AppDefinition_Version.global","MainPage":"/MDKCUD/Pages/Main.page","OnLaunch":["/MDKCUD/Actions/Service/InitializeOnline.action"],"OnWillUpdate":"/MDKCUD/Rules/OnWillUpdate.js","OnDidUpdate":"/MDKCUD/Actions/Service/InitializeOnline.action","Styles":"/MDKCUD/Styles/Styles.less","Localization":"/MDKCUD/i18n/i18n.properties","_SchemaVersion":"23.4","StyleSheets":{"Styles":{"css":"/MDKCUD/Styles/Styles.css","ios":"/MDKCUD/Styles/Styles.nss","android":"/MDKCUD/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/AppUpdate.action":
/*!***********************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/AppUpdate.action ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/MDKCUD/Rules/AppUpdateFailure.js","OnSuccess":"/MDKCUD/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/AppUpdateFailureMessage.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/AppUpdateFailureMessage.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/AppUpdateProgressBanner.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/AppUpdateProgressBanner.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/MDKCUD/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/AppUpdateSuccessMessage.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/AppUpdateSuccessMessage.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/Authors/Authors_CreateBooks.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/Authors/Authors_CreateBooks.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"books","Target":{"EntitySet":"Authors","ReadLink":"{@odata.readLink}"}},"OnFailure":"/MDKCUD/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKCUD/Actions/CreateEntitySuccessMessage.action","Properties":{"ID":"#Control:ID/#Value","title":"#Control:title/#Value","stock":"#Control:stock/#Value","price":"#Control:price/#Value","currency":"#Control:currency/#Value"},"Target":{"EntitySet":"Books","Service":"/MDKCUD/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/Authors/Authors_CreateEntity.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/Authors/Authors_CreateEntity.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MDKCUD/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKCUD/Actions/CreateEntitySuccessMessage.action","Properties":{"createdAt":"#Control:createdAt/#Value","createdBy":"#Control:createdBy/#Value","modifiedAt":"#Control:modifiedAt/#Value","modifiedBy":"#Control:modifiedBy/#Value"},"Target":{"EntitySet":"Authors","Service":"/MDKCUD/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/Authors/Authors_DeleteEntity.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/Authors/Authors_DeleteEntity.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Authors","Service":"/MDKCUD/Services/service1.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDKCUD/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDKCUD/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/Authors/Authors_DetailPopover.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/Authors/Authors_DetailPopover.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Add Books","OnPress":"/MDKCUD/Rules/Authors/NavToAuthors_CreateBooks.js"},{"Title":"Delete","OnPress":"/MDKCUD/Rules/Authors/Authors_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/Authors/Authors_UpdateEntity.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/Authors/Authors_UpdateEntity.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Authors","Service":"/MDKCUD/Services/service1.service","ReadLink":"{@odata.readLink}"},"Properties":{"createdAt":"#Control:createdAt/#Value","createdBy":"#Control:createdBy/#Value","modifiedAt":"#Control:modifiedAt/#Value","modifiedBy":"#Control:modifiedBy/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDKCUD/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDKCUD/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/Authors/NavToAuthors_Create.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/Authors/NavToAuthors_Create.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKCUD/Pages/Authors/Authors_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/Authors/NavToAuthors_CreateBooks.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/Authors/NavToAuthors_CreateBooks.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKCUD/Pages/Authors/Authors_CreateBooks.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/Authors/NavToAuthors_Detail.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/Authors/NavToAuthors_Detail.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKCUD/Pages/Authors/Authors_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/Authors/NavToAuthors_Edit.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/Authors/NavToAuthors_Edit.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKCUD/Pages/Authors/Authors_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/Authors/NavToAuthors_List.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/Authors/NavToAuthors_List.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKCUD/Pages/Authors/Authors_List.page"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/Books/Books_CreateEntity.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/Books/Books_CreateEntity.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MDKCUD/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKCUD/Actions/CreateEntitySuccessMessage.action","Properties":{"ID":"#Control:ID/#Value","title":"#Control:title/#Value","stock":"#Control:stock/#Value","price":"#Control:price/#Value","currency":"#Control:currency/#Value"},"Target":{"EntitySet":"Books","Service":"/MDKCUD/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/Books/Books_DeleteEntity.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/Books/Books_DeleteEntity.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Books","Service":"/MDKCUD/Services/service1.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDKCUD/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDKCUD/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/Books/Books_UpdateEntity.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/Books/Books_UpdateEntity.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Books","Service":"/MDKCUD/Services/service1.service","ReadLink":"{@odata.readLink}"},"Properties":{"ID":"#Control:ID/#Value","title":"#Control:title/#Value","stock":"#Control:stock/#Value","price":"#Control:price/#Value","currency":"#Control:currency/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDKCUD/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDKCUD/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/Books/NavToBooks_Create.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/Books/NavToBooks_Create.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKCUD/Pages/Books/Books_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/Books/NavToBooks_Detail.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/Books/NavToBooks_Detail.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKCUD/Pages/Books/Books_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/Books/NavToBooks_Edit.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/Books/NavToBooks_Edit.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKCUD/Pages/Books/Books_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/Books/NavToBooks_List.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/Books/NavToBooks_List.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKCUD/Pages/Books/Books_List.page"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/CloseModalPage_Cancel.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/CloseModalPage_Cancel.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/CloseModalPage_Complete.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/CloseModalPage_Complete.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/ClosePage.action":
/*!***********************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/ClosePage.action ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/CreateEntityFailureMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/CreateEntityFailureMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Create entity failure - {#ActionResults:create/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/CreateEntitySuccessMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/CreateEntitySuccessMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity created","IsIconHidden":true,"OnSuccess":"/MDKCUD/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/DeleteConfirmation.action":
/*!********************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/DeleteConfirmation.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Delete current entity?","Title":"Confirmation","OKCaption":"OK","CancelCaption":"Cancel","ActionResult":{"_Name":"DeleteConfirmation"}}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/DeleteEntityFailureMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/DeleteEntityFailureMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Delete entity failure - {#ActionResults:delete/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/DeleteEntitySuccessMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/DeleteEntitySuccessMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity deleted","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/MDKCUD/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/DraftDiscardEntity.action":
/*!********************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/DraftDiscardEntity.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Discard","Target":{"Service":"/MDKCUD/Services/service1.service","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/MDKCUD/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Discarded"}},"OnFailure":"/MDKCUD/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/DraftEditEntity.action":
/*!*****************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/DraftEditEntity.action ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Edit","Target":{"Service":"/MDKCUD/Services/service1.service","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/MDKCUD/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Edit"}},"OnFailure":"/MDKCUD/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/DraftSaveEntity.action":
/*!*****************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/DraftSaveEntity.action ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Save","Target":{"Service":"/MDKCUD/Services/service1.service","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/MDKCUD/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Saved"}},"OnFailure":"/MDKCUD/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/Logout.action":
/*!********************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/Logout.action ***!
  \********************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/LogoutMessage.action":
/*!***************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/LogoutMessage.action ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/MDKCUD/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/OnWillUpdate.action":
/*!**************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/OnWillUpdate.action ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/Service/InitializeOnline.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/Service/InitializeOnline.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDKCUD/Services/service1.service","_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"OnSuccess":"/MDKCUD/Actions/Service/InitializeOnlineSuccessMessage.action","OnFailure":"/MDKCUD/Actions/Service/InitializeOnlineFailureMessage.action","ActionResult":{"_Name":"init"}}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/Service/InitializeOnlineFailureMessage.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/Service/InitializeOnlineFailureMessage.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/Service/InitializeOnlineSuccessMessage.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/Service/InitializeOnlineSuccessMessage.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"NumberOfLines":2,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/UpdateEntityFailureMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/UpdateEntityFailureMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Update entity failure - {#ActionResults:update/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Actions/UpdateEntitySuccessMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKCUD/Actions/UpdateEntitySuccessMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity updated","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/MDKCUD/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Globals/AppDefinition_Version.global":
/*!***********************************************************************!*\
  !*** ./build.definitions/MDKCUD/Globals/AppDefinition_Version.global ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MDKCUD/Services/service1.service":
/*!************************************************************!*\
  !*** ./build.definitions/MDKCUD/Services/service1.service ***!
  \************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"../service/MyProject0711/","OfflineEnabled":false,"LanguageURLParam":"","OnlineOptions":{},"PathSuffix":"","SourceType":"Cloud","ServiceUrl":""}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = "1.1\n"

/***/ }),

/***/ "./build.definitions/MDKCUD/Styles/Styles.json":
/*!*****************************************************!*\
  !*** ./build.definitions/MDKCUD/Styles/Styles.json ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/MDKCUD/jsconfig.json":
/*!************************************************!*\
  !*** ./build.definitions/MDKCUD/jsconfig.json ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map