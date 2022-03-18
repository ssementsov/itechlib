package by.library.itechlibrary.constant;

import by.library.itechlibrary.entity.Language;

import java.util.Set;

public final class LanguageConstant {

    private LanguageConstant() {
    }

    private static final Language ENGLISH_LANGUAGE = new Language((short) 1, "ENGLISH");
    private static final Language RUSSIAN_LANGUAGE = new Language((short) 2, "RUSSIAN");

    public static Set<Language> languages = Set.of(ENGLISH_LANGUAGE, RUSSIAN_LANGUAGE);

}
