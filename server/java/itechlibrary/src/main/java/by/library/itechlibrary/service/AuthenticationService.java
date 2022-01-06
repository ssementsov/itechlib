package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.auth.AuthDto;
import by.library.itechlibrary.dto.auth.AuthResponseDto;

public interface AuthenticationService {

    AuthResponseDto authenticate(AuthDto authDto);

}
