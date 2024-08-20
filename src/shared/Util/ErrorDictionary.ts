export const ErrorDictionary = {
  AUTH: {
    emailRequired: {
      codeIntern: 'AUT001',
      message: 'Email is required',
    },
    passwordRequired: {
      codeIntern: 'AUT002',
      message: 'Password is required',
    },
    invalidEmailOrPassword: {
      codeIntern: 'AUT003',
      message: 'Invalid email or password',
    },
    tokenNotSent: {
      codeIntern: 'AUT004',
      message: 'Token not sent, please log in again',
    },
    invalidTokenFormat: {
      codeIntern: 'AUT005',
      message: 'Token has an invalid format',
    },
    sessionExpired: {
      codeIntern: 'AUT006',
      message: 'Session expired, please log in again',
    },
  },

  COLLABORATOR: {
    noPermissionToCreate: {
      codeIntern: 'COL001',
      message: 'No permission to create a collaborator',
    },
    createdSuccessfully: {
      codeIntern: 'COL002',
      message: 'Collaborator created successfully',
    },
    collaboratorIdNotFound: {
      codeIntern: 'COL003',
      message: 'No collaborator found with this ID',
    },
    noPermissionToDelete: {
      codeIntern: 'COL004',
      message: 'No permission to delete collaborators',
    },
    deletedSuccessfully: {
      codeIntern: 'COL005',
      message: 'Collaborator deleted successfully',
    },
    noPermissionToList: {
      codeIntern: 'COL006',
      message: 'No permission to list collaborators',
    },
    noPermissionToUpdate: {
      codeIntern: 'COL007',
      message: 'No permission to update this collaborator',
    },
    noPermissionToUpdateToAdmin: {
      codeIntern: 'COL008',
      message: 'No permission to update this collaborator to ADMIN',
    },
    updatedSuccessfully: {
      codeIntern: 'COL09',
      message: 'Collaborator updated successfully',
    },
  },

  USER: {
    dataNotFound: {
      codeIntern: 'USR001',
      message: 'User data not found',
    },
    emailAlreadyExists: {
      codeIntern: 'USR002',
      message: 'A user with this email already exists',
    },
    createdSuccessfully: {
      codeIntern: 'USR003',
      message: 'User created successfully',
    },
    passwordRecoveryEmailSent: {
      codeIntern: 'USR004',
      message: 'An email has been sent to you to recover your password',
    },
    passwordCreatedSuccessfully: {
      codeIntern: 'USR005',
      message: 'Password created successfully',
    },
    passwordAlreadyExists: {
      codeIntern: 'USR006',
      message: 'The user already has a password set',
    },
    userNotFoundWithId: {
      codeIntern: 'USR007',
      message: 'No user found with this ID',
    },
    noPermissionToUpdateUser: {
      codeIntern: 'USR008',
      message: 'No permission to update the user',
    },
    userUpdatedSuccessfully: {
      codeIntern: 'USR009',
      message: 'User updated successfully',
    },
  },

  SYSTEM: {
    unknownError: {
      codeIntern: 'SYS001',
      message: 'Unknown error',
    },
  },

  GOOGLE: {
    accountAlreadyLinked: {
      codeIntern: 'GOOG001',
      message: 'You already have a Google account linked',
    },
    errorLinkingAccount: {
      codeIntern: 'GOOG002',
      message: 'Error linking the Google account',
    },
    userNotFound: {
      codeIntern: 'GOOG003',
      message: 'User not found',
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
};
