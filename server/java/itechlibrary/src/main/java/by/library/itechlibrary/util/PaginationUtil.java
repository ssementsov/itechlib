package by.library.itechlibrary.util;

import by.library.itechlibrary.constant.PaginationConstant;
import by.library.itechlibrary.exeption_handler.exception.WrongPageableCapacityException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public final class PaginationUtil {

    private PaginationUtil() {
    }

    public static Pageable getPageable(int pageNumber, int pageCapacity, String sortingMode) {

        checkPageCapacity(pageCapacity);
        Sort sort = getSort(sortingMode);

        return PageRequest.of(pageNumber, pageCapacity, sort);
    }

    private static Sort getSort(String sortMode) {

        return Sort.by(sortMode).descending();
    }

    private static void checkPageCapacity(int pageCapacity) {

        if (pageCapacity > PaginationConstant.MAX_CAPACITY_VALUE) {

            throw new WrongPageableCapacityException("Capacity should not be more than " + PaginationConstant.MAX_CAPACITY_VALUE);

        }
    }
}
