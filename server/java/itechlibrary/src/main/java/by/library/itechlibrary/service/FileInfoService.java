package by.library.itechlibrary.service;

import by.library.itechlibrary.entity.FileInfo;
import org.springframework.web.multipart.MultipartFile;

public interface FileInfoService {

    FileInfo getFileInfo(MultipartFile multipartFile);

    void removeById(long id);




}
