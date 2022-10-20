package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.constant.InternalTemplateConstant;
import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.internal_notification.InternalNotificationTemplate;
import by.library.itechlibrary.exeption_handler.exception.NotFoundException;
import by.library.itechlibrary.repository.InternalNotificationTemplateRepository;
import by.library.itechlibrary.service.InternalNotificationTemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class InternalNotificationTemplateServiceImpl implements InternalNotificationTemplateService {

    private final InternalNotificationTemplateRepository templateRepository;

    @Value("${template.host}")
    private String host;

    @Override
    public String fillTemplateTextFromBooking(Booking booking, String templateText) {

        if (templateText.contains(InternalTemplateConstant.BOOK_TITLE)) {

            templateText = templateText.replace(InternalTemplateConstant.BOOK_TITLE, booking.getBook().getTitle());

        }

        if (templateText.contains(InternalTemplateConstant.OWNER_NAME)) {

            templateText = templateText.replace(InternalTemplateConstant.OWNER_NAME, booking.getBook().getOwner().getName());

        }

        if (templateText.contains(InternalTemplateConstant.READER_NAME)) {

            templateText = templateText.replace(InternalTemplateConstant.READER_NAME, booking.getReader().getName());

        }

        return templateText;
    }

    @Override
    public String fillTemplateLinkFromBooking(Booking booking, String templateLink) {

        if (templateLink.contains(InternalTemplateConstant.HOST)) {

            templateLink = templateLink.replace(InternalTemplateConstant.HOST, host);

        }

        if (templateLink.contains(InternalTemplateConstant.BOOK_ID)) {

            templateLink = templateLink.replace(InternalTemplateConstant.BOOK_ID, String.valueOf(booking.getBook().getId()));

        }

        return templateLink;
    }

    @Override
    public InternalNotificationTemplate getByName(String templateName) {

        return templateRepository.findByName(templateName)
                .orElseThrow(() -> new NotFoundException("Internal notification template has not found by name " + templateName));
    }

}