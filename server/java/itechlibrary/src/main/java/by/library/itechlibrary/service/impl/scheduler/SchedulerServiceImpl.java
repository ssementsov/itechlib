package by.library.itechlibrary.service.impl.scheduler;

import by.library.itechlibrary.constant.MailTemplateConstant;
import by.library.itechlibrary.constant.UserRoleConstant;
import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.ConfirmationData;
import by.library.itechlibrary.entity.Template;
import by.library.itechlibrary.entity.UserRole;
import by.library.itechlibrary.repository.BookingRepository;
import by.library.itechlibrary.repository.ConfirmationDataRepository;
import by.library.itechlibrary.service.MailNotificationService;
import by.library.itechlibrary.service.MailTemplateService;
import by.library.itechlibrary.service.SchedulerService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;


@Data
@RequiredArgsConstructor
@Slf4j
@Service
public class SchedulerServiceImpl implements SchedulerService {

    private final ConfirmationDataRepository confirmationDataRepository;

    private final BookingRepository bookingRepository;

    private final MailTemplateService mailTemplateService;

    private final MailNotificationService mailNotificationService;


    @Override
    @Scheduled(cron = "${cron.check-confirm-data}")
    @Transactional
    public void deleteNotActivatedConfirmationData() {

        log.info("Get all not activated confirmation data's");

        List<ConfirmationData> confirmationDataList = confirmationDataRepository.getAllByActivatedIsFalse();
        checkAndDelete(confirmationDataList);

    }

    @Override
    @Scheduled(cron = "${cron.check-bookings}")
    @Transactional
    public void checkBookingsAndBlockUsersDidNotReturnBook() {

        log.info("Get all active bookings where date is overdue.");

        List<Booking> bookings = bookingRepository.findAllByFinishDateBeforeAndActiveIsTrue(UserRoleConstant.BOOK_READER_ROLE);

        if (!bookings.isEmpty()) {

            bookings.forEach(this::checkAndDeleteRole);

        }

        log.info("Get all active bookings where date is overdue.");

    }

    @Override
    @Scheduled(cron = "${cron.check-bookings-remind-finish-date}")
    @Transactional
    public void checkBookingsForRemindReturnDate() {

        log.info("Try to find bookings and send remind notifications to readers");

        LocalDate maxFinishDate = LocalDate.now().plusDays(3);
        List<Booking> bookings = bookingRepository.findAllByFinishDateLessOnThreeDaysAnActiveIsTrue(maxFinishDate);
        bookings.forEach(this::getTemplateAndSendNotification);

    }

    private void getTemplateAndSendNotification(Booking booking) {

        Template template = mailTemplateService
                .getAndFillTemplateFromBookingInfo(booking, MailTemplateConstant.RETURN_BOOK_TEMPLATE_NAME);
        mailNotificationService.sent(booking.getReader(), template);

    }

    private void checkAndDeleteRole(Booking booking) {

        Set<UserRole> roles = booking.getReader().getRoles();

        log.info("Check roles and delete if user has book reader role.");

        if (roles.contains(UserRoleConstant.BOOK_READER_ROLE)) {

            roles.remove(UserRoleConstant.BOOK_READER_ROLE);
            booking.getReader().setRoles(roles);

        }
    }

    private void checkAndDelete(List<ConfirmationData> confirmationDataList) {

        log.info("Check confirmation data's user and delete");

        for (ConfirmationData cd : confirmationDataList) {

            if (cd.getUser() != null) {

                cd.getUser().setConfirmationData(null);

            }

            confirmationDataRepository.delete(cd);

        }
    }
}
