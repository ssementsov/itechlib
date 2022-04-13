package by.library.itechlibrary.dto.book;

import by.library.itechlibrary.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WithOwnerBookDto extends WithLikAndStatusBookDto {

    private UserDto owner;

    private LocalDateTime createDate;

}
