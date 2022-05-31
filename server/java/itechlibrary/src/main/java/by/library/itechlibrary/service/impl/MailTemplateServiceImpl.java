package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.constant.MailTemplateConstant;
import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.Template;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.exeption_handler.exception.NotFoundException;
import by.library.itechlibrary.repository.TemplateRepository;
import by.library.itechlibrary.service.MailTemplateService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Data
@Slf4j
@RequiredArgsConstructor
@Service
public class MailTemplateServiceImpl implements MailTemplateService {

    private final TemplateRepository templateRepository;

    @Value("${template.host}")
    private String host;

    @Override
    public String getAndFillConfirmationTemplateFromUser(User user, String templateText) {

        return getFilledTextOfTemplateFromUserInfo(user, templateText);

    }

    @Override
    public String getAndFillTemplateFromBookingInfo(Booking booking, String templateText) {

        return getFilledTextFromBookingInfo(booking, templateText);
    }

    @Override
    public Template getByName(String templateName) {

        return templateRepository.findByName(templateName)
                .orElseThrow(() -> new NotFoundException("Template has not found by name " + templateName));

    }


    private String getFilledTextOfTemplateFromUserInfo(User user, String templateText) {

        if (templateText.contains(MailTemplateConstant.USER_ID)) {

            templateText = templateText.replace(MailTemplateConstant.USER_ID, String.valueOf(user.getId()));

        }

        if (templateText.contains(MailTemplateConstant.HOST)) {

            templateText = templateText.replace(MailTemplateConstant.HOST, host);

        }

        if (templateText.contains(MailTemplateConstant.CONFIRMATION_CODE)) {

            templateText = templateText.replace(MailTemplateConstant.CONFIRMATION_CODE, user.getConfirmationData().getCode().toString());

        }

        return templateText;
    }

    private String getFilledTextFromBookingInfo(Booking booking, String templateText) {

        String bookTitle = booking.getBook().getTitle();
        String bookReaderName = booking.getReader().getName();
        String startDate = booking.getStartDate().toString();
        String endDate = booking.getFinishDate().toString();
        String ownerName = booking.getBook().getOwner().getName();
        String bookId = String.valueOf(booking.getBook().getId());

        if (templateText.contains(MailTemplateConstant.BOOK_TITLE)) {

            templateText = templateText.replace(MailTemplateConstant.BOOK_TITLE, bookTitle);

        }

        if (templateText.contains(MailTemplateConstant.BOOK_READER_NAME)) {

            templateText = templateText.replace(MailTemplateConstant.BOOK_READER_NAME, bookReaderName);

        }

        if (templateText.contains(MailTemplateConstant.BOOKING_START_DATE)) {

            templateText = templateText.replace(MailTemplateConstant.BOOKING_START_DATE, startDate);

        }

        if (templateText.contains(MailTemplateConstant.BOOKING_END_DATE)) {

            templateText = templateText.replace(MailTemplateConstant.BOOKING_END_DATE, endDate);

        }

        if (templateText.contains(MailTemplateConstant.OWNER_NAME)) {

            templateText = templateText.replace(MailTemplateConstant.OWNER_NAME, ownerName);

        }

        if (templateText.contains(MailTemplateConstant.HOST)) {

            templateText = templateText.replace(MailTemplateConstant.HOST, host);

        }

        if (templateText.contains(MailTemplateConstant.BOOK_ID)) {

            templateText = templateText.replace(MailTemplateConstant.BOOK_ID, bookId);

        }

        return templateText;
    }
}
