package by.library.itechlibrary.service;

import by.library.itechlibrary.entity.BookStatus;

public interface StatusService {

    BookStatus findById(short id);

    BookStatus findByName(String name);

}
