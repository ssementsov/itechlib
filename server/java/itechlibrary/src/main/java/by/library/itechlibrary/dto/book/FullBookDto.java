package by.library.itechlibrary.dto.book;

import by.library.itechlibrary.dto.FileInfoDto;
import lombok.Data;

@Data
public class FullBookDto extends BookDto {

    private boolean isReader;

    private FileInfoDto fileInfo;

}
