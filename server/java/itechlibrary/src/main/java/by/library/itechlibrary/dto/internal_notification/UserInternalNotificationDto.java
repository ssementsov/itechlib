package by.library.itechlibrary.dto.internal_notification;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInternalNotificationDto {

    @NotNull
    private Long id;

    @NotNull
    private Long userId;

    @NotNull
    private Long internalNotificationId;

    private boolean isRead;

}
