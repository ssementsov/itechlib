package by.library.itechlibrary.controller;

import by.library.itechlibrary.config.JwtProvider;
import by.library.itechlibrary.dto.AuthDto;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.exeption_handler.exception.NotActivatedUserException;
import by.library.itechlibrary.exeption_handler.exception.NotFoundException;
import by.library.itechlibrary.pojo.SecurityUserDetails;
import by.library.itechlibrary.repository.UserRepository;
import by.library.itechlibrary.service.impl.SecurityUserDetailsServiceImpl;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@Api(tags = "Authorization controller")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;

    private final JwtProvider jwtProvider;

    private final SecurityUserDetailsServiceImpl securityUserDetailsService;

//
//    @PostMapping
//    public String getToken(@RequestBody String corpEmail) {
//
//        return jwtProvider.generateToken(corpEmail);
//
//    }


    @SneakyThrows
    @PostMapping
    public String auth(@RequestBody AuthDto authJSON) {

        Optional<User> userOptional = userRepository.findByGoogleEmail(authJSON.getEmail());

        if (userOptional.isEmpty()) {

            throw new NotFoundException("User has not found");

        } else {

            User currentUser = userOptional.get();

            if (currentUser.getConfirmationData().isActivated()) {

                String token = jwtProvider.generateToken(currentUser.getCorpEmail());

                SecurityUserDetails securityUserDetails = (SecurityUserDetails) securityUserDetailsService
                        .loadUserByUsername(currentUser.getCorpEmail());

                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(securityUserDetails, null, null);
                SecurityContextHolder.getContext().setAuthentication(auth);

                return token;

            } else throw new NotActivatedUserException("User has not been activated");
        }
    }
}
