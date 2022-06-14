package by.library.itechlibrary.constant;

public final class RegexConstant {

    private RegexConstant() {
    }

    public static final String USER_CORP_EMAIL_REGEX = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@itechart-group.com";
    public static final String USER_GOOGLE_EMAIL_REGEX = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@gmail.com";
    public static final String URL_REGEX = "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)";

}
