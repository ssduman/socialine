package com.socialine.Socialine.utils;

import com.corundumstudio.socketio.HandshakeData;
import com.corundumstudio.socketio.SocketIONamespace;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.socialine.Socialine.model.Messages;
import com.socialine.Socialine.repository.MessagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ChatModule {

    @Autowired
    private MessagesRepository messagesRepository;

    private final SocketIONamespace namespace;

    @Autowired
    public ChatModule(SocketIOServer server) {
        this.namespace = server.addNamespace("/chat");
        this.namespace.addConnectListener(onConnected());
        this.namespace.addDisconnectListener(onDisconnected());
        this.namespace.addEventListener("chat", ChatMessage.class, onChatReceived());
    }

    private DataListener<ChatMessage> onChatReceived() {
        return (client, data, ackSender) -> {
            System.out.println("Client[" + client.getSessionId().toString() + "] - Received chat message " + data);

            Messages message = new Messages();
            message.setSenderId(data.getSenderId());
            message.setReceiverId(data.getReceiverId());
            message.setText(data.getText());
            message.setDate(LocalDateTime.now());
            messagesRepository.save(message);

            namespace.getBroadcastOperations().sendEvent("chat", data);
            namespace.getBroadcastOperations().sendEvent("bell", data.getReceiverId());
        };
    }

    private ConnectListener onConnected() {
        return client -> {
            HandshakeData handshakeData = client.getHandshakeData();
            System.out.println("Client[" + client.getSessionId().toString() + "] - Connected to chat module through " + handshakeData.getUrl());
        };
    }

    private DisconnectListener onDisconnected() {
        return client -> {
            System.out.println("Client[" + client.getSessionId().toString() + "] - Disconnected from chat module.");
        };
    }
}
