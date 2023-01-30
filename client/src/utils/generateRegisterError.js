export function generateRegisterError(message) {
  switch (message) {
    case 'INVALID_EMAIL':
      return 'Введен некорректный email';
    case 'EMAIL_EXISTS':
      return 'Пользователь с таким email уже зарегистрирован';

    default:
      return 'Слишком много попыток входа. Попробуйте позже';
  }
}
