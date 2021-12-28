package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.ConfirmationData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfirmationDataRepository extends JpaRepository<ConfirmationData, Long> {


}
