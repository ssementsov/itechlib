package by.library.itechlibrary.util;

import by.library.itechlibrary.exeption_handler.exception.WrongPageableCapacityException;
import lombok.experimental.UtilityClass;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;


@UtilityClass
public class PageableUtil {

    @Value("${pageable.capacity}")
    private int maxPageableCapacity;

    public Pageable getPageable(int pageNumber, int pageCapacity) {

        checkPageCapacity(pageCapacity);

        return PageRequest.of(pageNumber, pageCapacity);
    }

    private void checkPageCapacity(int pageCapacity) {

        if(pageCapacity >= maxPageableCapacity){

            throw new WrongPageableCapacityException("Capacity should not be more than " + maxPageableCapacity);

        }
    }
}
