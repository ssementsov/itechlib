package by.library.itechlibrary.dto.user;

import by.library.itechlibrary.dto.FileInfoDto;
import lombok.Data;

@Data
public class UserProfileDto extends UserDto {

    private FileInfoDto fileInfo;

    private boolean isUnreadInternalNotification;

}
