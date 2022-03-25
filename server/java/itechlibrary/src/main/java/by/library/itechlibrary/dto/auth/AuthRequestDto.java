package by.library.itechlibrary.dto.auth;


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
public class AuthRequestDto {

    private String email;

    @JsonProperty("accessToken")
    private String token;

    @JsonProperty("profileObj")
    private void getEmail(Map<String, String> ya) {
        email = ya.get("email");
    }
}
