package com.socialine.Socialine.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;
import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Messages")
@Table()
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "messageId", scope = Messages.class)
public class Messages {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "messages_sequence")
    @SequenceGenerator(name = "messages_sequence", sequenceName = "messages_sequence", allocationSize = 1)
    @Column(
            name = "message_id",
            updatable = false
    )
    private @Setter(AccessLevel.PROTECTED)
    Long messageId;

    @Lob
    private String text;

    private LocalDateTime date;

    private Integer receiverId;

    private Integer senderId;
}
