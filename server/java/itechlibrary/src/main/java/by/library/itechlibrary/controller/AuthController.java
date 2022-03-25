package by.library.itechlibrary.controller;

import by.library.itechlibrary.dto.auth.AuthRequestDto;
import by.library.itechlibrary.dto.auth.AuthResponseDto;
import by.library.itechlibrary.service.AuthenticationService;
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

    private final AuthenticationService authenticationService;


    @PostMapping
    public AuthResponseDto auth(@RequestBody AuthRequestDto authRequestDto) {

        return authenticationService.authenticate(authRequestDto);
    }
}
