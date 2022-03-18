package by.library.itechlibrary.service.scheduler;

import by.library.itechlibrary.entity.ConfirmationData;
import by.library.itechlibrary.repository.ConfirmationDataRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


@Data
@RequiredArgsConstructor
@Slf4j
@Service
public class SchedulerService {

    private final ConfirmationDataRepository confirmationDataRepository;

    @Scheduled(cron = "${job.cron}")
    @Transactional
    public void deleteNotActivatedConfirmationData() {

        log.info("Get all not activated confirmation data's");
        List<ConfirmationData> confirmationDataList = confirmationDataRepository.getAllByActivatedIsFalse();
        checkAndDelete(confirmationDataList);

    }

    private void checkAndDelete(List<ConfirmationData> confirmationDataList) {

        log.info("Check confirmation data's user and delete");

        for (ConfirmationData cd : confirmationDataList) {

            if (cd.getUser() != null) {

                cd.getUser().setConfirmationData(null);

            }

            confirmationDataRepository.delete(cd);

        }
    }
}
