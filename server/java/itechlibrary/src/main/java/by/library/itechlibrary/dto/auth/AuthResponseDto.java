package by.library.itechlibrary.dto.auth;


import by.library.itechlibrary.dto.FileInfoDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponseDto {

    private String token;

    private FileInfoDto fileInfoDto;

}
