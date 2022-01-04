package by.library.itechlibrary.config;

import by.library.itechlibrary.constant.SwaggerConstant;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.ApiKeyVehicle;
import springfox.documentation.swagger.web.SecurityConfiguration;

import java.util.Collections;
import java.util.List;

@Configuration
public class SwaggerConfig {

    private ApiKey apiKey() {

        return new ApiKey(SwaggerConstant.AUTHORIZATION, SwaggerConstant.AUTHORIZATION, SwaggerConstant.HEADER);
    }

    @Bean
    public SecurityConfiguration security() {

        return new SecurityConfiguration(null, null, null, SwaggerConstant.APP_NAME,
                SwaggerConstant.API_KEY, ApiKeyVehicle.HEADER, SwaggerConstant.AUTHORIZATION, SwaggerConstant.SCOPE_SEPARATOR);
    }

    private SecurityContext securityContext() {

        return SecurityContext.builder().securityReferences(defaultAuth()).build();
    }

    private List<SecurityReference> defaultAuth() {

        AuthorizationScope authorizationScope = new AuthorizationScope(SwaggerConstant.AUTHORIZATION_SCOPE,
                SwaggerConstant.AUTHORIZATION_SCOPE_DESCRIPTION);

        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;

        return Collections.singletonList(new SecurityReference(SwaggerConstant.AUTHORIZATION, authorizationScopes));
    }

    @Bean
    public Docket docket() {

        return new Docket(DocumentationType.OAS_30)
                .apiInfo(new ApiInfoBuilder()
                        .title("ITech Lib API")
                        .description("API for the booking books automation process")
                        .version("0.0.1-SNAPSHOT")
                        .build())
                .securityContexts(Collections.singletonList(securityContext()))
                .securitySchemes(Collections.singletonList(apiKey()))
                .select()
                .apis(RequestHandlerSelectors.withClassAnnotation(RestController.class))
                .build();
    }
}
