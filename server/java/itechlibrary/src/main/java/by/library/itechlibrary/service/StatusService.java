package by.library.itechlibrary.service;

import by.library.itechlibrary.entity.Status;

public interface StatusService {

    Status findById(short id);

    Status findByName(String name);

}
