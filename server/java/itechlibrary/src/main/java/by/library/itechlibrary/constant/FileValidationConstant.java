package by.library.itechlibrary.constant;

import java.util.Set;

public final class FileValidationConstant {

    private FileValidationConstant() {
    }

    private static final String JPG = "jpg";
    private static final String GIF = "gif";
    private static final String PNG = "png";

    public static final Set<String> IMAGE_VALID_EXTENSION_LIST = Set.of(JPG, PNG, GIF);

}
