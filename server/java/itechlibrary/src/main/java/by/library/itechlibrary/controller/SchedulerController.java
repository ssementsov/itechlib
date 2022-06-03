package by.library.itechlibrary.controller;

import by.library.itechlibrary.service.SchedulerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/scheduler")
@Api(tags = "Scheduler controller")
@RequiredArgsConstructor
public class SchedulerController {

    private final SchedulerService schedulerService;


    @ApiOperation("Check bookings and block users who did not return books")
    @PutMapping("/unreturned-books")
    public void checkUnReturnedBooks() {

        schedulerService.checkBookingsAndBlockUsersDidNotReturnBook();

    }

    @ApiOperation("Check and delete ot activated confirmation data")
    @PutMapping("/confirmation-data")
    public void checkAndDeleteNotActivatedConfirmationData() {

        schedulerService.deleteNotActivatedConfirmationData();

    }

    @ApiOperation("Find bookings and send remind notifications to readers")
    @PutMapping("/bookings-reminder")
    public void checkBookingsForRemindReturnDate() {

        schedulerService.checkBookingsForRemindReturnDate();

    }
}
