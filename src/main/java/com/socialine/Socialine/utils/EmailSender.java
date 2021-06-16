package com.socialine.Socialine.utils;

import com.socialine.Socialine.config.EmailConfig;
import com.socialine.Socialine.dto.EmailRequest;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class EmailSender {

    private final EmailConfig emailConfig;

    @Async
    public void sendEmail(EmailRequest emailRequest) {

        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(emailConfig.getHost());
        mailSender.setPort(emailConfig.getPort());
        mailSender.setUsername(emailConfig.getUsername());
        mailSender.setPassword(emailConfig.getPassword());

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("hello@socialine.com");
        mailMessage.setTo(emailRequest.getEmail());
        mailMessage.setSubject(emailRequest.getSubject());
        mailMessage.setText(emailRequest.getText());

        mailSender.send(mailMessage);
    }
}
