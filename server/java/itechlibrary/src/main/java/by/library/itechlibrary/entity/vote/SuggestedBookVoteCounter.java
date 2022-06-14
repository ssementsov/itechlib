package by.library.itechlibrary.entity.vote;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "sb_vote_count")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SuggestedBookVoteCounter {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "positive_count")
    private int positiveCount;

    @Column(name = "negative_count")
    private int negativeCount;

}