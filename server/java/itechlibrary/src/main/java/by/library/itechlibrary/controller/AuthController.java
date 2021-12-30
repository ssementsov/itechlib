package by.library.itechlibrary.controller;

import by.library.itechlibrary.config.JwtProvider;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Api(tags = "Authorization controller")
@RequiredArgsConstructor
public class AuthController {

    private final JwtProvider jwtProvider;


    @PostMapping
    public String getToken(@RequestBody String corpEmail) {

        return jwtProvider.generateToken(corpEmail);

    }

    @GetMapping
    public String auth(@RequestBody Authentication authentication) {

        OAuth2AuthenticationToken authenticationToken = (OAuth2AuthenticationToken) authentication;
        String email = authenticationToken.getPrincipal().getAttributes().get("email").toString();

        return email;

    }
}
