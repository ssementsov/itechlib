package by.library.itechlibrary.dto.internal_notification;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInternalNotificationCreateDto {

    @NotNull
    private long userId;

    @NotNull
    private String text;

    @NotNull
    private String link;

    @NotNull
    private long templateId;

}