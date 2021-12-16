package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.Language;
import by.library.itechlibrary.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LanguageRepository extends JpaRepository<Language, Short> {

}
