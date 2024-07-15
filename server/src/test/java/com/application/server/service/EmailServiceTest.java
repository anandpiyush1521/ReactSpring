package com.application.server.service;

import com.application.server.service.Impl.EmailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EmailServiceTest {
    @Autowired
    private EmailService service;

    @Test
    void testSendEmail(){
        service.sendEmail("whopiyushanand@gmail.com",
                "Demo test",
                "Demo testing working on payerup");
    }
}
