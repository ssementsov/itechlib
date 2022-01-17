package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.feedback.ShortUserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShortUserInfoRepository extends JpaRepository<ShortUserInfo, Long> {

}
