package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.dto.EmailCheckerDto;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.exeption_handler.exception.NotFoundException;
import by.library.itechlibrary.exeption_handler.exception.WrongGoogleEmailException;
import by.library.itechlibrary.repository.UserRepository;
import by.library.itechlibrary.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public void checkEmails(EmailCheckerDto emailCheckerDto) {

        User user = userRepository.findByCorpEmail(emailCheckerDto.getCorpEmail())
                .orElseThrow(() -> new NotFoundException("The corporate email was not found."));

        String googleEmail = user.getGoogleEmail();
        checkAndSetGoogleEmail(user, googleEmail);

    }


    private void checkAndSetGoogleEmail(User user, String googleEmail) {

        if (user.getGoogleEmail().isEmpty()) {

            user.setGoogleEmail(googleEmail);

        } else if (!user.getGoogleEmail().equals(googleEmail)) {

            throw new WrongGoogleEmailException("This User already has a different google address.");

        }
    }
}
