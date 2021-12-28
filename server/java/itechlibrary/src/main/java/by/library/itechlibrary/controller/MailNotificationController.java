package by.library.itechlibrary.controller;


import by.library.itechlibrary.entity.MailNotification;
import by.library.itechlibrary.service.MailNotificationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;




@RestController
@RequestMapping("/notification")
@Api(tags = "Endpoints for notification")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class MailNotificationController {

    private final MailNotificationService mailNotificationService;

    @PostMapping
    @ApiOperation("send notification")
    @ResponseStatus(HttpStatus.OK)
    public void checkCorporateAndGoogleEmails(@Valid @RequestBody MailNotification mailNotification) {


    }
}
