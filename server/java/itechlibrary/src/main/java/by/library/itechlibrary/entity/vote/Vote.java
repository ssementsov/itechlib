package by.library.itechlibrary.entity.vote;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "vote",
        uniqueConstraints = @UniqueConstraint(name = "uc_user_vot", columnNames = {"user_id", "vote_object_id"}))
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

    @Column(name = "user_id", updatable = false)
    private long userId;

    @Column(name = "vote_object_id")
    private long voteObjectId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.MERGE})
    @JoinColumn(name = "vote_type_id")
    private VoteType voteType;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.MERGE})
    @JoinColumn(name = "vote_object_type_id")
    private VoteObjectType voteObjectType;

}