package by.library.itechlibrary.dto.book;

import by.library.itechlibrary.dto.UserDto;
import lombok.Data;

@Data
public class WithOwnerBookDto extends BookDto {

    private UserDto owner;

}
