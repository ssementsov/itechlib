package by.library.itechlibrary.controller;


import by.library.itechlibrary.dto.EmailCheckerDto;
import by.library.itechlibrary.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/users")
@Api(tags = "Endpoints for user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    @ApiOperation("check emails and connect two emails")
    @ResponseStatus(HttpStatus.OK)
    public void addBook(@Valid @RequestBody EmailCheckerDto emailCheckerDto) {

        userService.checkEmails(emailCheckerDto);

    }
}
