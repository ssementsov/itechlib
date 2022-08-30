package by.library.itechlibrary.entity.internal_notification;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "internal_notification")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InternalNotification {

    @Id
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "text")
    private String text;

    @Column(name = "link")
    private String link;

}
