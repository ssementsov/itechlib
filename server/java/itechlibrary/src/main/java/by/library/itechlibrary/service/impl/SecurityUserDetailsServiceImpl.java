package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.exeption_handler.exception.NotFoundException;
import by.library.itechlibrary.pojo.SecurityUserDetails;
import by.library.itechlibrary.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class SecurityUserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String corpEmail) throws UsernameNotFoundException {

        return getSecurityUserDetails(corpEmail);
    }

    public void setUserDetailsToContext(String corpEmail){

        SecurityUserDetails securityUserDetails = getSecurityUserDetails(corpEmail);
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(securityUserDetails, null, securityUserDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);

    }

    public long getCurrentUserId(){

        SecurityUserDetails user = (SecurityUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return user.getId();

    }

    private SecurityUserDetails getSecurityUserDetails(String corpEmail){

        User userEntity = userRepository.findByCorpEmail(corpEmail)
                .orElseThrow(() -> new NotFoundException("User has not been found by corpEmail " + corpEmail));

        return SecurityUserDetails.fromUserToUserDetails(userEntity);
    }
}
