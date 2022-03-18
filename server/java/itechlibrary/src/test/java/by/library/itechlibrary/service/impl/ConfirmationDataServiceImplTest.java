package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.entity.ConfirmationData;
import by.library.itechlibrary.repository.ConfirmationDataRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;

@ExtendWith(MockitoExtension.class)
class ConfirmationDataServiceImplTest {

    @Mock
    ConfirmationDataRepository confirmationDataRepository;

    @InjectMocks
    ConfirmationDataServiceImpl confirmationDataService;

    @Test
    void create() {

        ConfirmationData confirmationData = confirmationDataService.create();

        Assertions.assertNotNull(confirmationData.getCode());
        Assertions.assertNotNull(confirmationData.getCode());
        Assertions.assertEquals(LocalDate.now(), confirmationData.getRequestDate());
        Assertions.assertNotNull(confirmationData.getId());
        Assertions.assertFalse(confirmationData.isActivated());

    }

    @Test
    void deleteById() {

        long id = 1;

        Mockito.doNothing().when(confirmationDataRepository).deleteById(id);
        confirmationDataService.deleteById(id);
        Mockito.verify(confirmationDataRepository, Mockito.times(1)).deleteById(id);

    }
}