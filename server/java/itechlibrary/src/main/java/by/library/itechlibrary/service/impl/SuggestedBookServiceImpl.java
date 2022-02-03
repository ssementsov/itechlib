package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.dto.SuggestedBookDto;
import by.library.itechlibrary.entity.SuggestedBook;
import by.library.itechlibrary.exeption_handler.exception.NotFoundException;
import by.library.itechlibrary.exeption_handler.exception.NotNewObjectException;
import by.library.itechlibrary.mapper.SuggestedBookMapper;
import by.library.itechlibrary.repository.SuggestedBookRepository;
import by.library.itechlibrary.service.SuggestedBookService;
import by.library.itechlibrary.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;


@Service
@Slf4j
@RequiredArgsConstructor
public class SuggestedBookServiceImpl implements SuggestedBookService {

    private final SuggestedBookRepository suggestedBookRepository;

    private final SuggestedBookMapper suggestedBookMapper;

    private final SecurityUserDetailsServiceImpl securityUserDetailsService;

    private final UserService userService;


    @Override
    public List<SuggestedBookDto> getAll() {

        log.info("Try to get all suggested books.");

        List<SuggestedBook> suggestedBooks = suggestedBookRepository.findAll();

        return suggestedBookMapper.mapSuggestedBookDtoList(suggestedBooks);
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

    @Transactional
    @Override
    public SuggestedBookDto create(SuggestedBookDto suggestedBookDto) {

        log.info("Try to save suggested book.");

        SuggestedBook suggestedBook = suggestedBookMapper.toSuggestedBook(suggestedBookDto);
        checkId(suggestedBook);
        long currentUserId = securityUserDetailsService.getCurrentUserId();
        suggestedBook.setCreator(userService.getUserById(currentUserId));
        suggestedBook.setCreateDate(LocalDate.now());
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

    private SuggestedBook findById(long id) {

        return suggestedBookRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Suggested book was not found by id = " + id));
    }

    private void checkId(SuggestedBook suggestedBook) {

        if (suggestedBook.getId() != 0) {

            throw new NotNewObjectException("This object has id != 0.");

        }
    }
}
