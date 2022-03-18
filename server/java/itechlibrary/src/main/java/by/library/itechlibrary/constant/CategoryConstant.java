package by.library.itechlibrary.constant;

import by.library.itechlibrary.entity.Category;
import by.library.itechlibrary.entity.Language;

import java.util.Set;

public final class CategoryConstant {

    private CategoryConstant() {
    }

    public static final Category PROFESSIONAL_CATEGORY = new Category((short) 1, "PROFESSIONAL");
    public static final Category FICTION_CATEGORY = new Category((short) 2, "FICTION");

    public static Set<Category> categories = Set.of(PROFESSIONAL_CATEGORY, FICTION_CATEGORY);
}
