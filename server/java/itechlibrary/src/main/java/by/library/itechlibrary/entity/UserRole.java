package by.library.itechlibrary.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "user_role")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRole {

    @Id
    @Column(name = "id")
    private short id;

    @Column(name = "name")
    private String name;

}
