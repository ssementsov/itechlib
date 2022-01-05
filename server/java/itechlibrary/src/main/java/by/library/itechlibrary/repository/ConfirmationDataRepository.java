package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.ConfirmationData;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface ConfirmationDataRepository extends JpaRepository<ConfirmationData, Long> {

    @EntityGraph(attributePaths = {"user"})
    @Query("SELECT distinct cd FROM ConfirmationData cd WHERE cd.isActivated = false")
    List<ConfirmationData> getAllByActivatedIsFalse();


}
