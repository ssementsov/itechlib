package by.library.itechlibrary.util;

import by.library.itechlibrary.constant.PaginationConstant;
import by.library.itechlibrary.dto.criteria.SortingCriteria;
import by.library.itechlibrary.exeption_handler.exception.PaginationSortDirectionException;
import by.library.itechlibrary.exeption_handler.exception.WrongPageableCapacityException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public final class PaginationUtil {

    private PaginationUtil() {
    }

    public static Pageable getPageable(SortingCriteria sortingCriteria) {

        checkPageCapacity(sortingCriteria.getPageCapacity());
        Sort sort = getSort(sortingCriteria.getSortField(), sortingCriteria.getSortDirection());

        return PageRequest.of(sortingCriteria.getPageNumber(), sortingCriteria.getPageCapacity(), sort);
    }

    private static Sort getSort(String sortField, String sortDirection) {

        switch (sortDirection) {

            case PaginationConstant.DESCENDING_SORT_DIRECTION:
                return Sort.by(sortField).descending();

            case PaginationConstant.ASCENDING_SORT_DIRECTION:
                return Sort.by(sortField).ascending();

            default:
                throw new PaginationSortDirectionException("Wrong Sort directionType");

        }
    }

    private static void checkPageCapacity(int pageCapacity) {

        if (pageCapacity > PaginationConstant.MAX_CAPACITY_VALUE) {

            throw new WrongPageableCapacityException("Capacity should not be more than " + PaginationConstant.MAX_CAPACITY_VALUE);

        }
    }
}
