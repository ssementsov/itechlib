package by.library.itechlibrary.event;

import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.User;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class EmailNotificationBookingEvent extends ApplicationEvent {

    private Booking booking;
    private User targetUser;
    private String templateName;
    private boolean isCorporateEmail;

    public EmailNotificationBookingEvent(Object source, Booking booking, User targetUser, String templateName, boolean isCorporateEmail) {
        super(source);
        this.booking = booking;
        this.targetUser = targetUser;
        this.templateName = templateName;
        this.isCorporateEmail = isCorporateEmail;
    }

}
