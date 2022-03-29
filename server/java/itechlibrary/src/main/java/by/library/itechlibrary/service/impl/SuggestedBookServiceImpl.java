package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.constant.CategoryConstant;
import by.library.itechlibrary.constant.LanguageConstant;
import by.library.itechlibrary.dto.SuggestedBookDto;
import by.library.itechlibrary.dto.vote.GeneralAmountVoteDto;
import by.library.itechlibrary.entity.Category;
import by.library.itechlibrary.entity.Language;
import by.library.itechlibrary.entity.SuggestedBook;
import by.library.itechlibrary.exeption_handler.exception.NotFoundException;
import by.library.itechlibrary.exeption_handler.exception.NotNewObjectException;
import by.library.itechlibrary.mapper.SuggestedBookMapper;
import by.library.itechlibrary.repository.SuggestedBookRepository;
import by.library.itechlibrary.service.SuggestedBookService;
import by.library.itechlibrary.service.UserService;
import by.library.itechlibrary.service.VoteService;
import by.library.itechlibrary.util.PaginationUtil;
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

    private final SecurityUserDetailsServiceImpl securityUserDetailsService;

    private final VoteService voteService;

    private final UserService userService;


    @Override
    public List<SuggestedBookDto> getAll(int pageNumber, int pageCapacity) {

        log.info("Try to get all suggested books.");

        Pageable pageable = PaginationUtil.getPageable(pageNumber, pageCapacity);
        Page<SuggestedBook> suggestedBooks = suggestedBookRepository.findAll(pageable);
        List<SuggestedBookDto> suggestedBookDtoList = suggestedBookMapper.mapSuggestedBookDtoList(suggestedBooks.getContent());
        suggestedBookDtoList.forEach(this::setGeneralAmountVote);

        return suggestedBookDtoList;
    }

    @Override
    public SuggestedBookDto getById(long id) {

        log.info("Try to get suggested book by id.");

        SuggestedBook suggestedBook = findById(id);
        SuggestedBookDto suggestedBookDto = suggestedBookMapper.toSuggestedBookDto(suggestedBook);
        setGeneralAmountVote(suggestedBookDto);

        return suggestedBookDto;
    }

    @Override
    public void remove(long id) {

        log.info("Try to remove suggested book by id.");

        suggestedBookRepository.deleteById(id);

    }

    @Transactional
    @Override
    public SuggestedBookDto create(SuggestedBookDto suggestedBookDto) {

        log.info("Try to save suggested book.");

        SuggestedBook suggestedBook = suggestedBookMapper.toSuggestedBook(suggestedBookDto);
        checkLanguageAndCategory(suggestedBook);
        checkId(suggestedBook);

        log.info("Try to set current user.");

        long currentUserId = securityUserDetailsService.getCurrentUserId();
        suggestedBook.setCreator(userService.getUserById(currentUserId));

        log.info("Try to set current date.");

        suggestedBook.setCreateDate(LocalDateTime.now());

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
        SuggestedBookDto updatedSuggestedBookDto = suggestedBookMapper.toSuggestedBookDto(newSuggestedBook);
        setGeneralAmountVote(updatedSuggestedBookDto);

        return updatedSuggestedBookDto;
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

    private void setGeneralAmountVote(SuggestedBookDto suggestedBookDto) {

        long id = suggestedBookDto.getId();
        GeneralAmountVoteDto generalAmountVoteDto = voteService.countObjectVotes(id);
        suggestedBookDto.setAmountVote(generalAmountVoteDto);

    }
}
