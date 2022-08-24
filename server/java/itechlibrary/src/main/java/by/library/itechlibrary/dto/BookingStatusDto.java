package by.library.itechlibrary.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingStatusDto {

    @Min(1)
    @NotNull
    private short id;

    @NotBlank
    private String name;

}
