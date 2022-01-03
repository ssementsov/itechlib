package by.library.itechlibrary.config.filter;

import by.library.itechlibrary.config.JwtProvider;
import by.library.itechlibrary.service.impl.SecurityUserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static io.jsonwebtoken.lang.Strings.hasText;

@RequiredArgsConstructor
@Slf4j
@Component
public class JwtFilter extends OncePerRequestFilter {

    public static final String AUTHORIZATION = "Authorization";

    private final JwtProvider jwtProvider;

    private final SecurityUserDetailsServiceImpl securityUserDetailsService;

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {

        log.info("jwt filter action for getting token.");

        String token = getTokenFromRequest(request);
        checkTokenAndSetUserDetailsToSecurityContext(token);

        filterChain.doFilter(request, response);

    }


    private String getTokenFromRequest(HttpServletRequest request) {

        String bearer = request.getHeader(AUTHORIZATION);

        request.getHeaderNames();

        if (hasText(bearer) && bearer.startsWith("Bearer ")) {

            return bearer.substring(7);
        }

        return null;
    }

    private void checkTokenAndSetUserDetailsToSecurityContext(String token){

        if (token != null && jwtProvider.validateToken(token)) {

            String userCorpEmail = jwtProvider.getLoginFromToken(token);
            securityUserDetailsService.setUserDetailsToContext(userCorpEmail);

        }
    }
}
