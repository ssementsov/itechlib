package by.library.itechlibrary.config;

import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.exeption_handler.exception.NotActivatedUserException;
import by.library.itechlibrary.pojo.SecurityUserDetails;
import by.library.itechlibrary.repository.UserRepository;
import by.library.itechlibrary.service.impl.SecurityUserDetailsServiceImpl;
import lombok.SneakyThrows;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;


@Component("oauth2authSuccessHandler")
public class Oauth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final RedirectStrategy redirectStrategy;

    private final OAuth2AuthorizedClientService authorizedClientService;

    private final UserRepository userRepository;

    private final JwtProvider jwtProvider;

    private final SecurityUserDetailsServiceImpl securityUserDetailsService;

    private User currentUser;



    public Oauth2AuthenticationSuccessHandler(OAuth2AuthorizedClientService authorizedClientService,
                                              UserRepository userRepository, JwtProvider jwtProvider,
                                              SecurityUserDetailsServiceImpl securityUserDetailsService) {

        this.authorizedClientService = authorizedClientService;
        this.userRepository = userRepository;
        this.redirectStrategy = new DefaultRedirectStrategy();
        this.jwtProvider = jwtProvider;
        this.securityUserDetailsService = securityUserDetailsService;

    }

    @SneakyThrows
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) {

        OAuth2AuthenticationToken authenticationToken = (OAuth2AuthenticationToken) authentication;
        String email = authenticationToken.getPrincipal().getAttributes().get("email").toString();

        Optional<User> userOptional = userRepository.findByGoogleEmail(email);

        if (userOptional.isEmpty()) {

            this.redirectStrategy.sendRedirect(request, response, "/logout");

        } else {

            this.currentUser = userOptional.get();

            if (currentUser.getConfirmationData().isActivated()) {

                String token = jwtProvider.generateToken(currentUser.getCorpEmail());

                SecurityUserDetails securityUserDetails = (SecurityUserDetails) securityUserDetailsService
                        .loadUserByUsername(currentUser.getCorpEmail());

                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(securityUserDetails, null, null);
                SecurityContextHolder.getContext().setAuthentication(auth);
                response.setHeader(HttpHeaders.AUTHORIZATION, token);

                //redirectStrategy.sendRedirect(request, response, "http://seasonvar.ru/serial-15615--Boruto_Novoe_Pokolenie-0-sezon.html");

            } else throw new NotActivatedUserException("User has not been activated");
        }
    }

    public User getCurrentUser() {

        return this.currentUser;
    }
}
