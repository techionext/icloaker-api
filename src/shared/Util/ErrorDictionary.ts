export const ErrorDictionary = {
  USER: {
    emailAlreadyExists: {
      codeIntern: 'USR001',
      message: 'A user with this email already exists!',
    },
    userCreatedSuccessfully: {
      codeIntern: 'USR002',
      message: 'User created successfully!',
    },
    emailNotFound: {
      codeIntern: 'USR003',
      message: 'No user found with this email!',
    },
    dataNotFound: {
      codeIntern: 'USR004',
      message: 'User data not found!',
    },
    loginCredentialsExists: {
      codeIntern: 'USR005',
      message: 'Login credentials already provided!',
    },
    loginCredentialsSuccess: {
      codeIntern: 'USR006',
      message: 'Login credentials provided successfully!',
    },
    errorPermissionView: {
      codeIntern: 'USR007',
      message: 'Sem permissão para ver as informações do usuário!',
    },
    updatePermissionDenied: {
      codeIntern: 'USR008',
      message: 'No permission to update profile information',
    },
    profileUpdated: {
      codeIntern: 'USR009',
      message: 'User profile updated successfully',
    },
    avatarUploadError: {
      codeIntern: 'USR010',
      message: 'Error uploading user avatar. Please contact support!',
    },
    avatarUpdated: {
      codeIntern: 'USR011',
      message: 'User avatar updated successfully!',
    },
    noAvatarToDelete: {
      codeIntern: 'USR012',
      message: 'User has no avatar to delete!',
    },
    avatarDeleted: {
      codeIntern: 'USR013',
      message: 'User avatar deleted successfully!',
    },
  },

  RECOVER_PASSWORD: {
    emailSent: {
      codeIntern: 'RP001',
      message: 'An email has been sent to you to recover your password!',
    },
    passwordChanged: {
      codeIntern: 'RP002',
      message: 'Password changed successfully!',
    },
    linkValid: {
      codeIntern: 'RP003',
      message: 'Link valid!',
    },
    linkInvalid: {
      codeIntern: 'RP004',
      message: 'Link invalid!',
    },
    linkExpired: {
      codeIntern: 'RP005',
      message: 'Link expired!',
    },
    linkNotFound: {
      codeIntern: 'RP006',
      message: 'Link does not exist!',
    },
  },

  COLLABORATOR: {
    noPermissionToCreate: {
      codeIntern: 'COL001',
      message: 'No permission to create a collaborator!',
    },
    emailExistsInCompany: {
      codeIntern: 'COL002',
      message: 'A user with this email already exists in the company!',
    },
    created: {
      codeIntern: 'COL003',
      message: 'Collaborator created successfully!',
    },
    collaboratorNotFound: {
      codeIntern: 'COL004',
      message: 'No collaborator with this ID in the company!',
    },
    noPermissionToRemove: {
      codeIntern: 'COL005',
      message: 'No permission to remove collaborators!',
    },
    userNoLongerInCompany: {
      codeIntern: 'COL006',
      message: 'This user is no longer part of the company!',
    },
    noPermissionToList: {
      codeIntern: 'COL007',
      message: 'No permission to list collaborators!',
    },
    noPermissionToUpdate: {
      codeIntern: 'COL008',
      message: 'No permission to update this collaborator!',
    },
    noPermissionToUpdateToAdmin: {
      codeIntern: 'COL009',
      message: 'No permission to update this collaborator to ADMIN!',
    },
    updated: {
      codeIntern: 'COL010',
      message: 'Collaborator updated successfully!',
    },
  },

  AUTH: {
    companyNotFoundOrInactive: {
      codeIntern: 'AUT001',
      message: 'Company not found or inactive!',
    },
    updatedToCompany: {
      codeIntern: 'AUT002',
      message: 'Updated to the company!',
    },
    invalidEmailOrPassword: {
      codeIntern: 'AUT003',
      message: 'Invalid email/password!',
    },
    tokenNotSent: {
      codeIntern: 'AUT004',
      message: 'Token not sent, please log in again!',
    },
    invalidTokenFormat: {
      codeIntern: 'AUT005',
      message: 'Invalid token format!',
    },
    sessionExpired: {
      codeIntern: 'AUT006',
      message: 'Session expired, please log in again!',
    },
  },

  DOMAINS: {
    domainAlreadyRegistered: {
      codeIntern: 'DOM001',
      message: 'This domain has already been registered',
    },
    domainRegisteredSuccessfully: {
      codeIntern: 'DOM002',
      message: 'Domain registered successfully',
    },
    domainNotFoundWithUrl: {
      codeIntern: 'DOM003',
      message: 'No domain registered with this URL',
    },
    domainAlreadyActivated: {
      codeIntern: 'DOM004',
      message: 'The domain has already been activated and cannot be updated',
    },
    domainUpdatedSuccessfully: {
      codeIntern: 'DOM005',
      message: 'Domain updated successfully',
    },
    domainNotFoundWithId: {
      codeIntern: 'DOM006',
      message: 'No domain found with this ID',
    },
    domainDeletedSuccessfully: {
      codeIntern: 'DOM007',
      message: 'The domain was deleted successfully',
    },
  },

  CAMPAIGN: {
    campaignCreatedSuccessfully: {
      codeIntern: 'CMP001',
      message: 'Campaign created successfully',
    },
    campaignNotFoundWithId: {
      codeIntern: 'CMP002',
      message: 'No campaign found with this ID',
    },
    campaignAllowSettingsUpdatedSuccessfully: {
      codeIntern: 'CMP003',
      message: 'Campaign allow settings updated successfully',
    },
    campaignDeletedSuccessfully: {
      codeIntern: 'CMP004',
      message: 'Campaign deleted successfully',
    },
    campaignDenySettingsUpdatedSuccessfully: {
      codeIntern: 'CMP005',
      message: 'Campaign deny settings updated successfully',
    },
    domainCannotBeUpdatedAfterActivation: {
      codeIntern: 'CMP006',
      message: 'The domain cannot be updated after activation',
    },
    campaignUpdatedSuccessfully: {
      codeIntern: 'CMP007',
      message: 'Campaign updated successfully',
    },
    campaignLogCreatedSuccessfully: {
      codeIntern: 'CMP008',
      message: 'Campaign log created successfully',
    },
  },

  SYSTEM: {
    unknownError: {
      codeIntern: 'SYS001',
      message: 'Unknown error!',
    },
    zodError: {
      codeIntern: 'SYS002',
      message: 'Request body error!',
    },
  },
};
