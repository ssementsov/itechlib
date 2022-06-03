INSERT INTO template (name, subject,  text)
VALUES ('ACCEPTANCE_DECLINED', 'Acceptance declined','<html>
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <title>Reminder</title>
    <link href=" https://fonts.googleapis.com/css2?family=Montserrat&display=swap " rel="stylesheet">
    <style>
        p {
            line-height: 25px
        }
    </style>
</head>

<body style="font-family: Montserrat, sans-serif">
    <div>
        <table cellpadding="0" cellspacing="0" align="center">
            <tbody>
                <tr>
                    <td align="center">
                        <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" width="700">
                            <tbody>
                                <tr>
                                    <td width="660" align="center" valign="top">
                                        <table cellpadding="4" cellspacing="0" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td align="center" style="font-size: 0px;"><a target="_blank"><img
                                                                src=" https://tlr.stripocdn.email/content/guids/CABINET_2663efe83689b9bda1312f85374f56d2/images/10381620386430630.png "
                                                                alt style="display: block;" width="100"></a></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>Dear <b>{OWNER_NAME}</b>,</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>
                                                            <b>{BOOK_READER_NAME}</b> has declined the <b>{BOOK_TITLE}</b> book from <b>{BOOKING_START_DATE}</b> till
                                                            <b>{BOOKING_END_DATE}</b>. You can find the decline reason
                                                            on the Book preview page &ndash; just hover a
                                                            mouse over the status field.
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>To do so, please follow the link.
                                                            <span style="background: #ffffff;">
                                                                <a href="http://{HOST}/my-books" target="_blank"
                                                                    style="background: #ffffff; border-color: #ffffff;">
                                                                    Click here
                                                                </a>
                                                            </span>.
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>');

INSERT INTO template (name, subject,  text)
VALUES('BLOCK_OR_UNBLOCK_READER', 'Block or unblock reader', '<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <title>Reminder</title>
    <link href=" https://fonts.googleapis.com/css2?family=Montserrat&display=swap " rel="stylesheet">
    <style>
        p {
            line-height: 25pxfile_info
        }
    </style>
</head>

<body style="font-family: Montserrat, sans-serif">
    <div>
        <table cellpadding="0" cellspacing="0" align="center">
            <tbody>
                <tr>
                    <td align="center">
                        <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" width="700">
                            <tbody>
                                <tr>
                                    <td width="660" align="center" valign="top">
                                        <table cellpadding="4" cellspacing="0" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td align="center" style="font-size: 0px;"><a target="_blank"><img
                                                                src=" https://tlr.stripocdn.email/content/guids/CABINET_2663efe83689b9bda1312f85374f56d2/images/10381620386430630.png "
                                                                alt style="display: block;" width="100"></a></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>Dear <b>{BOOK_READER_NAME}</b>,</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>
                                                            <b>{BOOK_TITLE}</b> was due to return on <b>{BOOKING_END_DATE}</b>. Some
                                                                    functionalities were blocked for You because the
                                                                    book was not returned in time. Please return the
                                                                    book to retain access to all functionalities.
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>To do so, please follow the link.
                                                            <span style="background: #ffffff;">
                                                                <a href="http://{HOST}/books/{BOOK_ID}" target="_blank"
                                                                    style="background: #ffffff; border-color: #ffffff;">
                                                                    Click here
                                                                </a>
                                                            </span>.
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>');

INSERT INTO template (name, subject,  text)
VALUES ('BOOK_ACCEPTANCE', 'Book acceptance', '<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <title>Reminder</title>
    <link href=" https://fonts.googleapis.com/css2?family=Montserrat&display=swap " rel="stylesheet">
    <style>
        p {
            line-height: 25px
        }
    </style>
</head>

<body style="font-family: Montserrat, sans-serif">
    <div>
        <table cellpadding="0" cellspacing="0" align="center">
            <tbody>
                <tr>
                    <td align="center">
                        <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" width="700">
                            <tbody>
                                <tr>
                                    <td width="660" align="center" valign="top">
                                        <table cellpadding="4" cellspacing="0" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td align="center" style="font-size: 0px;"><a target="_blank"><img
                                                                src=" https://tlr.stripocdn.email/content/guids/CABINET_2663efe83689b9bda1312f85374f56d2/images/10381620386430630.png "
                                                                alt style="display: block;" width="100"></a></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>Dear <b>{OWNER_NAME}</b>,</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p><b>{BOOK_READER_NAME}</b> has accepted the <b>{BOOK_TITLE}</b> book from <b>{BOOKING_START_DATE}</b>
                                                            till <b>{BOOKING_END_DATE}</b>.
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>To do so, please follow the link.
                                                            <span style="background: #ffffff;">
                                                                <a href="http://{HOST}/my-books" target="_blank"
                                                                    style="background: #ffffff; border-color: #ffffff;">
                                                                    Click here
                                                                </a>
                                                            </span>.
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>');

INSERT INTO template (name, subject,  text)
VALUES ('BOOK_ACCEPTANCE_BY_READER', 'Book acceptance by reader', '<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <title>Reminder</title>
    <link href=" https://fonts.googleapis.com/css2?family=Montserrat&display=swap " rel="stylesheet">
    <style>
        p {
            line-height: 25px
        }
    </style>
</head>

<body style="font-family: Montserrat, sans-serif">
    <div>
        <table cellpadding="0" cellspacing="0" align="center">
            <tbody>
                <tr>
                    <td align="center">
                        <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" width="700">
                            <tbody>
                                <tr>
                                    <td width="660" align="center" valign="top">
                                        <table cellpadding="4" cellspacing="0" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td align="center" style="font-size: 0px;"><a target="_blank"><img
                                                                src=" https://tlr.stripocdn.email/content/guids/CABINET_2663efe83689b9bda1312f85374f56d2/images/10381620386430630.png "
                                                                alt style="display: block;" width="100"></a></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>Dear <b>{BOOK_READER_NAME}</b>,</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p><b>{OWNER_NAME}</b> is requesting You to accept
                                                            the <b>{BOOK_TITLE}</b> book from <b>{BOOKING_START_DATE}</b> till <b>{BOOKING_END_DATE}</b>.
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>To do so, please follow the link.
                                                            <span style="background: #ffffff;">
                                                                <a href="http://{HOST}/books/{BOOK_ID}" target="_blank"
                                                                    style="background: #ffffff; border-color: #ffffff;">
                                                                    Click here
                                                                </a>
                                                            </span>.
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>');

INSERT INTO template (name, subject,  text)
VALUES ('RETURN_BOOK', 'Return book', '<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <title>Reminder</title>
    <link href=" https://fonts.googleapis.com/css2?family=Montserrat&display=swap " rel="stylesheet">
    <style>
        p {
            line-height: 25px
        }
    </style>
</head>

<body style="font-family: Montserrat, sans-serif">
    <div>
        <table cellpadding="0" cellspacing="0" align="center">
            <tbody>
                <tr>
                    <td align="center">
                        <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" width="700">
                            <tbody>
                                <tr>
                                    <td width="660" align="center" valign="top">
                                        <table cellpadding="4" cellspacing="0" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td align="center" style="font-size: 0px;"><a target="_blank"><img
                                                                src=" https://tlr.stripocdn.email/content/guids/CABINET_2663efe83689b9bda1312f85374f56d2/images/10381620386430630.png "
                                                                alt style="display: block;" width="100"></a></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>Dear <b>{BOOK_READER_NAME}</b>,</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p><b>{BOOKING_START_DATE}</b> You took the
                                                            <b>{BOOK_TITLE}</b> book on iTechLib
                                                            website.
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>The book is due to return on <b>{BOOKING_END_DATE}</b>. You can return the book by clicking
                                                            the link:
                                                            <span style="background: #ffffff;">
                                                                <a href="http://{HOST}/books/{BOOK_ID}" target="_blank"
                                                                    style="background: #ffffff; border-color: #ffffff;">
                                                                    Click here
                                                                </a>
                                                            </span>.
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>Note that if You do not return the book by 23:59 on
                                                            <b>{BOOKING_END_DATE}</b>, some functionalities on iTechLib
                                                            website will be blocked until You return the book.
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>Thanks!</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>');