package by.library.itechlibrary.mapper;

import by.library.itechlibrary.dto.FileInfoDto;
import by.library.itechlibrary.entity.FileInfo;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface FileInfoMapper {

    @Named(value = "fileInfo")
    FileInfoDto map(FileInfo fileInfo);

}