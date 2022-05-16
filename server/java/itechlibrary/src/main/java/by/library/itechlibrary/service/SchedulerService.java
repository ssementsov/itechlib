package by.library.itechlibrary.service;

public interface SchedulerService {

    void deleteNotActivatedConfirmationData();

    void checkBookingsAndBlockUsersDidNotReturnBook();

}
