package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.constant.CategoryConstant;
import by.library.itechlibrary.constant.LanguageConstant;
import by.library.itechlibrary.constant.PredicateConstant;
import by.library.itechlibrary.constant.vote.VoteConstant;
import by.library.itechlibrary.dto.criteria.BaseSearchCriteria;
import by.library.itechlibrary.dto.criteria.SearchCriteria;
import by.library.itechlibrary.dto.criteria.SortingCriteria;
import by.library.itechlibrary.dto.suggested_book.NewSuggestedBookDto;
import by.library.itechlibrary.dto.suggested_book.SuggestedBookDto;
import by.library.itechlibrary.entity.Category;
import by.library.itechlibrary.entity.Language;
import by.library.itechlibrary.entity.SuggestedBook;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.entity.vote.SuggestedBookVoteCounter;
import by.library.itechlibrary.exeption_handler.exception.NotFoundException;
import by.library.itechlibrary.exeption_handler.exception.NotFoundSuggestedBookVoteCounterException;
import by.library.itechlibrary.exeption_handler.exception.NotNewObjectException;
import by.library.itechlibrary.exeption_handler.exception.WrongVoteException;
import by.library.itechlibrary.mapper.SuggestedBookMapper;
import by.library.itechlibrary.mapper.criteria.SearchCriteriaMapper;
import by.library.itechlibrary.repository.SuggestedBookRepository;
import by.library.itechlibrary.repository.predicate.SuggestedBookPredicateBuilder;
import by.library.itechlibrary.service.SuggestedBookService;
import by.library.itechlibrary.service.UserService;
import by.library.itechlibrary.service.VoteService;
import by.library.itechlibrary.util.PaginationUtil;
import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;


@Service
@Slf4j
@RequiredArgsConstructor
public class SuggestedBookServiceImpl implements SuggestedBookService {

    private final SuggestedBookRepository suggestedBookRepository;

    private final SuggestedBookMapper suggestedBookMapper;

    private final SuggestedBookPredicateBuilder suggestedBookPredicateBuilder;

    private final SearchCriteriaMapper searchCriteriaMapper;


    @Override
    public List<SuggestedBookDto> getAll(List<BaseSearchCriteria> criteria, SortingCriteria parameterInfoDto) {

        log.info("Try to get all suggested books.");

        Pageable pageable = PaginationUtil.getPageable(parameterInfoDto);
        Page<SuggestedBook> suggestedBooks = checkCriteriaAndGetPage(criteria, pageable);

        return suggestedBookMapper.mapSuggestedBookDtoList(suggestedBooks.getContent());
    }

    @Override
    public SuggestedBookDto getById(long id) {

        log.info("Try to get suggested book by id.");

        SuggestedBook suggestedBook = findById(id);

        return suggestedBookMapper.toSuggestedBookDto(suggestedBook);
    }

    @Override
    public void remove(long id) {

        log.info("Try to remove suggested book by id.");

        suggestedBookRepository.deleteById(id);

    }

    @Override
    public SuggestedBookDto create(NewSuggestedBookDto suggestedBookDto, User user) {

        log.info("Try to save suggested book.");

        SuggestedBook suggestedBook = suggestedBookMapper.toSuggestedBookFromNewSuggestedBookDto(suggestedBookDto);
        checkLanguageAndCategory(suggestedBook);
        checkId(suggestedBook);

        log.info("Try to set current user.");

        suggestedBook.setCreator(user);

        log.info("Try to set current date.");

        suggestedBook.setCreateDate(LocalDateTime.now());
        suggestedBook.setSuggestedBookVoteCounter(new SuggestedBookVoteCounter());

        log.info("Try to save suggested book.");

        suggestedBook = suggestedBookRepository.save(suggestedBook);

        return suggestedBookMapper.toSuggestedBookDto(suggestedBook);
    }

    @Transactional
    @Override
    public SuggestedBookDto update(SuggestedBookDto suggestedBookDto) {

        log.info("Try to update suggested book.");

        SuggestedBook newSuggestedBook = suggestedBookMapper.toSuggestedBook(suggestedBookDto);
        long suggestedBookId = newSuggestedBook.getId();
        SuggestedBook oldSuggestedBook = findById(suggestedBookId);

        newSuggestedBook.setCreator(oldSuggestedBook.getCreator());
        newSuggestedBook = suggestedBookRepository.save(newSuggestedBook);

        return suggestedBookMapper.toSuggestedBookDto(newSuggestedBook);
    }

