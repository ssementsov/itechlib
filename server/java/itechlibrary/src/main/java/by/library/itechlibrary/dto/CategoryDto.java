package by.library.itechlibrary.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
public class CategoryDto {

    private short id;

    private String name;

}
