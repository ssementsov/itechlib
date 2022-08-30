package by.library.itechlibrary.controller;

import by.library.itechlibrary.dto.internal_notification.UserInternalNotificationDto;
import by.library.itechlibrary.service.UserInternalNotificationService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/internal-notification")
@Api(tags = "Endpoints for internal notifications")
@RequiredArgsConstructor
public class InternalNotificationController {

    private final UserInternalNotificationService userInternalNotificationService;


    @GetMapping("/user/{id}")
    public List<UserInternalNotificationDto> getByUserId(@PathVariable("id") Long userId) {

        return userInternalNotificationService.getUnReadNotificationsByUserId(userId);
    }

    @GetMapping("/{id}")
    public void markIsRead(@PathVariable("id") Long userInternalNotificationId) {

        userInternalNotificationService.markIsRead(userInternalNotificationId);

    }
}
