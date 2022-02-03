package by.library.itechlibrary.config;

import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.mapper.UserMapper;
import by.library.itechlibrary.pojo.BaseUserInfo;
import by.library.itechlibrary.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.util.List;

@ConditionalOnExpression("${idDevelopment} == false")
@Configuration
@Data
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "application")
public class DataInitConfig {

    private final UserRepository userRepository;

    private final List<BaseUserInfo> users;

    private final UserMapper userMapper;


    @PostConstruct
    public void initUserDataToDB() {

        if (userRepository.findById(1).isEmpty()) {

            List<User> users1 = userMapper.mapUserListFromBaseUserInfos(users);
            userRepository.saveAll(users1);

        }
    }
}
