const keys = require('../keys')

module.exports = function (email, token) {
  console.log({ email, token })
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: 'Восстановаления пароля',
    html: `
      <h1>Вы забыли пароль</h1>
      <p>Если нет, то проигнорируйте данное письмо</p>
      <p>Иначе нажмите на ссылку:</p>
      <a href="${keys.BASE_URL}/auth/password/${token}">Восстановаление доступа</a>
      <hr />
      <a href="${keys.BASE_URL}">Магазин курсов</a>
    `,
  }
}
