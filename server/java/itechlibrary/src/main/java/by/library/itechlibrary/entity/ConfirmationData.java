package by.library.itechlibrary.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "confirmation_data", schema = "public")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"user"})
public class ConfirmationData {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "code")
    private UUID code;

    @Column(name = "create_date")
    private LocalDate requestDate;

    @Column(name = "is_activated")
    private boolean isActivated;

    @OneToOne(mappedBy = "confirmationData")
    private User user;

}
