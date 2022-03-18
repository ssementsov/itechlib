package by.library.itechlibrary.dto.book;

import by.library.itechlibrary.dto.FileInfoDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FullBookDto extends WithOwnerBookDto {

    private boolean isReader;

    private FileInfoDto fileInfo;

}