    @Override
    public void addVoteCount(String voteTypeName, long suggestedBookId) {

        SuggestedBook suggestedBook = findById(suggestedBookId);
        setVoteCount(suggestedBook.getSuggestedBookVoteCounter(), voteTypeName);
        suggestedBookRepository.save(suggestedBook);

    }

    @Override
    public void setUserVoteType(SuggestedBookDto suggestedBookDto,  String voteTypeName) {

        if (suggestedBookDto.getSuggestedBookVoteCounter() != null) {

            suggestedBookDto.getSuggestedBookVoteCounter().setCurrentUserVoteType(voteTypeName);

        } else {

            throw new NotFoundSuggestedBookVoteCounterException("SuggestedBookVoteCounter is null for suggested book id = " + suggestedBookDto.getId());

        }
    }

    private Page<SuggestedBook> checkCriteriaAndGetPage(List<BaseSearchCriteria> criteria, Pageable pageable) {

        Page<SuggestedBook> suggestedBooks;

        if (criteria == null) {

            suggestedBooks = suggestedBookRepository.findAll(pageable);

        } else {

            BooleanExpression suggestedBookPredicate = getBooleanExpressionPredicate(criteria);
            suggestedBooks = suggestedBookRepository.findAll(suggestedBookPredicate, pageable);

        }

        return suggestedBooks;
    }

    private void setVoteCount(SuggestedBookVoteCounter suggestedBookVoteCounter, String voteTypeName) {

        switch (voteTypeName) {

            case VoteConstant.VOTE_TYPE_POSITIVE_NAME:

                setPositiveVote(suggestedBookVoteCounter);
                break;

            case VoteConstant.VOTE_TYPE_NEGATIVE_NAME:

                setNegativeVote(suggestedBookVoteCounter);
                break;

            default:
                throw new WrongVoteException("Wrong vote type name.");

        }
    }

    private void setNegativeVote(SuggestedBookVoteCounter suggestedBookVoteCounter) {
        int currentNegativeCount = suggestedBookVoteCounter.getNegativeCount();
        int newNegativeCount = currentNegativeCount + VoteConstant.VOTE_STEP;

        suggestedBookVoteCounter.setNegativeCount(newNegativeCount);
    }

    private void setPositiveVote(SuggestedBookVoteCounter suggestedBookVoteCounter) {
        int currentPositiveCount = suggestedBookVoteCounter.getPositiveCount();
        int newPositiveCount = currentPositiveCount + VoteConstant.VOTE_STEP;

        suggestedBookVoteCounter.setPositiveCount(newPositiveCount);
    }

    private BooleanExpression getBooleanExpressionPredicate(List<BaseSearchCriteria> criteria) {

        List<SearchCriteria> searchCriteriaList = searchCriteriaMapper
                .getSearchCriteriaList(criteria, PredicateConstant.EQUALS_CRITERIA_OPERATOR);

        return suggestedBookPredicateBuilder.with(searchCriteriaList).build();
    }

    private SuggestedBook findById(long id) {

        return suggestedBookRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Suggested book was not found by id = " + id));
    }


    private void checkId(SuggestedBook suggestedBook) {

        if (suggestedBook.getId() != 0) {

            throw new NotNewObjectException("This object has id != 0.");

        }
    }

    private void checkLanguageAndCategory(SuggestedBook suggestedBook) {

        checkLanguage(suggestedBook);
        checkCategory(suggestedBook);

    }

    private void checkCategory(SuggestedBook suggestedBook) {

        if (suggestedBook.getCategory() != null) {

            if (suggestedBook.getCategory().getId() == 0) {

                suggestedBook.setCategory(null);

            } else {

                tryCheckExistenceCategory(suggestedBook.getCategory());

            }
        }
    }

    private void checkLanguage(SuggestedBook suggestedBook) {

        if (suggestedBook.getLanguage() != null) {

            if (suggestedBook.getLanguage().getId() == 0) {

                suggestedBook.setLanguage(null);

            } else {

                tryCheckExistenceLanguage(suggestedBook.getLanguage());

            }
        }
    }

    private void tryCheckExistenceLanguage(Language language) {

        if (!LanguageConstant.languages.contains(language)) {

            throw new NotFoundException("Language has not been found.");
        }
    }

    private void tryCheckExistenceCategory(Category category) {

        if (!CategoryConstant.categories.contains(category)) {

            throw new NotFoundException("Category has not been found.");
        }
    }
}
