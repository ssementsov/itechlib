package by.library.itechlibrary.dto.criteria;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BaseSearchCriteria {

    private String field;
    private Object value;

}
