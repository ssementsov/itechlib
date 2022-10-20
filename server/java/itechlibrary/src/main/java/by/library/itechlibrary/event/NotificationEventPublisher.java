package by.library.itechlibrary.event;

import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationEventPublisher {

    private final ApplicationEventPublisher publisher;

    public void publishEmailNotificationEventAboutBooking(Booking booking, User targetUser, String templateName, boolean isCorporateEmail) {

        EmailNotificationBookingEvent event = new EmailNotificationBookingEvent(this, booking, targetUser, templateName, isCorporateEmail);
        publisher.publishEvent(event);
    }

    public void publishInternalNotificationEventAboutBooking(Booking booking, long targetUserId, String templateName){

        InternalNotificationBookingEvent event = new InternalNotificationBookingEvent(this,booking,targetUserId,templateName);
        publisher.publishEvent(event);
    }

}
