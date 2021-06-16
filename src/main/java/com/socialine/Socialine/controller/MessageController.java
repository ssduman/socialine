package com.socialine.Socialine.controller;

import com.socialine.Socialine.model.Messages;
import com.socialine.Socialine.repository.MessagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Lazy
@RestController
@RequestMapping("/api/messages/")
public class MessageController {

    private final MessagesRepository messagesRepository;

    @Autowired
    public MessageController(MessagesRepository messagesRepository) {
        this.messagesRepository = messagesRepository;
    }

    // all messages from specific sender id
    @GetMapping("/sender/{senId}")
    public List<Messages> findMessagesBySender(@PathVariable int senId) {
        return messagesRepository.findAllBySenderId(senId);
    }

    // all messages from specific receiver id
    @GetMapping("/receiver/{recId}")
    public List<Messages> findMessagesByReceiver(@PathVariable int recId) {
        return messagesRepository.findAllByReceiverId(recId);
    }

    // all messages between specific receiver id and specific sender id
    @GetMapping("/{sendId}/{recId}")
    public List<Messages> findMessagesBySenderAndReceiver(@PathVariable int sendId, @PathVariable int recId) {
        return messagesRepository.findAllBySenderIdAndReceiverId(sendId, recId);
    }

    // all messages from specific id
    @GetMapping("/all/{id}")
    public List<Messages> findMessagesBySenderOrReceiver(@PathVariable int id) {
        return messagesRepository.findAllBySenderIdOrReceiverId(id, id);
    }

    // all conversation
    @GetMapping("/conversation/{sendId}/{recId}")
    public List<Messages> findConversationSenderOrReceiver(@PathVariable int sendId, @PathVariable int recId) {
        return messagesRepository.findConversationSenderOrReceiver(sendId, recId);
    }
}
