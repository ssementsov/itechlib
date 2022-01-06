package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.config.JwtProvider;
import by.library.itechlibrary.dto.auth.AuthDto;
import by.library.itechlibrary.dto.auth.AuthResponseDto;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.exeption_handler.exception.NotActivatedUserException;
import by.library.itechlibrary.exeption_handler.exception.NotFoundException;
import by.library.itechlibrary.repository.UserRepository;
import by.library.itechlibrary.service.AuthenticationService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Data
@Slf4j
@RequiredArgsConstructor
@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;

    private final JwtProvider jwtProvider;

    private final SecurityUserDetailsServiceImpl securityUserDetailsService;


    @Override
    public AuthResponseDto authenticate(AuthDto authDto) {

        Optional<User> userOptional = getOptionalUser(authDto);
        User currentUser = checkAndGetUser(userOptional);


        return new AuthResponseDto(currentUser.getId(), getToken(currentUser));
    }


    private Optional<User> getOptionalUser(AuthDto authDto) {

        if (authDto.getEmail() != null) {

            return userRepository.findByGoogleEmail(authDto.getEmail());

        } else {

            throw new NotFoundException("Google email is empty");
        }
    }

    private User checkAndGetUser(Optional<User> userOptional) {

        if (userOptional.isPresent() && userOptional.get().isActive()) {

            return userOptional.get();

        } else {

            throw new NotFoundException("User has not found");

        }
    }

    private String getToken(User currentUser) {

        if (currentUser.getConfirmationData().isActivated()) {

            String corpEmail = currentUser.getCorpEmail();
            securityUserDetailsService.setUserDetailsToContext(corpEmail);

            return jwtProvider.generateToken(corpEmail);

        } else throw new NotActivatedUserException("User has not been activated");
    }
}
