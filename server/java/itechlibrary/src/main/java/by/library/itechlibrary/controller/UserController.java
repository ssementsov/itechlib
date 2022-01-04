package by.library.itechlibrary.controller;


import by.library.itechlibrary.dto.EmailCheckerDto;
import by.library.itechlibrary.dto.UserDto;
import by.library.itechlibrary.service.SchedulerService;
import by.library.itechlibrary.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@Api(tags = "Endpoints for user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private final SchedulerService schedulerService;

    @PostMapping("/check")
    @ApiOperation("check emails and connect two emails")
    @ResponseStatus(HttpStatus.OK)
    public String checkCorporateAndGoogleEmails(@Valid @RequestBody EmailCheckerDto emailCheckerDto) {

        return userService.checkEmails(emailCheckerDto);

    }

    @PostMapping("/check/corp-email")
    @ApiOperation("check corporate email")
    @ResponseStatus(HttpStatus.OK)
    public void checkCorporateEmail(@RequestParam("email") String email) {

        schedulerService.deleteNotActivatedConfirmationData();

        userService.getUserCorporateEmail(email);

    }

    @GetMapping
    @ApiOperation("get confirmed users")
    @ResponseStatus(HttpStatus.OK)
    public List<UserDto> getConfirmedUsers() {

        return userService.getConfirmedUsers();
    }

    @GetMapping("/confirm/google")
    @ApiOperation("check emails and connect two emails")
    @ResponseStatus(HttpStatus.OK)
    public void checkCorporateAndGoogleEmails(@RequestParam("userId") long userId, @RequestParam("code") UUID code) {

        userService.confirmedGoogleEmail(userId, code);

    }
}
