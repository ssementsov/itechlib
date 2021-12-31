package by.library.itechlibrary.config;


import by.library.itechlibrary.config.filter.JwtFilter;
import by.library.itechlibrary.exeption_handler.SecurityAuthenticationFailureHandler;
import by.library.itechlibrary.service.impl.SecurityUserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final AuthenticationSuccessHandler oauth2authSuccessHandler;

    private final JwtFilter jwtFilter;

    private final SecurityUserDetailsServiceImpl securityUserDetailsService;

    private static final String[] SWAGGER_WHITELIST = {
            "/swagger-resources/**",
            "/swagger-ui.html",
            "/swagger-ui/**",
            "/v3/api-docs",
    };

    public WebSecurityConfig(@Qualifier("oauth2authSuccessHandler") AuthenticationSuccessHandler oauth2authSuccessHandler,
                             JwtFilter jwtFilter, SecurityUserDetailsServiceImpl securityUserDetailsService) {

        this.oauth2authSuccessHandler = oauth2authSuccessHandler;
        this.jwtFilter = jwtFilter;
        this.securityUserDetailsService = securityUserDetailsService;

    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http

                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/", "/login**", "/js/**", "/error**", "/users/check/**", "/users/confirm/**", "/auth/**").permitAll()
                .anyRequest().authenticated()
                .and().logout().logoutSuccessUrl("/").permitAll();
                //.and().addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
//                .and()
//                .oauth2Login().successHandler(oauth2authSuccessHandler)
//                .failureHandler(authenticationFailureHandler()).permitAll();

    }

    @Override
    public void configure(WebSecurity web) throws Exception {

        web.ignoring().antMatchers(SWAGGER_WHITELIST);

    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new
                DaoAuthenticationProvider();

        daoAuthenticationProvider.setUserDetailsService(securityUserDetailsService);
        return daoAuthenticationProvider;
    }

    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        return new SecurityAuthenticationFailureHandler();
    }
}
