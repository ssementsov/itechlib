package by.library.itechlibrary.constant;

import java.util.regex.Pattern;

public final class ValidationPatternConstant {

    private ValidationPatternConstant() {
    }

    public static final Pattern VALID_EMAIL_ADDRESS_REGEX =
            Pattern.compile("^[A-Z0-9._%+-]+@itechart-group.com$", Pattern.CASE_INSENSITIVE);

}
