package by.library.itechlibrary.util;

import by.library.itechlibrary.constant.PageableConstant;
import by.library.itechlibrary.exeption_handler.exception.WrongPageableCapacityException;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Setter
public final class PageableUtil {

    private PageableUtil() {
    }

    public static Pageable getPageable(int pageNumber, int pageCapacity) {

        checkPageCapacity(pageCapacity);

        return PageRequest.of(pageNumber, pageCapacity);
    }

    private static void checkPageCapacity(int pageCapacity) {

        if (pageCapacity > PageableConstant.MAX_CAPACITY_VALUE) {

            throw new WrongPageableCapacityException("Capacity should not be more than " + PageableConstant.MAX_CAPACITY_VALUE);

        }
    }
}
