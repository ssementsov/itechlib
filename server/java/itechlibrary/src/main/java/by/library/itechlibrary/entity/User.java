package by.library.itechlibrary.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(schema = "public", name = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"confirmationData"})
@EqualsAndHashCode(exclude = {"user"})
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

    @Column(name = "google_email")
    private String googleEmail;

    @Column(name = "is_active")
    private boolean isActive;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "confirmation_id", referencedColumnName = "id")
    private ConfirmationData confirmationData;

    @OneToOne(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name = "file_info_id")
    private FileInfo fileInfo;

    @ManyToMany
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<UserRole> roles;

}