package by.library.itechlibrary.dto.book;

import by.library.itechlibrary.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WithOwnerBookDto extends WithLikAndStatusBookDto {

    private UserDto owner;

}
