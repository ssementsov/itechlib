package by.library.itechlibrary.repository.predicate;

import by.library.itechlibrary.constant.PredicateConstant;
import by.library.itechlibrary.dto.criteria.SearchCriteria;
import by.library.itechlibrary.entity.SuggestedBook;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.core.types.dsl.StringPath;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static org.hibernate.query.criteria.internal.ValueHandlerFactory.isNumeric;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SuggestedBookPredicate {

    private SearchCriteria criteria;

    public BooleanExpression getPredicate() {

        PathBuilder<SuggestedBook> entityPath = new PathBuilder<>(SuggestedBook.class, PredicateConstant.PATH_BUILDER_VARIABLE);

        if (isNumeric(criteria.getValue().toString())) {

            NumberPath<Integer> path = entityPath.getNumber(criteria.getField(), Integer.class);
            int value = Integer.parseInt(criteria.getValue().toString());

            switch (criteria.getOperation()) {

                case PredicateConstant.EQUALS_CRITERIA_OPERATOR:
                    return path.eq(value);

                case PredicateConstant.GREATEST_OR_EQUALS_OPERATOR:
                    return path.goe(value);

                case PredicateConstant.LESS_OR_EQUALS_OPERATOR:
                    return path.loe(value);
            }
        } else {

            StringPath path = entityPath.getString(criteria.getField());

            if (criteria.getOperation().equalsIgnoreCase(PredicateConstant.EQUALS_CRITERIA_OPERATOR)) {

                return path.containsIgnoreCase(criteria.getValue().toString());
            }
        }

        return null;
    }
}
