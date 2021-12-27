package by.library.itechlibrary.controller;


import by.library.itechlibrary.dto.EmailCheckerDto;
import by.library.itechlibrary.dto.UserDto;
import by.library.itechlibrary.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/users")
@Api(tags = "Endpoints for user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/check")
    @ApiOperation("check emails and connect two emails")
    @ResponseStatus(HttpStatus.OK)
    public void checkCorporateAndGoogleEmails(@Valid @RequestBody EmailCheckerDto emailCheckerDto) {

        userService.checkEmails(emailCheckerDto);

    }

    @PostMapping("/check/corp-email")
    @ApiOperation("check corporate email")
    @ResponseStatus(HttpStatus.OK)
    public void checkCorporateEmail(@RequestParam("email") String email) {

        userService.checkCorporateEmail(email);

    }

    @GetMapping
    @ApiOperation("get confirmed users")
    @ResponseStatus(HttpStatus.OK)
    public List<UserDto> getConfirmedUsers() {

        return userService.getConfirmedUsers();
    }
}
