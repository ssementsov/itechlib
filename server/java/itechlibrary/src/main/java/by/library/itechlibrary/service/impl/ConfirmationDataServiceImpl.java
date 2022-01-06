package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.entity.ConfirmationData;
import by.library.itechlibrary.repository.ConfirmationDataRepository;
import by.library.itechlibrary.service.ConfirmationDataService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;


@Service
@Slf4j
@RequiredArgsConstructor
public class ConfirmationDataServiceImpl implements ConfirmationDataService {

    private final ConfirmationDataRepository confirmationDataRepository;

    @Override
    public ConfirmationData create() {

        log.info("Try to create Confirmation Data");

        ConfirmationData confirmationData = new ConfirmationData();
        UUID code = UUID.randomUUID();
        LocalDate creationDate = LocalDate.now();
        confirmationData.setCode(code);
        confirmationData.setRequestDate(creationDate);

        return confirmationData;
    }

    @Override
    public void deleteById(long id){

        log.info("Try to delete Confirmation Data by id = {}", id);

        confirmationDataRepository.deleteById(id);

    }
}
