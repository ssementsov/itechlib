package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.AuthDto;

public interface AuthenticationService {

    String authenticate(AuthDto authDto);

}
