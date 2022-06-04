package by.library.itechlibrary.dto.criteria;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SortingCriteria implements Serializable {

    private int pageNumber;
    private int pageCapacity;
    private String sortField;
    private String sortDirection;

}
