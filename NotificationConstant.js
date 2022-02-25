import path from 'path';

const BASE_PATH = path.resolve()

export const EMAIL_PROPERTIES = {
    RESET_PASSWORD: {
        subject: "Reset Password",
        templateDirectory: BASE_PATH + '/templates/reset-password-notification/reset-password-notification.html'
    },
    ACCOUNT_VERIFICATION: {
        subject: "Account verification",
        templateDirectory: BASE_PATH + '/templates/account-verification/account-verification.html'
    }
}