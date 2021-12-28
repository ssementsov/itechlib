package by.library.itechlibrary.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(schema = "public", name = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "corp_email", unique = true)
    private String corpEmail;

    @Column(name = "google_email", unique = false)
    private String googleEmail;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="confirmation_id")
    private ConfirmationData confirmationData;

}
