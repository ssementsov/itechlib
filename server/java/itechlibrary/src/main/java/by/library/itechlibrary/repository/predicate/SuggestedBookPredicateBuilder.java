package by.library.itechlibrary.repository.predicate;

import by.library.itechlibrary.dto.criteria.SearchCriteria;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
@Data
@AllArgsConstructor
public class SuggestedBookPredicateBuilder {

    private List<SearchCriteria> params;

    public SuggestedBookPredicateBuilder() {
        params = new ArrayList<>();
    }

    public SuggestedBookPredicateBuilder with(List<SearchCriteria> params) {

        this.params = params;

        return this;
    }

    public BooleanExpression build() {

        if (params.size() == 0) {
            return null;
        }

        List predicates = params.stream().map(param -> {

            SuggestedBookPredicate predicate = new SuggestedBookPredicate(param);
            return predicate.getPredicate();

        }).filter(Objects::nonNull).collect(Collectors.toList());

        BooleanExpression result = Expressions.asBoolean(true).isTrue();

        for (Object predicate : predicates) {

            result = result.and((Predicate) predicate);

        }

        return result;
    }
}
