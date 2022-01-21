package by.library.itechlibrary.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class FileInfoDto {

    private long id;

    private String name;

    private String extension;

    private byte[] fileData;

    private LocalDate date;

}
