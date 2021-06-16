package com.socialine.Socialine.repository;

import com.socialine.Socialine.model.Messages;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Lazy
@Repository
public interface MessagesRepository extends JpaRepository<Messages, Long> {

    @Query("SELECT ms FROM Messages ms WHERE ms.senderId = ?1")
    List<Messages> findAllBySenderId(int sen_id);

    @Query("SELECT ms FROM Messages ms WHERE ms.receiverId = ?1")
    List<Messages> findAllByReceiverId(int rec_id);

    @Query("SELECT ms FROM Messages ms WHERE ms.senderId = ?1 AND ms.receiverId = ?2")
    List<Messages> findAllBySenderIdAndReceiverId(int sen_id, int rec_id);

    @Query("SELECT ms FROM Messages ms WHERE ms.senderId = ?1 OR ms.receiverId = ?2")
    List<Messages> findAllBySenderIdOrReceiverId(int sen_id, int rec_id);

    @Query("SELECT ms FROM Messages ms WHERE (ms.senderId = ?1 AND ms.receiverId = ?2) OR (ms.senderId = ?2 AND ms.receiverId = ?1)")
    List<Messages> findConversationSenderOrReceiver(int sen_id, int rec_id);
}

