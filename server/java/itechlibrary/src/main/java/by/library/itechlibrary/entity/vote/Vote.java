package by.library.itechlibrary.entity.vote;

import by.library.itechlibrary.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "vote")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vote {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "date", updatable = false)
    private LocalDateTime date;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.MERGE})
    @JoinColumn(name = "user_id", updatable = false)
    private User user;

}