package by.library.itechlibrary.config;

import by.library.itechlibrary.constant.InternalNotificationConstant;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
@Getter
@Slf4j
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${full.host}")
    private String host;

    @Value("${server.servlet.context-path}")
    private String applicationDestinationPrefix;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {

        config.enableSimpleBroker(InternalNotificationConstant.DESTINATION_PREFIX);
        config.setApplicationDestinationPrefixes(applicationDestinationPrefix);

    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {

        registry.addEndpoint(InternalNotificationConstant.WEBSOCKET_CONNECTION_PATH).setAllowedOrigins(host).withSockJS();

    }
}




