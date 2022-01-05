package by.library.itechlibrary.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
public class AuthDto {

    private String email;

    @JsonProperty("vc")
    private TokenDto token;


    @JsonProperty("yu")
    private void getEmail(Map<String, String> ya) {
        email = ya.get("nv");
    }
}
