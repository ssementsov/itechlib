package by.library.itechlibrary.pojo;

import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.entity.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


public class SecurityUserDetails implements UserDetails {

    private long id;
    private String corpEmail;
    private String googleEmail;
    private boolean isActive;
    private Collection<? extends GrantedAuthority> authorities;

    public static SecurityUserDetails fromUserToUserDetails(User user) {

        SecurityUserDetails scUser = new SecurityUserDetails();
        scUser.id = user.getId();
        scUser.corpEmail = user.getCorpEmail();
        scUser.googleEmail = user.getGoogleEmail();
        scUser.isActive = user.isActive();
        scUser.authorities = getAuthoritiesFromUserRoles(user.getRoles());

        return scUser;
    }

    public long getId() {
        return id;
    }

    public String getCorpEmail() {
        return corpEmail;
    }

    public boolean isActive() {
        return isActive;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return authorities;
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

    private static Collection<? extends GrantedAuthority> getAuthoritiesFromUserRoles(List<UserRole> roles) {

        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName()))
                .collect(Collectors.toList());

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
