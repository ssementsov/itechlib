package by.library.itechlibrary.mapper;

import by.library.itechlibrary.dto.user.UserRoleDto;
import by.library.itechlibrary.entity.UserRole;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface UserRoleMapper {

    @Named(value = "userRole")
    UserRoleDto toUserRoleDto(UserRole userRole);

    @Named(value = "userRoleDto")
    UserRole toUserRole(UserRoleDto userRoleDto);

}