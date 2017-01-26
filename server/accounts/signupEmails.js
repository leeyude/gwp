Accounts.emailTemplates.siteName = "菜蟲農食";
Accounts.emailTemplates.from     = "歡迎註冊 <account@vegworm.com>";

Accounts.emailTemplates.verifyEmail = {

  subject() {

    return "[菜蟲歡迎您的加入] 請點以下連結確認信箱";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "account@vegworm.com",
        emailBody      = `請確認以下電子信箱 Email: (${emailAddress}) 為您在菜蟲農食註冊會員所使用的。 若確認無誤，請點此連結:\n\n${urlWithoutHash}\n\n 若您並沒有在菜蟲農食網站留下此電子信箱, 請忽略本郵件. 若您有其他問題, 可與菜蟲團隊聯絡: ${supportEmail}.`;

    return emailBody;
  }
};
