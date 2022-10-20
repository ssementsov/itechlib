package by.library.itechlibrary.event;

import by.library.itechlibrary.entity.Booking;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class InternalNotificationBookingEvent extends ApplicationEvent {

    private Booking booking;
    private long targetUserId;
    private String templateName;

    public InternalNotificationBookingEvent(Object source, Booking booking, long targetUserId, String templateName) {
        super(source);
        this.booking = booking;
        this.targetUserId = targetUserId;
        this.templateName = templateName;
    }

}
