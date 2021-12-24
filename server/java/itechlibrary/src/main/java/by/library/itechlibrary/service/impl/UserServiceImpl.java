package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.dto.EmailCheckerDto;
import by.library.itechlibrary.dto.UserDto;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.exeption_handler.exception.NotFoundException;
import by.library.itechlibrary.exeption_handler.exception.WrongGoogleEmailException;
import by.library.itechlibrary.mapper.UserMapper;
import by.library.itechlibrary.repository.UserRepository;
import by.library.itechlibrary.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    @Override
    @Transactional
    public void checkEmails(EmailCheckerDto emailCheckerDto) {

        log.info("Try to check corp email.");

        User user = checkCorporateEmail(emailCheckerDto.getCorpEmail());
        String googleEmail = emailCheckerDto.getGoogleEmail();

        log.info("Try to check and set google email.");

        checkAndSetGoogleEmail(user, googleEmail);

    }

    @Override
    public List<UserDto> getConfirmedUsers(){

        log.info("Try to find users where google email is exist.");

        List<User> users = userRepository.findAllByGoogleEmailNotNull();

        return userMapper.mapUserDtoList(users);
    }

    @Override
    public User checkCorporateEmail(String email) {

        return userRepository.findByCorpEmail(email)
                .orElseThrow(() -> new NotFoundException("The corporate email was not found."));
    }

    private void checkAndSetGoogleEmail(User user, String googleEmail) {

        if (user.getGoogleEmail() == null) {

            user.setGoogleEmail(googleEmail);

        } else if (!user.getGoogleEmail().equals(googleEmail)) {

            throw new WrongGoogleEmailException("This User already has a different google address.");

        }
    }
}
