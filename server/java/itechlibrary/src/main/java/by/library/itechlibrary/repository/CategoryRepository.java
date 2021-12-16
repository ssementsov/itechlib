package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.Category;
import by.library.itechlibrary.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Short> {
}
