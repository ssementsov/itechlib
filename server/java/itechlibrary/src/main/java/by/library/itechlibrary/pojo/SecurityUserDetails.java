package by.library.itechlibrary.pojo;

import by.library.itechlibrary.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;


public class SecurityUserDetails implements UserDetails {


    private long id;
    private String corpEmail;
    private String googleEmail;
    private boolean isActive;

    public static SecurityUserDetails fromUserEntityToCustomUserDetails(User user) {

        SecurityUserDetails scUser = new SecurityUserDetails();
        scUser.id = user.getId();
        scUser.corpEmail = user.getCorpEmail();
        scUser.googleEmail = user.getGoogleEmail();
        scUser.isActive = user.isActive();

        return scUser;
    }

    public long getId() {
        return id;
    }

    public String getCorpEmail() {
        return corpEmail;
    }

    public String getGoogleEmail() {
        return googleEmail;
    }

    public boolean isActive() {
        return isActive;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return corpEmail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    @Override
    public String toString() {
        return "SecurityUserDetails{" +
                "id=" + id +
                ", corpEmail='" + corpEmail + '\'' +
                ", googleEmail='" + googleEmail + '\'' +
                ", isActive=" + isActive +
                '}';
    }
}
