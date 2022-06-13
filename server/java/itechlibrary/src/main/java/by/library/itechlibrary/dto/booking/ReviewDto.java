package by.library.itechlibrary.dto.booking;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {

    @Min(0)
    @Max(5)
    private Short rate;

    @Size(min = 2, max = 250)
    private String feedback;

}
