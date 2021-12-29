package by.library.itechlibrary.controller;

import by.library.itechlibrary.config.JwtProvider;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@Api(tags = "Authorization controller")
@RequiredArgsConstructor
public class AuthController {

    private final JwtProvider jwtProvider;


    @PostMapping
    public String auth(@RequestBody String corpEmail) {

        return jwtProvider.generateToken(corpEmail);

    }

}
