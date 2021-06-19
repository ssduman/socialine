package com.socialine.Socialine.config;

import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class SocketConfig {
    @Value("${rt-server.host}")
    private String host;

    @Value("${rt-server.port}")
    private Integer port;

    @Bean
    public SocketIOServer socketIOServer() {
        System.out.println("*********SOCKETIOSERVER************");
        System.out.println(host);
        System.out.println(port);
        System.out.println(System.getenv("PORT"));
        System.out.println(Integer.parseInt(System.getenv("PORT")));
        System.out.println(System.getenv("SOCKET_PORT"));
        System.out.println(Integer.parseInt(System.getenv("SOCKET_PORT")));
        System.out.println("*********SOCKETIOSERVER************");

        Configuration config = new Configuration();
        // config.setHostname("socialine.herokuapp.com");
        config.setPort(port);
        config.setOrigin("*");
        return new SocketIOServer(config);
    }
}
