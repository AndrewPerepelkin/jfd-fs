export function generateAuthError(message) {
  switch (message) {
    case 'INVALID_PASSWORD':
      return 'Введен неверный пароль';
    case 'EMAIL_NOT_FOUND':
      return 'Пользователь с таким email не зарегистрирован';

    default:
      return 'Слишком много попыток входа. Попробуйте позже';
  }
}
