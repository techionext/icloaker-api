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
  },
};
