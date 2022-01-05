package by.library.itechlibrary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ITechLibraryApplication {

    public static void main(String[] args) {
        SpringApplication.run(ITechLibraryApplication.class, args);
    }

}
