package by.library.itechlibrary.mapper.criteria;

import by.library.itechlibrary.dto.criteria.BaseSearchCriteria;
import by.library.itechlibrary.dto.criteria.SearchCriteria;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SearchCriteriaMapper {

    public List<SearchCriteria> getSearchCriteriaList(List<BaseSearchCriteria> criteriaList, String criteriaOperator) {

        List<SearchCriteria> searchCriteriaList = new ArrayList<>();

        for (BaseSearchCriteria criteria : criteriaList) {

            searchCriteriaList.add(new SearchCriteria(criteria.getField(), criteria.getValue(), criteriaOperator));

        }

        return searchCriteriaList;
    }
}
