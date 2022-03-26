package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.config.JwtProvider;
import by.library.itechlibrary.dto.auth.AuthRequestDto;
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
    public AuthResponseDto authenticate(AuthRequestDto authRequestDto) {

        Optional<User> userOptional = getOptionalUser(authRequestDto);
        User currentUser = checkAndGetUser(userOptional);

        return getAuthResponseDto(currentUser);
    }

    private Optional<User> getOptionalUser(AuthRequestDto authRequestDto) {

        if (authRequestDto.getEmail() != null) {

            return userRepository.findByGoogleEmail(authRequestDto.getEmail());

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

    private AuthResponseDto getAuthResponseDto(User currentUser) {

        AuthResponseDto authResponseDto = new AuthResponseDto();
        String token = getToken(currentUser);
        authResponseDto.setToken(token);
        tryToSetUserPhoto(currentUser, authResponseDto);

        return authResponseDto;
    }

    private void tryToSetUserPhoto(User currentUser, AuthResponseDto authResponseDto) {

        if (currentUser.getFileInfo() != null) {

            byte[] userPhoto = currentUser.getFileInfo().getFileData();
            authResponseDto.setUserPhoto(userPhoto);

        }
    }
}
