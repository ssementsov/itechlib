package by.library.itechlibrary.dto.criteria;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SearchCriteria extends BaseSearchCriteria {

    private String operation;


    public SearchCriteria(String field, Object value, String operation) {
        super(field, value);
        this.operation = operation;
    }
}
