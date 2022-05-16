package by.library.itechlibrary.config;

import by.library.itechlibrary.constant.UserRoleConstant;
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
import java.util.Set;

@ConditionalOnExpression("${idDevelopment} == false")
@Configuration
@Data
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "application-data")
public class DataInitializationConfig {

    private final UserRepository userRepository;

    private final List<BaseUserInfo> users;

    private final UserMapper userMapper;

    @PostConstruct
    public void initUserDataToDB() {

        List<User> propertyUsers = userMapper.mapUserListFromBaseUserInfos(users);
        propertyUsers.forEach(x -> x.setRoles(Set.of(UserRoleConstant.BOOK_READER_ROLE)));

        for (User propertyUser : propertyUsers) {

            if (userRepository.findByCorpEmail(propertyUser.getCorpEmail()).isEmpty()) {

                userRepository.save(propertyUser);

            }
        }
    }
}
