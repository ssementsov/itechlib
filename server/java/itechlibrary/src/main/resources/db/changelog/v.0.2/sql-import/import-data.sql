INSERT INTO template (name, subject, text)
VALUES ('MAIL_CONFIRMATION_TEMPLATE', 'Confirmation of registration ITechLib', '<!DOCTYPE html>
<html>
 <head>
  <meta charset="utf-8">
  <title>Кнопка</title>
 </head>
 <body> <h3> Verify your email address <br>

 To start using iTechLib, just click the button below:

</h3> <br>
  <p><a href="http://localhost:8089/api/users/confirm/google?userId={USER_ID}&code={CONFIRMATION_CODE}">Confirm</a></p>
 </body>
</html>');
