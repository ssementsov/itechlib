package by.library.itechlibrary.entity.feedback;


import by.library.itechlibrary.entity.Book;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "booking")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Feedback {

    @Id
    @Column(name = "id")
    private long id;

    @Column(name = "feedback")
    private String feedback;

    @Column(name = "book_id")
    private long bookId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH})
    @JoinColumn(name = "user_id")
    private ShortUserInfo userInfo;

}
