package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.constant.MailTemplateConstant;
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

    @Value("${template.confirm-link}")
    private String confirmLink;

    @Value("${template.host}")
    private String host;

    @Override
    public Template getAndFillTemplate(User user, String templateName) {

        Template template = getByName(templateName);

        String templateText = template.getText();

        if(templateName.equals("MAIL_CONFIRMATION_TEMPLATE")){

            templateText = getFilledTextOfConfirmationTemplate(user, templateText);

        }

        template.setText(templateText);

        return template;
    }



    private String getFilledTextOfConfirmationTemplate(User user, String templateText) {

        if (templateText.contains(MailTemplateConstant.CONFIRMATION_LINK)) {

            templateText = templateText.replace(MailTemplateConstant.CONFIRMATION_LINK, confirmLink);

        }
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

    private Template getByName(String templateName){

        return templateRepository.findByName(templateName)
                .orElseThrow(() -> new NotFoundException("Template has not found by name " + templateName));

    }
}
