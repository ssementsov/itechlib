package by.library.itechlibrary.entity.internal_notification;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users_internal_notification")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInternalNotification {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "text")
    private String text;

    @Column(name = "link")
    private String link;

    @Column(name = "creation_date_time")
    private LocalDateTime creationDateTime;

    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH, CascadeType.MERGE})
    @JoinColumn(name = "template_id")
    private InternalNotificationTemplate template;

    @Column(name = "is_read")
    private boolean isRead;

}