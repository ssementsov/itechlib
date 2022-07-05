package by.library.itechlibrary.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileInfoDto {

    private long id;

    private String name;

    private String extension;

    private byte[] fileData;

    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate date;

}
