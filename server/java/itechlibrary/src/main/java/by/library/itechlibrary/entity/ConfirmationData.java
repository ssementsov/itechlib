package by.library.itechlibrary.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "confirmation_data")
@Data
@AllArgsConstructor
@NoArgsConstructor
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

}
