package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.entity.FileInfo;
import by.library.itechlibrary.exeption_handler.exception.UploadFileException;
import by.library.itechlibrary.repository.FileInfoRepository;
import by.library.itechlibrary.service.FileInfoService;
import liquibase.util.file.FilenameUtils;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;

@Data
@Slf4j
@RequiredArgsConstructor
@Service
public class FileInfoServiceImpl implements FileInfoService {

    private final FileInfoRepository fileInfoRepository;

    @Override
    public FileInfo getFileInfo(MultipartFile multipartFile) {

        log.info("Try to map fileInfo from multipartFile");

        String originalFileName = multipartFile.getOriginalFilename();
        String extension = getExtension(originalFileName);
        String fileName = getFileName(originalFileName);

        FileInfo fileInfo = new FileInfo();
        fileInfo.setDate(LocalDate.now());
        fileInfo.setExtension(extension);
        fileInfo.setName(fileName);
        fileInfo.setFileData(tryGetBytes(multipartFile));

        return fileInfo;
    }

    @Override
    public void removeById(long id) {

        fileInfoRepository.deleteById(id);

    }

    private byte[] tryGetBytes(MultipartFile multipartFile) {

        try {

            return multipartFile.getBytes();

        } catch (IOException e) {

            throw new UploadFileException("exception when getting file bytes.");

        }
    }

    private String getFileName(String fileName){

        return FilenameUtils.getBaseName(fileName);
    }

    private String getExtension(String fileName){

        return FilenameUtils.getExtension(fileName);
    }
}
