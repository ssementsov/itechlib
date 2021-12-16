package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.dto.BookDto;
import by.library.itechlibrary.entity.Status;
import by.library.itechlibrary.exeption_handler.exception.NotFoundException;
import by.library.itechlibrary.repository.StatusRepository;
import by.library.itechlibrary.service.StatusService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class StatusServiceImpl implements StatusService {

    private final StatusRepository statusRepository;


    @Override
    public Status findById(short id) {

        return statusRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("status was not found by id = " + id));
    }

    @Override
    public Status findByName(String name) {
        return statusRepository.findByName(name)
                .orElseThrow(() -> new NotFoundException("status was not found by name = " + name));
    }
}
