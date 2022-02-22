import path from 'path';

export const EMAIL_PROPERTIES = {
    RESET_PASSWORD: {
        subject: "Reset Password",
        templateDirectory: path.resolve() + '/templates/reset-password-notification/reset-password-notification.html'
    }
}