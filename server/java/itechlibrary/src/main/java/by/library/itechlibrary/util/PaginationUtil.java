package by.library.itechlibrary.util;

import by.library.itechlibrary.constant.PaginationConstant;
import by.library.itechlibrary.exeption_handler.exception.WrongPageableCapacityException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public final class PaginationUtil {

    private PaginationUtil() {
    }

    public static Pageable getPageable(int pageNumber, int pageCapacity) {

        checkPageCapacity(pageCapacity);
        Sort sortByDate = getSort(PaginationConstant.SORT_BY_DATE);

        return PageRequest.of(pageNumber, pageCapacity, sortByDate);
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
