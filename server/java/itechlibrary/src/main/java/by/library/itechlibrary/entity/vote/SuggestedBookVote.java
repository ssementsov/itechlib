package by.library.itechlibrary.entity.vote;

import by.library.itechlibrary.entity.SuggestedBook;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "suggested_book_vote")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SuggestedBookVote {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.MERGE})
    @JoinColumn(name = "vote_id", updatable = false)
    private Vote vote;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.MERGE})
    @JoinColumn(name = "sb_id", updatable = false)
    private SuggestedBook suggestedBook;

}