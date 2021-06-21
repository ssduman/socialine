package com.socialine.Socialine;

import com.corundumstudio.socketio.SocketIOServer;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class SocialineApplication implements CommandLineRunner {

    // private final SocketIOServer server;

    // @Autowired
    // public SocialineApplication(SocketIOServer server) { this.server = server; }

    public static void main(String[] args) {
        SpringApplication.run(SocialineApplication.class, args);
    }

    public void run(String... args) {
        // server.start();
        System.out.println("finish");
    }
}
