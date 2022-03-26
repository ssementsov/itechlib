package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.auth.AuthRequestDto;
import by.library.itechlibrary.dto.auth.AuthResponseDto;

public interface AuthenticationService {

    AuthResponseDto authenticate(AuthRequestDto authRequestDto);

}
